using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Rumo.Models;
using Rumo.Data;
using Microsoft.AspNetCore.Cors;
using System.Linq;
using System.Globalization;

namespace Rumo.Controllers
{
    [Route("copa")]
    [ApiController]
    public class CopaController : ControllerBase
    {       
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Copa>>> Get([FromServices] DataContext context)
        {
            var copa = await (from pedido in context.Pedido
                              join itempedido in context.ItemPedido
                                 on pedido.Id equals itempedido.PedidoId
                                 where itempedido.Pendente
                               join produto in context.Produto
                                 on itempedido.ProdutoId equals produto.Id
                              where produto.Tipo == "Bebida"
                              select new Copa
                              {
                                  IdPedido = pedido.Id,                                  
                                  IdProduto = produto.Id,
                                  Iditem = itempedido.Id,
                                  Mesa = pedido.Mesa,
                                  NomeSolicitante = pedido.NomeSolicitante,
                                  NomeGarcom = pedido.NomeGarcom,
                                  Tipo = produto.Tipo,
                                  NomeProduto = produto.Nome,
                                  Preco = produto.Preco,
                                  Pendente = itempedido.Pendente,
                                  Data = pedido.Data,
                              }).ToListAsync();

            if (copa == null)
            {
                return NotFound();
            }

            return Ok(copa);
        }
    }

}
