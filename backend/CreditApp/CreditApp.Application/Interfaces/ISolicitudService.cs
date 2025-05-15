using CreditApp.Application.DTOs;
using CreditApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CreditApp.Application.Interfaces
{
    public interface ISolicitudService
    {
        Task<List<Solicitud>> GetAllLoans(string? status = null);
        Task<List<Solicitud>> GetByUserId(Guid userId);
        Task<Solicitud?> GetById(Guid id);
        Task<Solicitud> CreateLoan(Guid userId, SolicitudRequest dto);
        Task UpdateLoanStatus(Guid id, string newStatus);
    }
}
