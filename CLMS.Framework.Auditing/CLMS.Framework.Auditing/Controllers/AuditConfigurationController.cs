using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CLMS.Framework.Data.DAL;
using CLMS.Framework.Utilities;
using Microsoft.AspNetCore.Mvc;
using NHibernate;



namespace CLMS.Framework.Auditing.Controllers
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
            List<Model.AuditEntityConfiguration> auditEntityConfigurations = 
                Model.AuditEntityConfiguration.GetAllEntityConfigurations();
            return Ok(new
            {
                value = auditEntityConfigurations
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
            return CreatedAtAction("PostAuditEntityConfigurations", auditEntityConfigurations);
        }
    }
}