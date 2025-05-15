using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CreditApp.Application.DTOs
{
    public class SolicitudRequest
    {
        [Required]
        public decimal Amount { get; set; }
        [Required]
        public int TermMonths { get; set; }
        [Required]
        public decimal MonthlyIncome { get; set; }
        [Required]
        public int WorkSeniorityYears { get; set; }
    }
}
