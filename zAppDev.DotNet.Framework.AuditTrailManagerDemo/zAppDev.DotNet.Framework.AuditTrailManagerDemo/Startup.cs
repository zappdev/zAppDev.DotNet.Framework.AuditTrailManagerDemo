using zAppDev.DotNet.Framework.Auditing.DAL;
using zAppDev.DotNet.Framework.Data.DAL;
using zAppDev.DotNet.Framework.Utilities;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using NHibernate;
using System.Linq;

namespace zAppDev.DotNet.Framework.Auditing
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var factory = DBSessionManager.CreateSessionFactory(Configuration.GetConnectionString("DefaultConnection"));
            services.AddSingleton<ISessionFactory>(provider => factory);
            services.AddScoped<ISession>((provider) =>
            {
                var sessionFactory = provider.GetService<ISessionFactory>();
                var session = sessionFactory.OpenSession();
                session.FlushMode = FlushMode.Manual;
                return session;
            });
            services.AddSingleton<IRepositoryBuilder, DAL.RepositoryBuilder>();
            services.AddSingleton<INHAuditTrailManager, NHAuditTrailManager>();

            services.AddMvc()
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_2)
                .AddJsonOptions(options => {
                    options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                    options.SerializerSettings.ContractResolver = new NHibernateContractResolver
                    {
                        NamingStrategy = new CamelCaseNamingStrategy()
                    };
                });

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });

            ServiceLocator.SetLocatorProvider(app.ApplicationServices);

            var manager = app.ApplicationServices.GetService(typeof(INHAuditTrailManager)) as INHAuditTrailManager;
            var type = typeof(DBSessionManager);
            var auditableTypes = type.Assembly
                .GetTypes()
                .Where(t => t.GetInterfaces().Contains(typeof(IAuditable)))
                .ToList();
            manager.Enable(auditableTypes, () => new AuditContext
            {
                Username = "Public User"
            });
        }        
    }
}
