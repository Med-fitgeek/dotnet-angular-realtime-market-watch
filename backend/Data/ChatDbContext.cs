using Microsoft.EntityFrameworkCore;
using MarketWatchApi.Models;

namespace MarketWatchApi.Data
{
    public class ChatDbContext : DbContext
    {
        public ChatDbContext(DbContextOptions<ChatDbContext> options) : base(options)
        {
        }
        public DbSet<User> Users => Set<User>();
        public DbSet<Message> Messages => Set<Message>();


    }
}