using CreditApp.Application.DTOs;
using CreditApp.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CreditApp.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SolicitudController : ControllerBase
    {
        private readonly ISolicitudService _service;
        public SolicitudController(ISolicitudService service) => _service = service;

        [Authorize(Roles = "Solicitante")]
        [HttpPost("createloan")]
        public async Task<IActionResult> Create(SolicitudRequest dto)
        {
            if (dto.Amount <= 0 || dto.MonthlyIncome <= 0 || dto.TermMonths<=0 || dto.WorkSeniorityYears<=0)
                return BadRequest("Todos los campos son obligatorios son obligatorios.");


            var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var result = await _service.CreateLoan(userId, dto);
            return Ok(result);
        }

        [Authorize(Roles = "Solicitante")]
        [HttpGet("getLoansByUserId")]
        public async Task<IActionResult> MyRequests()
        {
            var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var requests = await _service.GetByUserId(userId);
            return Ok(requests);
        }

        [Authorize(Roles = "Analista")]
        [HttpGet("getAllLoans")]
        public async Task<IActionResult> GetAll([FromQuery] string? status)
        {
            var result = await _service.GetAllLoans(status);
            return Ok(result);
        }

        [Authorize(Roles = "Analista")]
        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateStatus(Guid id, [FromQuery] string newStatus)
        {
            await _service.UpdateLoanStatus(id, newStatus);
            return NoContent();
        }

    }
}
