namespace GYM_API.Modals.RequestModal
{
    public class WorkOutProgramRequestDTO
    {
        public string title { get; set; }
        public string description { get; set; }
        public bool programStatus { get; set; } = true;
        public DateTime createdDate { get; set; }
        public decimal initalFee { get; set; }
        public decimal monthlyFee { get; set; }
        public decimal annualFee { get; set; }
    }
}
