using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace AllTheBeansApi.Models
{
    public class User
    {
        public int Id { get; set; }
        
        public String Username { get; set; }

        public String Password { get; set; }

        public byte[] PasswordHash { get; set; }

        public String Email { get; set; }

        public String Token { get; set; }

        public byte[] Salt { get; set; }
        
        public DateTime LastLogin { get; set; }

    }
}
