using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApplication.Models
{
    public class user
    {
        public long Id { get; set; }
        public string userName { get; set; }
        public string Email { get; set; }
        public string password { get; set; }
    }
}
