using CreditApp.Application.Interfaces;
using CreditApp.Application.DTOs;
using CreditApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using CreditApp.Infraestructure.Persistence;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Http.HttpResults;

namespace CreditApp.Infraestructure.Services
{
    public class SolicitudService : ISolicitudService
    {
        private readonly AppDbContext _context;
        public SolicitudService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Solicitud> CreateLoan(Guid userId, SolicitudRequest dto)
        {

            var status = dto.MonthlyIncome >= 1500
            ? "Aprobado"
            : "Pendiente";

            var loan = new Solicitud
            {
                UsuarioId = userId,
                MontoSolicitado = dto.Amount,
                Plazo = dto.TermMonths,
                IngresoMensual = dto.MonthlyIncome,
                AntiguedadLaboral = dto.WorkSeniorityYears,
                Estado = status
            };

            _context.Solicitudes.Add(loan);
            await _context.SaveChangesAsync();
            return loan;

        }

        public async Task<List<Solicitud>> GetAllLoans(string? status = null)
        {
            var query = _context.Solicitudes.Include(l => l.Usuario).AsQueryable();

            if (!string.IsNullOrEmpty(status))
            {
                query = query.Where(l => l.Estado == status);
            }

            return await query.ToListAsync();
        }

        public Task<Solicitud?> GetById(Guid id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Solicitud>> GetByUserId(Guid userId)
        {
            return await _context.Solicitudes.Where(l => l.UsuarioId == userId)
            .ToListAsync();
        }

        public async Task UpdateLoanStatus(Guid id, string newStatus)
        {
            var loan = await _context.Solicitudes.FindAsync(id);
            if (loan == null)
                throw new Exception("Solicitud no encontrada.");


            loan.Estado = newStatus;
            await _context.SaveChangesAsync();
        }
    }
}
