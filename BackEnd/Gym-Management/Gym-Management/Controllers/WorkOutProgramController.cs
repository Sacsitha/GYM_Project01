using Gym_Management.Entities;
using Gym_Management.IRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Gym_Management.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkOutProgramController : ControllerBase
    {
        private readonly IWorkOutProgramRepository _workOutProgramRepository;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public WorkOutProgramController(IWorkOutProgramRepository workOutProgramRepository, IWebHostEnvironment webHostEnvironment)
        {
            _workOutProgramRepository = workOutProgramRepository;
            _webHostEnvironment = webHostEnvironment;
        }

        [HttpPost("Add-Programs")]
        public IActionResult AddProgram([FromForm] WorkOutProgram workOutProgram)
        {
            try
            {
                _workOutProgramRepository.AddProgram(workOutProgram);
                return Ok(workOutProgram);
            }
            catch (Exception ex)
            {
               return BadRequest(ex.Message);
            }
        }

    }
}
