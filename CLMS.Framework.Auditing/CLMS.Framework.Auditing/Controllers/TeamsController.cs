using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NHibernate;
using Microsoft.AspNetCore.Mvc;
using zAppDev.DotNet.Framework.Auditing.Domain;
using zAppDev.DotNet.Framework.Auditing.DTOs;
using zAppDev.DotNet.Framework.Utilities;

namespace zAppDev.DotNet.Framework.Auditing.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamsController : ControllerBase
    {
        public ServiceLocator ServiceLocator { get; }

        private ISession _session { get; set; }
        public TeamsController(ISession session, IServiceProvider serviceProvider)
        {
            _session = session;
            ServiceLocator = new ServiceLocator(serviceProvider);
            ServiceLocator.SetLocatorProvider(serviceProvider);
        }

        [HttpGet("list")]
        public IActionResult GetTeams()
        {
            var teams = _session.CreateCriteria<Team>().List<Team>();
            var results = new List<TeamDto>();
            foreach(var team in teams)
            {
                var dto = new TeamDto
                {
                    Founded = team.Founded,
                    Id = team.Id,
                    Name = team.Name
                };
                results.Add(dto);
            }
            return Ok(new
            {
                value = results
            });
        }

        [HttpGet("{id}")]
        public ActionResult<TeamDto> GetTeam(long id)
        {
            var team = _session.Get<Team>(id);
            
            if(team == null)
            {
                return NotFound();
            }

            var teamDto = new TeamDto
            {
                Founded = team.Founded,
                Name = team.Name,
                Id = team.Id
            };

            return teamDto;
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

            return CreatedAtAction("PostTeam", new { id = team.Id}, team);
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