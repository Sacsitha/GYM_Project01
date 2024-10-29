using GYM_API.Entities;
using GYM_API.IRepository;
using GYM_API.Modals.RequestModal;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GYM_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkOutProgramController : ControllerBase
    {
        private readonly IWorkOutProgramRepository _workOutProgramRepository;

        public WorkOutProgramController(IWorkOutProgramRepository workOutProgramRepository)
        {
            _workOutProgramRepository = workOutProgramRepository;
        }
        //Add workout program
        [HttpPost("Add-WorkOut-Programs")]
        public IActionResult AddProgram( WorkOutProgramRequestDTO workOutProgram)
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
        //Get All workout programs
        [HttpGet("Get-All-WorkOut-Programs")]
        public IActionResult GetAllPrograms()
        {
            var WorkOutProgramList = _workOutProgramRepository.GetAllPrograms();
            return Ok(WorkOutProgramList);
        }
        //Get program by Id
        [HttpGet("Get-WorkOut-Program-By-ID /{id}")]
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
        [HttpPut("Update-WorkOut-Program/{ProgramId}")]
        public IActionResult UpdateWorkOutProgram(int ProgramId, WorkOutProgramRequestDTO updateWorkOutProgramRequestModel)
        {
            try
            {
                _workOutProgramRepository.UpdateProgram(ProgramId,updateWorkOutProgramRequestModel);
                return Ok("WorkOut Program Updated Successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        // Delete Program
        [HttpDelete("Delete-Program/{id}")]
        public IActionResult DeleteWorkOutProgram(int id)
        {
            _workOutProgramRepository.DeleteWorkOutProgram(id);
            return Ok("WorkOut Program Deleted Successfully.");
        }


    }
}
