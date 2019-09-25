using zAppDev.DotNet.Framework.Data;
using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
using NHibernate;
using NHibernate.Event;
using NHibernate.Tool.hbm2ddl;
using zAppDev.DotNet.Framework.Auditing;

namespace zAppDev.DotNet.Framework.Auditing.DAL
{
    public class DBSessionManager
    {
        public static ISessionFactory CreateSessionFactory(string connectionString)
        {
            return Fluently.Configure()
                .Database(
                        MsSqlConfiguration.MsSql7.ConnectionString(connectionString)
                )
                .Mappings(m =>
                {
                    m.HbmMappings.AddFromAssemblyOf<NHAuditTrailManager>();
                    m.FluentMappings.AddFromAssemblyOf<DBSessionManager>();
                })
                .ExposeConfiguration(cfg =>
                {
                    RegisterListeners(cfg);
                    var up = new SchemaUpdate(cfg);
                    UpdateDatabaseSchema(cfg, connectionString);
                })
                .BuildSessionFactory();
        }

        private static void UpdateDatabaseSchema(NHibernate.Cfg.Configuration cfg, string connectionString)
        {
            MiniSessionManager.ExecuteScript(connectionString, @"
                IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = N'wf') EXEC('CREATE SCHEMA wf AUTHORIZATION [dbo]');
                IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = N'security') EXEC('CREATE SCHEMA security AUTHORIZATION [dbo]');
				IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = N'audit') EXEC('CREATE SCHEMA audit AUTHORIZATION [dbo]');");

            var updateCode = new System.Text.StringBuilder();
            var schemaUpdate = new SchemaUpdate(cfg);
            schemaUpdate.Execute(row =>
            {
                updateCode.AppendLine(row);
                updateCode.AppendLine();
            }, true);
        }

        public static void RegisterListeners(NHibernate.Cfg.Configuration cfg)
        {
            cfg.EventListeners.DeleteEventListeners = new IDeleteEventListener[]
            {
                new NHibernate.Event.Default.DefaultDeleteEventListener()
            };
            cfg.EventListeners.SaveOrUpdateEventListeners = new ISaveOrUpdateEventListener[]
            {
                new NHibernate.Event.Default.DefaultSaveOrUpdateEventListener()
            };
            cfg.EventListeners.PostInsertEventListeners = new IPostInsertEventListener[]
            {
                new NHAuditTrailListener()
            };
            cfg.EventListeners.PostUpdateEventListeners = new IPostUpdateEventListener[]
            {
                new NHAuditTrailListener()
            };
            cfg.EventListeners.PostDeleteEventListeners = new IPostDeleteEventListener[]
            {
                new NHAuditTrailListener()
            };
            cfg.EventListeners.PreCollectionUpdateEventListeners = new IPreCollectionUpdateEventListener[]
            {
                new NHAuditTrailListener()
            };
        }
    }
}
