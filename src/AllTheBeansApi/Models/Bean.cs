using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AllTheBeansApi.Models
{
    public class Bean
    {
        public int Id { get; set; }
        public String Name { get; set; }
        public String Aroma { get; set; }
        public String Colour { get; set; }
        [Column(TypeName = "decimal(5, 2)")]
        public Decimal Cost { get; set; }
        public String Image { get; set; }
        public DayOfWeek DayOfWeek { get; set; }
        public bool Activated { get; set; }
    }
}
