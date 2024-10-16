using Gym_Management.Controllers;

namespace Gym_Management.Models.ResponseModel
{
    public class WorkOutProgramResponseDTO
    {
        public int id { get; set; }

        public string title { get; set; }
        public string description { get; set; }
        public DateTime createdDate { get; set; }
        public decimal initalFee { get; set; }
        public decimal monthlyFee { get; set; }
        public decimal annualFee { get; set; }

    }
}
