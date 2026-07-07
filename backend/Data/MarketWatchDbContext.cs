using Microsoft.EntityFrameworkCore;
using MarketWatchApi.Models;

namespace MarketWatchApi.Data
{
    public class MarketWatchDbContext : DbContext
    {
        public MarketWatchDbContext(DbContextOptions<MarketWatchDbContext> options) : base(options)
        {
        }
        public DbSet<User> Users => Set<User>();
        public DbSet<PriceUpdate> Messages => Set<PriceUpdate>();


    }
}