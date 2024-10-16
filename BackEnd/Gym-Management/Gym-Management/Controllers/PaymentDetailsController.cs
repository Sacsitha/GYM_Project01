using Gym_Management.Entities;
using Gym_Management.IRepository;
using Gym_Management.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Gym_Management.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentDetailsController : ControllerBase
    {
        private readonly IProgramPaymentDetailsRepository _programPaymentDetailsRepository;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public PaymentDetailsController(IProgramPaymentDetailsRepository programPaymentDetailsRepository, IWebHostEnvironment webHostEnvironment)
        {
            _programPaymentDetailsRepository = programPaymentDetailsRepository;
            _webHostEnvironment = webHostEnvironment;
        }

        [HttpPost("Add-Programs")]
        public IActionResult AddProgram([FromForm] ProgramPaymentDetails programPaymentDetails)
        {
            try
            {
               _programPaymentDetailsRepository.AddPaymentDetails(programPaymentDetails);
                return Ok(programPaymentDetails);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
