using Gym_Management.Entities;

namespace Gym_Management.IRepository
{
    public interface IProgramPaymentDetailsRepository
    {

        ProgramPaymentDetails AddPaymentDetails(ProgramPaymentDetails newPaymentDetails);
    }
}
