using GYM_API.IRepository;
using GYM_API.Modals.RequestModal;
using GYM_API.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GYM_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public readonly IUserRepository UserRepository;

        public UserController(IUserRepository userRepository)
        {
            UserRepository = userRepository;
        }
        [HttpGet("Get-All-Users")]
        public IActionResult GetAllMembers()
        {
            var UsersList = UserRepository.GetAllUser();
            return Ok(UsersList);
        }
        [HttpPost("Add-User")]

        public IActionResult AddUsers( UserRequestModel userRequestModel)
        {
            try
            {
                UserRepository.AddUser(userRequestModel);
                return Ok(userRequestModel);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("Delete-User/{id}")]

        public IActionResult DeleteMembers(string id)
        {
            UserRepository.DeleteUser(id);
            return Ok("Delete Successfully..");
        }

        [HttpPut("Update-User/{id}")]

        public IActionResult UpdateUser(string id, UserRequestModel userRequestModel)
        {
            UserRepository.UpdateUser(id, userRequestModel);
            return Ok("Update Successfully..");
        }
        [HttpGet("Get-User-By-Id/{id}")]

        public IActionResult GetUserId(string id)
        {
            try
            {
                var User = UserRepository.GetUserById(id);
                return Ok(User);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
