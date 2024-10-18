using GYM_API.Modals.ResponseModal;

namespace GYM_API.IRepository
{
    public interface IPaymentRepository
    {
        ICollection<PaymentResponseDTO> GetAllFullPayments();
        PaymentResponseDTO AddFullPayment(PaymentResponseDTO paymentResponseDTO);
    }
}
