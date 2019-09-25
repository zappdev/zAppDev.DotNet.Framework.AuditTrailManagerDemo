using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using zAppDev.DotNet.Framework.Data.DAL;
using zAppDev.DotNet.Framework.Utilities;
using Microsoft.AspNetCore.Mvc;
using NHibernate;



namespace zAppDev.DotNet.Framework.Auditing.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuditConfigurationController : ControllerBase
    {
        public ServiceLocator ServiceLocator { get; }

        public AuditConfigurationController(IServiceProvider serviceProvider)
        {
            ServiceLocator = new ServiceLocator(serviceProvider);
            ServiceLocator.SetLocatorProvider(serviceProvider);
        }
        
        [HttpGet("list")]
        public IActionResult GetAuditEntityConfigurations()
        {
            var repo = ServiceLocator.Current.GetInstance<IRepositoryBuilder>().CreateCreateRepository();

            List<Model.AuditEntityConfiguration> auditEntityConfigurations =
                repo.GetAll<Model.AuditEntityConfiguration>().ToList();
            return Ok(new
            {
                value = auditEntityConfigurations
            });
        }

        [HttpGet("{id}")]
        public IActionResult GetAuditEntityConfiguration(int id)
        {
            var repo = ServiceLocator.Current.GetInstance<IRepositoryBuilder>().CreateCreateRepository();

            var auditEntityConfiguration =
                repo.GetById<Model.AuditEntityConfiguration>(id, false);
            return Ok(new
            {
                value = auditEntityConfiguration
            });
        }

        [HttpPost]
        public ActionResult<List<Model.AuditEntityConfiguration>> PostAuditEntityConfigurations(List<Model.AuditEntityConfiguration> auditEntityConfigurations)
        {
            var repo = ServiceLocator.Current.GetInstance<IRepositoryBuilder>().CreateCreateRepository();
            foreach(var auditEntity in auditEntityConfigurations)
            {
                foreach(var property in auditEntity.Properties)
                {
                    property.Entity = auditEntity;
                }
                repo.Save(auditEntity);
            }
            
            ServiceLocator.Current.GetInstance<INHAuditTrailManager>().ClearAuditTrailCache();
            return CreatedAtAction("PostAuditEntityConfigurations", auditEntityConfigurations);
        }
    }
}