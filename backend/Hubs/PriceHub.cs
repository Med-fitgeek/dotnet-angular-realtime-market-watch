using MarketWatchApi.Models;
using MarketWatchApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace MarketWatchApi.Hubs
{
    [Authorize] // on garde le JWT existant
    public class PriceHub : Hub
    {
        public Task SetAlert(string symbol, decimal threshold, bool triggerAbove)
        {
            PriceSimulatorService.Alerts.Add(new PriceAlertRuntime
            {
                ConnectionId = Context.ConnectionId,
                Symbol = symbol,
                Threshold = threshold,
                TriggerAbove = triggerAbove
            });

            return Task.CompletedTask;
        }
    }
}