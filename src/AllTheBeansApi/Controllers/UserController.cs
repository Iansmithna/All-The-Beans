using AllTheBeansApi.DAL;
using AllTheBeansApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace AllTheBeansApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AllTheBeansDbContext _context;
        private readonly IConfiguration _config;
        public UserController(AllTheBeansDbContext context, IConfiguration config)
        {
            this._context = context;
            this._config = config;
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody]User request)
        {

            try
            {
                User user = this._context.Users
                    .Where<User>(u =>
                        u.Username.ToLower().Equals(request.Username.ToLower())).First();

                //check the password
                if (user == null || !checkPassword(request.Password, user.PasswordHash, user.Salt))
                {
                    return NotFound();
                }

                //generate response
                var tokenHandler = new JwtSecurityTokenHandler();
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new System.Security.Claims.ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
                    Expires = DateTime.UtcNow.AddDays(30),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetValue<String>("SecretKey"))), SecurityAlgorithms.HmacSha512Signature)
                };

                var createdToken = tokenHandler.CreateToken(tokenDescriptor);
                string token = tokenHandler.WriteToken(createdToken);

                //add token to db
                user.Token = token;
                user.LastLogin = DateTime.UtcNow;
                this._context.Users.Update(user);
                this._context.SaveChanges();

                //create a user response
                var response = new UserResponse();
                response.Username = user.Username;
                response.Token = user.Token;

                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }
        [HttpPost("Register")]
        public async Task<IActionResult> RegisterAsync([FromBody]User request)
        {
            //expect the request is valid because we checked in in the UserController

            User alreadyRegistered = this._context.Users.Where(u => u.Username.ToLower().Equals(request.Username.ToLower())).FirstOrDefault();
            if (alreadyRegistered != null)
            {
                return BadRequest(alreadyRegistered);
            }

            User user = new User();
            user.Username = request.Username;
            user.Email = request.Email;
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                user.Salt = hmac.Key;
                user.PasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(request.Password));
            }
            await this._context.AddAsync<User>(user);
            await this._context.SaveChangesAsync();

            return await Login(request);
        }


        private bool checkPassword(string password, byte[] hashFromDb, byte[] salt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(salt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != hashFromDb[i]) return false;
                }
            }
            return true;
        }
    }
}
