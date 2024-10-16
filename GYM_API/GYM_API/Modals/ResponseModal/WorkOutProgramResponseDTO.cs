namespace GYM_API.Modals.ResponseModal
{
    public class WorkOutProgramResponseDTO
    {
        public string title { get; set; }
        public string description { get; set; }
        public DateTime createdDate { get; set; }
        public decimal initalFee { get; set; }
        public decimal monthlyFee { get; set; }
        public decimal annualFee { get; set; }
    }
}
