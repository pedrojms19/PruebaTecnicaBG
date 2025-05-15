using CreditApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CreditApp.Infraestructure.Persistence
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Usuario> Users => Set<Usuario>();
        public DbSet<Solicitud> Solicitudes => Set<Solicitud>();
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Solicitud>(entity =>
            {
                entity.Property(e => e.MontoSolicitado)
                      .HasPrecision(18, 2);

                entity.Property(e => e.IngresoMensual)
                      .HasPrecision(18, 2);
            });
        }


    }
}
