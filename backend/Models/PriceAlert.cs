namespace MarketWatchApi.Models;


public class PriceAlert
{
    public int Id { get; set; }
    public int UserId { get; set; }                     
    public User User { get; set; } = null!;         

    public string Symbol { get; set; } = string.Empty;
    public decimal Threshold { get; set; }
    public bool TriggerAbove { get; set; }
    public bool IsActive { get; set; } = true;         
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}