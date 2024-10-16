using Gym_Management.Entities;
using Gym_Management.IRepository;
using Gym_Management.Models.RequestModel;
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

        [HttpPost("Add-WorkOut-Programs")]
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

        [HttpGet("Get-All-WorkOut-Programs")]
        public IActionResult GetAllPrograms()
        {
            var WorkOutProgramList = _workOutProgramRepository.GetAllPrograms();
            return Ok(WorkOutProgramList);  
        }

        [HttpGet("Get-WorkOut-Program-By-ID /{programId}")]
        public IActionResult GetWorkOutProgramById(int id)
        {
            try
            {
                var program = _workOutProgramRepository.GetWorkOutProgramById(id);
                return Ok(program);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // Update Program
        //[HttpPut("Update-WorkOut-Program/{ProgramId}")]
        //public IActionResult UpdateWorkOutProgram(int id)
        //{
        //    try
        //    {
        //        _workOutProgramRepository.UpdateWorkOutProgram(id);
        //        return Ok("WorkOut Program Updated Successfully.");
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}


        // Delete Program
        [HttpDelete("Delete-Program/{ProgramId}")]
        public IActionResult DeleteWorkOutProgram(int id)
        {
            _workOutProgramRepository.DeleteWorkOutProgram(id);
            return Ok("WorkOut Program Deleted Successfully.");
        }


    }
}
