namespace GYM_API.Modals.ResponseModal
{
    public class PaymentResponseDTO
    {
        public DateTime PaymentDate { get; set; }
        public decimal Amount { get; set; }
        public string Details { get; set; }
        public int MemberId { get; set; }
    }
}
