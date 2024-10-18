using GYM_API.IRepository;
using GYM_API.Modals.RequestModal;
using GYM_API.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GYM_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EnrollmentController : ControllerBase
    {
        public readonly IEnrollmentRepository _enrollmentRepository;

        public EnrollmentController(IEnrollmentRepository enrollmentRepository)
        {
            _enrollmentRepository = enrollmentRepository;
        }


        [HttpPost("Add-Enrollment")]

        public IActionResult AddEnrollment(EnrollmentRequestModel enrollmentRequestModel)
        {
            _enrollmentRepository.AddEnrollment(enrollmentRequestModel);
            return Ok(enrollmentRequestModel);
        }
        [HttpGet("Get-Enrollments-By-MemberId/{id}")]
        public IActionResult GetEnrollmentByMemberId(string id)
        {
            var enrollments = _enrollmentRepository.GetEnrollmentByMemberId(id);
            return Ok(enrollments);
        }
        [HttpGet("Get-Enrollments-By-MemberId-OverDue/{id}")]
        public IActionResult GetEnrollmentByMemberIdOverDue(string id)
        {
            var enrollments = _enrollmentRepository.GetEnrollmentByMemberIdOverDue(id);
            return Ok(enrollments);
        }
        [HttpGet("Get-All-Enrollments")]
        public IActionResult GetAllEnrollment()
        {
            var enrollments = _enrollmentRepository.GetAllEnrollment();
            return Ok(enrollments);
        }
        [HttpGet("Get-Single-Enrollments/{memberId},{programId}")]
        public IActionResult GetSingleEnrollment(string memberId,int programId)
        {
            var enrollments = _enrollmentRepository.GetSingleEnrollment(memberId, programId);
            return Ok(enrollments);
        }
        [HttpGet("Get-All-OverDue-Enrollments")]
        public IActionResult GetEnrollmentOverDues()
        {
            var enrollments = _enrollmentRepository.GetEnrollmentOverDues();
            return Ok(enrollments);
        }
        [HttpPut("Update-NextOverDue/{memberId},{programId}")]

        public IActionResult UpdateNextDueDate(string memberId, int programId,EnrollmentRequestModel enrollmentRequestModel)
        {
            _enrollmentRepository.UpdateNextDueDate(memberId, programId,enrollmentRequestModel);
            return Ok("Update Successfully..");
        }

        [HttpDelete("Delete-Enrollment/{MemberId},{ProgramId}")]

        public IActionResult DeleteEnrollment(string MemberId,int ProgramId)
        {
            _enrollmentRepository.DeleteEnrollment(MemberId,ProgramId);
            return Ok("Delete Successfully..");
        }
    }
}
