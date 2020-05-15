using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Rumo.Models;
using Rumo.Data;
using Microsoft.EntityFrameworkCore;

namespace Rumo.Controllers
{
    [Route("item-pedido")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        public async Task<ActionResult<ItemPedido>> Put([FromServices] DataContext context, ItemPedido item)
        {
            context.Entry(item).State = EntityState.Modified;

            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}