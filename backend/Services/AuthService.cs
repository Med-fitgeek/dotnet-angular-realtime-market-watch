using MarketWatchApi.Data;
using MarketWatchApi.DTOs;
using MarketWatchApi.Models;
using MarketWatchApi.Utils;
using Microsoft.EntityFrameworkCore;

namespace MarketWatchApi.Services
{
    public class AuthService
    {
        private readonly MarketWatchDbContext _context;
        public AuthService(MarketWatchDbContext context)
        {
            _context = context;
        }

        public async Task<User?> RegisterAsync(RegisterDto registerDto)
        {
            if (_context.Users.Any(u => u.Email == registerDto.Email))
                return null; // Email already exists

            var user = new User
            {
                Username = registerDto.Username,
                Email = registerDto.Email,
                PasswordHash = PasswordHasher.Hash(registerDto.Password)
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return user;
        }

        public async Task<LoginResponseDTO?> LoginAsync(LoginDto loginDto, IConfiguration config)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == loginDto.Email);

            if (user == null || !PasswordHasher.Verify(user.PasswordHash, loginDto.Password))
                return null;

            var token =  JwtHelper.GenerateJwt(user, config);

            return new LoginResponseDTO
            {
                Token = token,
                Username = user.Username
            };
        }
    }
}
