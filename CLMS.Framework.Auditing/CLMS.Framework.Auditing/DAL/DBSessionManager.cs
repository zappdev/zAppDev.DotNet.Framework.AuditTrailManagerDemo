using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
using NHibernate;
using NHibernate.Cfg;
using NHibernate.Tool.hbm2ddl;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CLMS.Framework.Auditing.DAL
{
    public class DBSessionManager
    {
        public static ISessionFactory CreateSessionFactory()
        {
            return Fluently.Configure()
                .Database(
                        MsSqlConfiguration.MsSql7.ConnectionString("Server=KIRKI;Database=CLMS.Framework.Auditing;Trusted_Connection=True;MultipleActiveResultSets=true")
                )
                .Mappings(m => 
                        m.FluentMappings.AddFromAssemblyOf<DBSessionManager>()
                 )
                .ExposeConfiguration(cfg =>
                {
                    var up = new SchemaUpdate(cfg);
                    UpdateDatabaseSchema(cfg);
                })
                .BuildSessionFactory();
        }

        private static void UpdateDatabaseSchema(NHibernate.Cfg.Configuration cfg)
        {
            var updateCode = new System.Text.StringBuilder();
            var schemaUpdate = new SchemaUpdate(cfg);
            schemaUpdate.Execute(row =>
            {
                updateCode.AppendLine(row);
                updateCode.AppendLine();
            }, true);
        }
    }
}
