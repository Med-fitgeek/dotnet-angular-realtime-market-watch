namespace MarketWatchApi.Models;

// Objet vivant uniquement en mémoire pendant la session SignalR
// Non persisté — reconstruit à chaque connexion
public class PriceAlertRuntime
{
    public int AlertId { get; set; }        // référence vers PriceAlert.Id en DB
    public string ConnectionId { get; set; } = string.Empty;
    public string Symbol { get; set; } = string.Empty;
    public decimal Threshold { get; set; }
    public bool TriggerAbove { get; set; }
}