namespace GYM_API.Entities
{
    public class WorkOutProgram
    {
        public int id { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public bool programStatus { get; set; }
        public DateTime createdDate { get; set; }
        public decimal initalFee { get; set; }
        public decimal monthlyFee { get; set; }
        public decimal annualFee { get; set; }

    }
}
