using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Rumo.Models
{
    public class Pedido
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Este campo é obrigatório")]
        public string NomeGarcom { get; set; }

        [Required(ErrorMessage = "Este campo é obrigatório")]
        public string NomeSolicitante { get; set; }

        [Required(ErrorMessage = "Este campo é obrigatório")]
        public int Mesa { get; set; }

        public string Data { get; set; }

        [NotMapped]
        public ItemPedido[] ListaItensPedido { get; set; }
    }
}
