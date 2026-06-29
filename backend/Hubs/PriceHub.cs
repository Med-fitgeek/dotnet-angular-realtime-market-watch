using ChatApi.Models;
using ChatApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System.Runtime.Remoting.Contexts;
using System.Threading.Tasks;

namespace ChatApi.Hubs
{
    [Authorize] // on garde le JWT existant
    public class PriceHub : Hub
    {
        public Task SetAlert(string symbol, decimal threshold, bool triggerAbove)
        {
            PriceSimulatorService.Alerts.Add(new PriceAlert
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