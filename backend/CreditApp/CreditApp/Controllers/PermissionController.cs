using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CreditApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PermissionController : ControllerBase
    {
        [HttpGet("user-area")]
        [Authorize]
        public IActionResult UserArea()
        {
            var userName = User.Identity?.Name ?? "Unknown";
            return Ok($"Bienvenido, {userName}. Esta es un área protegida para usuarios autenticados.");
        }

        // Requiere autenticación y rol "Analista"
        [HttpGet("admin-area")]
        [Authorize(Roles = "Analista")]
        public IActionResult AdminArea()
        {
            return Ok("Bienvenido administrador. Esta es un área exclusiva para el rol Admin.");
        }
    }
}
