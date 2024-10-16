using GYM_API.Entities;
using GYM_API.Modals.ResponseModal;

namespace GYM_API.IRepository
{
    public interface IPaymentRepository
    {
        void AddFullPayment(Payment payment);
        ICollection<PaymentResponseDTO> GetPaymentsByMemberId(int id);
        ICollection<PaymentResponseDTO> GetAllPayments();
    }
}
