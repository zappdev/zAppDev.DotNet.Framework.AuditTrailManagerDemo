using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
            }); ;
        }
    }
}