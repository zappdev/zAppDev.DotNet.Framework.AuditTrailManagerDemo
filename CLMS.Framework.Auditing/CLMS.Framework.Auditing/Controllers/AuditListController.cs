using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NHibernate;

namespace zAppDev.DotNet.Framework.Auditing.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuditListController : ControllerBase
    {
        private ISession _session { get; set; }
        public AuditListController(ISession session)
        {
            _session = session;
        }

        [HttpGet("list")]
        public ActionResult GetAuditLogEntries()
        {
            var autidtLogEntries = _session.CreateCriteria<Model.AuditLogEntry>().List<Model.AuditLogEntry>();
            return Ok(new
            {
                value = autidtLogEntries
            });
        }
    }
}