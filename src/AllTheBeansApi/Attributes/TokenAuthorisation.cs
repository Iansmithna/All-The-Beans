using AllTheBeansApi.DAL;
using AllTheBeansApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Primitives;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AllTheBeansApi.Attributes
{
    public class TokenAuthorisation : Attribute, IAuthorizationFilter
    {
        private readonly AllTheBeansDbContext _dbContext;

        public TokenAuthorisation(AllTheBeansDbContext context)
        {
            this._dbContext = context;
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            StringValues auth;
            var hasKey = context.HttpContext.Request.Headers.TryGetValue("Authorization", out auth);

            if (hasKey)
            {
                if (!ValidateToken(auth.ToString().Split(' ')[1]))
                {
                    context.Result = new JsonResult(null) { StatusCode = StatusCodes.Status401Unauthorized };
                }
            }

        }

        private bool ValidateToken(String token)
        {
            User usr = this._dbContext.Users.Where<User>(user => user.Token.Equals(token)).FirstOrDefault();

            if (usr == null)
            {
                return false;
            }
            return true;
        }
    }
}
