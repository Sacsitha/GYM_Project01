using GYM_API.Modals.RequestModal;
using GYM_API.Modals.ResponseModal;

namespace GYM_API.IRepository
{
    public interface IEnrollmentRepository
    {
        void AddEnrollment(EnrollmentRequestModel enrollmentRequestModel);
        ICollection<EnrollmentResponseModel> GetAllEnrollment();
        ICollection<EnrollmentResponseModel> GetEnrollmentByMemberId(string id);
        ICollection<EnrollmentResponseModel> GetEnrollmentOverDues();
        ICollection<EnrollmentResponseModel> GetEnrollmentByMemberIdOverDue(string id);
        EnrollmentResponseModel GetSingleEnrollment(string MemberId, int ProgramId);
        void UpdateNextDueDate(string memberId, int programId, EnrollmentRequestModel enrollmentRequestModel);
        void DeleteEnrollment(string MemberId, int ProgramId);
    }
}
