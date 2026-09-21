using EmployeeApp.Api.data;
using EmployeeApp.Api.DTOs;
using EmployeeApp.Api.models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

//jwt generate
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace EmployeeApp.Api.Services;

public class AuthService : IAuthService
{
    private readonly EmployeeDbContext _context;
    private readonly PasswordHasher<User> _passwordHasher;
    private readonly IConfiguration _configuration;

    public AuthService(
      EmployeeDbContext context,
      IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
        _passwordHasher = new PasswordHasher<User>();
    }

    public async Task<string?> LoginAsync(LoginDto loginDto)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Email == loginDto.Email);

        if (user == null)
        {
            return null;
        }

        var passwordResult = _passwordHasher.VerifyHashedPassword(
            user,
            user.PasswordHash,
            loginDto.Password
        );

        if (passwordResult == PasswordVerificationResult.Failed)
        {
            return null;
        }

        var claims = new[]
        {
        new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
        new Claim(ClaimTypes.Email, user.Email),
        new Claim(ClaimTypes.Role, user.Role)
        };

        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(
                _configuration["Jwt:Key"]!
            )
        );

        var credentials = new SigningCredentials(
            key,
            SecurityAlgorithms.HmacSha256
        );

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(1),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }


    public async Task<bool> RegisterAsync(RegistrationDto registrationDto)
    {
        //checks email aleady present or not 
        var existingEmail = await _context.Users
            .FirstOrDefaultAsync(u => u.Email == registrationDto.Email);
        
        if(existingEmail != null)
        {
            return false;
        }

            var user = new User
            {
                Email = registrationDto.Email,
                PasswordHash = registrationDto.Password,
                Role = "Admin"
            };

            user.PasswordHash = _passwordHasher.HashPassword(user, registrationDto.Password);

            _context.Users.Add(user);

            _context.SaveChanges();
        
        return true;
    }

}