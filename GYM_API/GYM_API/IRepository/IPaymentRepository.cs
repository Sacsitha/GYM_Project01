using GYM_API.Entities;
using GYM_API.Modals.ResponseModal;

namespace GYM_API.IRepository
{
    public interface IPaymentRepository
    {
        void AddFullPayment(PaymentResponseDTO payment);
        ICollection<PaymentResponseDTO> GetAllPayments();
        ICollection<PaymentResponseDTO> GetAllPaymentsById(string id);
    }
}
