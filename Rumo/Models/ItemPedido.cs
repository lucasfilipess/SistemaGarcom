using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Rumo.Models
{
    public class ItemPedido
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Pedido")]
        [Required(ErrorMessage = "Este campo é obrigatório")]
        public int PedidoId { get; set; }

        [ForeignKey("Produto")]
        [Required(ErrorMessage = "Este campo é obrigatório")]
        public int ProdutoId { get; set; }
        [NotMapped]
        public Produto Produto { get; set; }
        [NotMapped]
        public Pedido Pedido { get; set; }

        [Required(ErrorMessage = "Este campo é obrigatório")]
        public bool Pendente { get; set; }        
    }
}
