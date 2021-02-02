using AllTheBeansApi.Attributes;
using AllTheBeansApi.DAL;
using AllTheBeansApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AllTheBeansApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BeanController : ControllerBase
    {
        private readonly AllTheBeansDbContext _context;
        public BeanController(AllTheBeansDbContext context)
        {
            this._context = context;
        }

        [HttpGet, TypeFilter(typeof(TokenAuthorisation))]
        public ActionResult Get()
        {
            return Ok(this._context.Beans.ToList());
        }

        [HttpGet, Route("BeanOfTheDay")]
        public IActionResult GetBeanOfTheDay()
        {
            try
            {
                List<Bean> query = _context.Beans.ToList<Bean>();
                Bean beanOfTheDay = null;
                foreach (Bean b in query)
                {
                    if (b.DayOfWeek.Equals(DateTime.Now.DayOfWeek) && b.Activated)
                    {
                        beanOfTheDay = b;
                        break;
                    }
                }

                if (beanOfTheDay == null)
                {
                    return NoContent();
                }

                return Ok(beanOfTheDay);
            }
            catch (ArgumentNullException)
            {
                return NoContent();
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { ex.Message });
            }
        }

        [TypeFilter(typeof(TokenAuthorisation))]
        [HttpGet("{id}")]
        public async Task<ActionResult<Bean>> GetBean(int id)
        {
            Console.WriteLine(id);
            var bean = await _context.Beans.FindAsync(id);

            if (bean == null)
            {
                return NoContent();
            }

            return Ok(bean);
        }

        [TypeFilter(typeof(TokenAuthorisation))]
        [HttpPost]
        public async Task<ActionResult<Bean>> Post([FromBody]Bean bean)
        {
            await RemoveAllActivatedForTheDay(bean);
            this._context.Beans.Add(bean);

            await this._context.SaveChangesAsync();
            return Ok(bean);
        }

        [TypeFilter(typeof(TokenAuthorisation))]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBean(int id, [FromBody] Bean bean)
        {
            if (id != bean.Id)
            {
                return BadRequest();
            }

            try
            {

                await RemoveAllActivatedForTheDay(bean);
                _context.Entry(bean).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BeanExists(id))
                {
                    return NotFound();
                }
                else
                {
                    return BadRequest(new { message = "Error with the database." });
                }
            }

            return Ok(bean);
        }

        [TypeFilter(typeof(TokenAuthorisation))]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteBean(int id)
        {
            var bean = await _context.Beans.FindAsync(id);
            if (bean == null)
            {
                return NotFound();
            }

            _context.Beans.Remove(bean);
            await _context.SaveChangesAsync();

            return Ok();
        }

        private async Task RemoveAllActivatedForTheDay(Bean bean)
        {
            var todaysBeans = this._context.Beans.Where(b => b.DayOfWeek.Equals(bean.DayOfWeek))
                .Where(b=> b.Activated == true);

            await todaysBeans.ForEachAsync(b => b.Activated = false);
            await this._context.SaveChangesAsync();
        }

        private bool BeanExists(int id)
        {
            return _context.Beans.Any(e => e.Id == id);
        }
    }
}
