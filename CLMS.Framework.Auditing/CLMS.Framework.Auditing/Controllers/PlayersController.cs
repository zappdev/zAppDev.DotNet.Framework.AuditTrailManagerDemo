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
    public class PlayersController : ControllerBase
    {

        private ISession _session { get; set; }
        public PlayersController(ISession session)
        {
            _session = session;
        }

        [HttpGet("list")]
        public IActionResult GetPlayers()
        {
            var results = _session.CreateCriteria<Player>().List<Player>();

            return Ok(new
            {
                value = results
            });
        }

        [HttpGet("{id}")]
        public ActionResult<Player> GetPlayer(long id)
        {
            var player = _session.Get<Player>(id);
            if (player == null)
            {
                return NotFound();
            }

            return player;
        }

        [HttpPut("{id}")]
        public ActionResult PutPlayer(Player player)
        {
            _session.Update(player);
            _session.Flush();
            return NoContent();
        }

        [HttpPost]
        public ActionResult<Player> PostPlayer(Player player)
        {
            _session.Save(player);
            _session.Flush();

            return CreatedAtAction("Post Team", new { id = player.Id }, player);
        }

        [HttpDelete("{id}")]
        public ActionResult DeletePlayer(long id)
        {
            var player = _session.Get<Player>(id);
            if (player == null)
            {
                return NotFound();
            }
            _session.Delete(player);
            _session.Flush();
            return Ok();
        }
    }
}