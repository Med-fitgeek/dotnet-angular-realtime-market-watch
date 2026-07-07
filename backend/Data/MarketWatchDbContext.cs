using MarketWatchApi.DTOs;
using MarketWatchApi.Models;
using Microsoft.EntityFrameworkCore;

namespace MarketWatchApi.Data;

public class MarketWatchDbContext : DbContext
{
    public MarketWatchDbContext(DbContextOptions<MarketWatchDbContext> options)
        : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<PriceAlert> PriceAlerts => Set<PriceAlert>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Ignore<PriceUpdate>(); 

        modelBuilder.Entity<PriceAlert>(e =>
        {
            e.HasOne(a => a.User)
             .WithMany()
             .HasForeignKey(a => a.UserId)
             .OnDelete(DeleteBehavior.Cascade);
        });
    }
}