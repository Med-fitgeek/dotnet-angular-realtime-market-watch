namespace MarketWatchApi.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string PasswordHash { get; set; } = null!;
        public string Role { get; set; } = "user"; // user / admin
        public bool IsOnline { get; set; } = false;

        public ICollection<Message>? Messages { get; set; }
    }
}
