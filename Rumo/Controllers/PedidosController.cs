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
    [Route("pedidos")]
    [ApiController]
    public class PedidosController : ControllerBase
    {
        [HttpGet]
        public ActionResult<IEnumerable<Pedido>> Get([FromServices] DataContext context)
        {
            var pedidos = context.Pedido.ToList();

            foreach (var item in pedidos)
            {
                item.ListaItensPedido = context.ItemPedido.Where(i => i.PedidoId == item.Id && !i.Pendente).ToArray();
                
            }

            return pedidos;
        }

        [HttpPost]
        public ActionResult<Pedido> Post([FromServices] DataContext context, [FromBody]Pedido model)
        {
            model.Data = DateTime.Now.ToString("MM/dd/yyyy HH:mm");

            if (ModelState.IsValid)
            {
                context.Pedido.Add(model);
                context.SaveChanges();
                foreach (var item in model.ListaItensPedido)
                {
                    item.PedidoId = model.Id;
                    item.Pendente = true;
                    context.ItemPedido.Add(item);
                    context.SaveChanges();
                }
                return model;
            }
            else
            {
                return BadRequest(ModelState);
            }
        }
    }
}
