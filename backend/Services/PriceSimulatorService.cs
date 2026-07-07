using MarketWatchApi.DTOs;
using MarketWatchApi.Hubs;
using MarketWatchApi.Models;
using Microsoft.AspNetCore.SignalR;

namespace MarketWatchApi.Services
{
	public class PriceSimulatorService : BackgroundService
	{
		private readonly IHubContext<PriceHub> _hubContext;
		private readonly Random _random = new();

		// Watchlist de référence : symbole -> prix actuel
		private readonly Dictionary<string, decimal> _prices = new()
		{
			{ "AAPL", 195.00m },
			{ "EURUSD", 1.0850m },
			{ "BTC", 62000.00m },
			{ "TSLA", 178.50m }
		};

		// Stockage simple des alertes utilisateurs (en mémoire pour la démo)
		public static readonly List<PriceAlertRuntime> Alerts = new();

		public PriceSimulatorService(IHubContext<PriceHub> hubContext)
		{
			_hubContext = hubContext;
		}

		protected override async Task ExecuteAsync(CancellationToken stoppingToken)
		{
			while (!stoppingToken.IsCancellationRequested)
			{
				foreach (var symbol in _prices.Keys.ToList())
				{
					var oldPrice = _prices[symbol];
					var newPrice = ApplyRandomWalk(oldPrice);
					_prices[symbol] = newPrice;

					var variation = (newPrice - oldPrice) / oldPrice * 100;

					var update = new PriceUpdate
					{
						Symbol = symbol,
						Price = Math.Round(newPrice, 4),
						Variation = Math.Round(variation, 3),
						Timestamp = DateTime.UtcNow
					};

					await _hubContext.Clients.All.SendAsync("PriceUpdate", update, stoppingToken);

					await CheckAlerts(update);
				}

				await Task.Delay(1000, stoppingToken); // un tick par seconde
			}
		}

		private decimal ApplyRandomWalk(decimal price)
		{
			// variation aléatoire de -0.3% à +0.3% par tick
			double changePercent = (_random.NextDouble() * 0.6 - 0.3) / 100.0;
			return price * (decimal)(1 + changePercent);
		}

		private async Task CheckAlerts(PriceUpdate update)
		{
			var triggered = Alerts.Where(a =>
				a.Symbol == update.Symbol &&
				((a.TriggerAbove && update.Price > a.Threshold) ||
				 (!a.TriggerAbove && update.Price < a.Threshold)))
				.ToList();

			foreach (var alert in triggered)
			{
				await _hubContext.Clients.Client(alert.ConnectionId)
					.SendAsync("AlertTriggered", new
					{
						alert.Symbol,
						update.Price,
						alert.Threshold
					});

				Alerts.Remove(alert); // alerte unique, on la retire une fois déclenchée
			}
		}
	}
}