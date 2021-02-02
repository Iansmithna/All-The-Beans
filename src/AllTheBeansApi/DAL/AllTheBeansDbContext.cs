using AllTheBeansApi.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AllTheBeansApi.DAL
{
    public class AllTheBeansDbContext : DbContext
    {
        public AllTheBeansDbContext(DbContextOptions options) : base(options)
        { }

        public DbSet<User> Users { get; set; }
        public DbSet<Bean> Beans { get; set; }
    }
}
