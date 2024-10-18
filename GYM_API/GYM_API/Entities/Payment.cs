namespace GYM_API.Entities
{
    public class Payment
    {
        public int Id { get; set; }
        public DateTime PaymentDate { get; set; }
        public decimal Amount { get; set; }
        public string Details { get; set; }
        public int MemberId { get; set; }

    }
}
