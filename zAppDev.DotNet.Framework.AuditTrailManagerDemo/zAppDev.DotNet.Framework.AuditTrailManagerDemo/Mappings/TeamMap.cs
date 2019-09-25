using zAppDev.DotNet.Framework.Auditing.Domain;
using FluentNHibernate.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace zAppDev.DotNet.Framework.Auditing.Mappings
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
