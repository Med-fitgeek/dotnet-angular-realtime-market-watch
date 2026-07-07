namespace MarketWatchApi.DTOs
{
    public class PriceUpdate
    {
        public string Symbol { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public decimal Variation { get; set; }
        public DateTime Timestamp { get; set; }
    }

}