using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CreditApp.Domain.Entities
{
    public class Solicitud
    {
        public Guid Id { get; set; }
        public decimal MontoSolicitado { get; set; }
        public int Plazo {  get; set; }
        public decimal  IngresoMensual {  get; set; }
        public int AntiguedadLaboral { get; set; }
        public string Estado { get; set; } = "Pendiente";
        public Usuario? Usuario { get; set; }
        public Guid UsuarioId { get; set; }

    }
}
