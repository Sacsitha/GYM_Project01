using Gym_Management.IRepository;
using Gym_Management.Models.RequestModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Gym_Management.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EnrollMentController : ControllerBase
    {
        private readonly IEnrollmentRepository _enrollmentRepository;

        public EnrollMentController(IEnrollmentRepository enrollmentRepository)
        {
            _enrollmentRepository = enrollmentRepository;
        }

        [HttpPost("Add-Entrollment")]
        public IActionResult AddEntrollment([FromForm] EntrollmentRequestDTO entrollmentRequestDTO)
        {
            _enrollmentRepository.AddEntrollment(entrollmentRequestDTO);
            return Ok(entrollmentRequestDTO);
        }

        [HttpGet("Get-All-Entrollment")]
        public async Task<IActionResult> GetAllEntrollments()
        {
            var EntrollList = await _enrollmentRepository.GetAllEntrollments();
            return Ok(EntrollList);
        }

        [HttpGet("Get-EnrollmentBy-Id/{Id}")]
        public IActionResult GetEntrollment(long id)
        {
            try
            {
                var enroll = _enrollmentRepository.GetEntrollmentById(id);
                return Ok(enroll);
            }
            catch (Exception ex) 
            {
                 return BadRequest(ex.Message); 
            }
        }


        [HttpDelete("Delete-Enrollment/{Id}")]
        public IActionResult DeleteEnrollment(int id)
        {
            _enrollmentRepository.DeleteEnrollment(id);
            return Ok("Enroll Removed Successfully..");
        }


    }
}
