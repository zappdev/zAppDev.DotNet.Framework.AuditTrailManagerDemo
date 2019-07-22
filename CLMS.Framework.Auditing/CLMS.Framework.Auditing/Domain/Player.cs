using CLMS.Framework.Auditing.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CLMS.Framework.Auditing.Domain
{
    public class Player : IAuditable
    {
        public virtual long Id { get; set; }
        public virtual  string FirstName { get; set; }
        public virtual  string LastName { get; set; }
        public virtual  DateTime DateOfBirth { get; set; }
        public virtual  Team Team { get; set; }
    }
}
