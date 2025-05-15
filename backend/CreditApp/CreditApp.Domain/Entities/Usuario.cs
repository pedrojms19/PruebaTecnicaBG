

namespace CreditApp.Domain.Entities
{
    public class Usuario
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string? Name { get; set; }
        public string? Email { get; set; }

        public string? Password { get; set; }
        public string Rol { get; set; } = "Solicitante";
    }
}
