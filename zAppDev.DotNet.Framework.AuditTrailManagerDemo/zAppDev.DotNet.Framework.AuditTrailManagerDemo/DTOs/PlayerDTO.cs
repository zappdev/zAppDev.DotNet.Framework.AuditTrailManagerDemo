using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace zAppDev.DotNet.Framework.Auditing.DTOs
{
    public class PlayerDTO
    {
        public long Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Team { get; set; }
    }
}
