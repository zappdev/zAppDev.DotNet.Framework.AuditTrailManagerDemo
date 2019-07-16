using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NHibernate;
using Microsoft.AspNetCore.Mvc;
using CLMS.Framework.Auditing.Domain;

namespace CLMS.Framework.Auditing.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamController : ControllerBase
    {
        private ISession _session { get; set; }
        public TeamController(ISession session)
        {
            _session = session;
        }

        [HttpGet("list")]
        public IActionResult GetTeams()
        {
            var results = _session.CreateCriteria<Team>().List<Team>();

            return Ok(new
            {
                value = results
            });
        }

        [HttpGet("{id}")]
        public ActionResult<Team> GetTeam(long id)
        {
            var team = _session.Get<Team>(id);
            if(team == null)
            {
                return NotFound();
            }

            return team;
        }

        [HttpPut("{id}")]
        public ActionResult PutTeam(Team team)
        {
            _session.Update(team);
            _session.Flush();
            return NoContent();
        }

        [HttpPost]
        public ActionResult<Team> PostTeam(Team team)
        {
            _session.Save(team);
            _session.Flush();

            return CreatedAtAction("Post Team", new { id = team.Id}, team);
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteTeam(long id)
        {
            var team = _session.Get<Team>(id);
            if(team == null)
            {
                return NotFound();
            }
            _session.Delete(team);
            _session.Flush();
            return Ok();
        }
    }
}