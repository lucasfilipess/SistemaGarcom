using System;
using System.ComponentModel.DataAnnotations;

namespace Rumo.Models
{
    public class Historico
    {
        public int IdPedido { get; set; }
        public int IdProduto { get; set; }
        public int Iditem { get; set; }
        public int Mesa { get; set; }
        public string NomeSolicitante { get; set; }
        public string NomeGarcom { get; set; }
        public string Tipo { get; set; }
        public string NomeProduto { get; set; }
        public decimal Preco { get; set; }
        public bool Pendente { get; set; }
        public string Data { get; set; }
    }
}