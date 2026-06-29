using MarketWatchApi.DTOs;
using MarketWatchApi.Services;
using Microsoft.AspNetCore.Mvc;


namespace MarketWatchApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;
        private readonly IConfiguration _config;

        public AuthController(AuthService authService, IConfiguration config)
        {
            _authService = authService;
            _config = config;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            if (registerDto == null || string.IsNullOrEmpty(registerDto.Username) ||
                string.IsNullOrEmpty(registerDto.Email) || string.IsNullOrEmpty(registerDto.Password))
            {
                return BadRequest("Invalid registration data.");
            }
            var user = await _authService.RegisterAsync(registerDto);
            if (user == null)
            {
                return BadRequest("Email already exists.");
            }
            return Ok(new { message = "Subscription successed", user.Id, user.Username, user.Email });

        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            var response = await _authService.LoginAsync(dto, _config);
            if (response == null)
                return Unauthorized("Identifiants invalides");

            return Ok(response);
        }

    }
}
