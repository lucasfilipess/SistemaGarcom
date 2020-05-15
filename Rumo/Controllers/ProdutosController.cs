using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Rumo.Models;
using Rumo.Data;
using Microsoft.AspNetCore.Cors;
using System.Linq;

namespace Rumo.Controllers
{
    [Route("produtos")]
    [ApiController]
    public class ProdutosController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Produto>>> Get([FromServices] DataContext context)
        {
            return await context.Produto.OrderBy(s => s.Nome).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Produto>> Get([FromServices] DataContext context, int id)
        {
            var pedido = await context.Produto.FindAsync(id);

            if (pedido == null)
            {
                return NotFound();
            }
            return pedido;
        }

        [HttpPost]
        public async Task<ActionResult<Produto>> Post([FromServices] DataContext context, [FromBody]Produto model)
        {
            if (ModelState.IsValid)
            {
                context.Produto.Add(model);
                await context.SaveChangesAsync();
                return model;
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [HttpPut]
        public async Task<ActionResult<Produto>> Put([FromServices] DataContext context, Produto produto)
        {           
            context.Entry(produto).State = EntityState.Modified;

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

        [HttpDelete("{id}")]
        public async Task<ActionResult<Produto>> Delete([FromServices] DataContext context, int id)
        {
            var produtos = await context.Produto.FindAsync(id);
            if (produtos == null)
            {
                return NotFound();
            }

            context.Produto.Remove(produtos);
            await context.SaveChangesAsync();

            return produtos;
        }

    }
}
