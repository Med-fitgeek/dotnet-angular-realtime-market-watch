namespace MarketWatchApi.Models
{
    public class PriceUpdate
    {
        public string Symbol { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public decimal Variation { get; set; }
        public DateTime Timestamp { get; set; }
    }

    public class PriceAlert
    {
        public string ConnectionId { get; set; } = string.Empty;
        public string Symbol { get; set; } = string.Empty;
        public decimal Threshold { get; set; }
        public bool TriggerAbove { get; set; } 
    }
}