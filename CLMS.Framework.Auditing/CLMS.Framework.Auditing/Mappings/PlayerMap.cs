using CLMS.Framework.Auditing.Domain;
using FluentNHibernate.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CLMS.Framework.Auditing.Mappings
{
    public class PlayerMap : ClassMap<Player>
    {
        public PlayerMap()
        {
            Id(x => x.Id);
            Map(x => x.DateOfBirth);
            Map(x => x.FirstName);
            Map(x => x.LastName);
            References(x => x.Team);
        }
    }
}
