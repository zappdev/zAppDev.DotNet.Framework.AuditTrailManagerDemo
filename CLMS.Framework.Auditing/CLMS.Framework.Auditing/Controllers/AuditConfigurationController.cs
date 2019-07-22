using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NHibernate;



namespace CLMS.Framework.Auditing.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuditConfigurationController : ControllerBase
    {
        private ISession _session { get; set; }
        public AuditConfigurationController(ISession session)
        {
            _session = session;
        }

        [HttpGet("list")]
        public ActionResult GetAuditEntityConfigurations()
        {
            List<Model.AuditEntityConfiguration> auditEntityConfigurations = CLMS.Framework.Auditing.Model.AuditEntityConfiguration.GetAllEntityConfigurations();
            return Ok(new
            {
                value = auditEntityConfigurations
            }); ;
        }
    }
}