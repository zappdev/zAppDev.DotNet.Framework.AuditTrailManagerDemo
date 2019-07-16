using CLMS.Framework.Auditing.Domain;
using FluentNHibernate.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CLMS.Framework.Auditing.Mappings
{
    public class TeamMap : ClassMap<Team>
    {
        public TeamMap()
        {
            Id(x => x.Id);
            Map(x => x.Founded);
            Map(x => x.Name);
            HasMany(x => x.Players)
                .Inverse();
        }
    }
}
