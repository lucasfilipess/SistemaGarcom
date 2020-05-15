using Microsoft.EntityFrameworkCore;
using Rumo.Models;

namespace Rumo.Data
{
    public partial class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options)
            : base(options)
        {
        }
        
        //public DbSet<PedidosCopa> PedidosCopa { get; set; }
        //public DbSet<PedidosCozinha> PedidosCozinha { get; set; }
        //public DbSet<Cozinha> Cozinha { get; set; }
        //public DbSet<Copa> Copa { get; set; }
        public DbSet<Produto> Produto { get; set; }
        public DbSet<ItemPedido> ItemPedido { get; set; }
        public DbSet<Pedido> Pedido { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
           if (!optionsBuilder.IsConfigured)
           {
            //    optionsBuilder.UseSqlServer("Server=.\\SQLEXPRESS;Database=rumo_db;User Id=sa;Password=123;");
           }
        }
    }
}