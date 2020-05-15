﻿using System;
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
    [Route("historico")]
    [ApiController]
    public class HistoricoController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Historico>>> Get([FromServices] DataContext context)
        {
            var cozinha = await (from pedido in context.Pedido
                                 join itempedido in context.ItemPedido
                                    on pedido.Id equals itempedido.PedidoId
                                 where !itempedido.Pendente
                                 join produto in context.Produto
                                on itempedido.ProdutoId equals produto.Id
                                 select new Cozinha
                                 {
                                     IdPedido = pedido.Id,
                                     IdProduto = produto.Id,
                                     Iditem = itempedido.Id,
                                     Mesa = pedido.Mesa,
                                     NomeGarcom = pedido.NomeSolicitante,
                                     NomeSolicitante = pedido.NomeGarcom,
                                     Tipo = produto.Tipo,
                                     NomeProduto = produto.Nome,
                                     Preco = produto.Preco,
                                     Pendente = itempedido.Pendente,
                                     Data = pedido.Data,
                                 }).OrderByDescending(s=> s.IdPedido ).ToListAsync();

            if (cozinha == null)
            {
                return NotFound();
            }

            return Ok(cozinha);
        }
    }

}
