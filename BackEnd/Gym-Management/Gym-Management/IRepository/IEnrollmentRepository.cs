using Gym_Management.Models.RequestModel;
using Gym_Management.Models.ResponseModel;

namespace Gym_Management.IRepository
{
    public interface IEnrollmentRepository
    {
        EntrollmentResponseDTO AddEntrollment(EntrollmentRequestDTO entrollmentRequestDTO);
        Task<ICollection<EntrollmentResponseDTO>> GetAllEntrollments();
        EntrollmentResponseDTO GetEntrollmentById(Int64 id);
        void DeleteEnrollment(Int64 Id);
    }
}
