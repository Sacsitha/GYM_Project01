using GYM_API.IRepository;
using GYM_API.Modals.RequestModal;
using GYM_API.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GYM_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MemberController : ControllerBase
    {
        private readonly IMemberRepository _memberRepository;


        public MemberController(IMemberRepository memberRepository)
        {
            _memberRepository = memberRepository;

        }



        [HttpPost("Add-Member")]

        public IActionResult AddMembers(MemberRegisterRequestDTO memberRegister)
        {
            _memberRepository.AddMember(memberRegister);
            return Ok(memberRegister);
        }

        [HttpGet("Get-All-Members")]
        public IActionResult GetAllMember()
        {
            var member = _memberRepository.GetAllMember();
            return Ok(member);
        }

        [HttpGet("Get-Member-By-ID /{id}")]
        public IActionResult GetWorkOutProgramById(string id)
        {
            try
            {
                var member = _memberRepository.GetMemberById(id);
                return Ok(member);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("Get-Member-By-UserID /{id}")]
        public IActionResult GetMemberByUserId(string id)
        {
            try
            {
                var member = _memberRepository.GetMemberByUserid(id);
                return Ok(member);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("Delete-Member/{memberId}")]

        public IActionResult DeleteMembers(string memberId)
        {
            _memberRepository.DeleteMember(memberId);
            return Ok("Delete Successfully..");
        }

        [HttpPut("Update-Member/{memberId}")]

        public IActionResult UpdateMember(string memberId, MemberRegisterRequestDTO memberUpdate)
        {
            _memberRepository.UpdateMember(memberId, memberUpdate);
            return Ok("Update Successfully..");
        }
    }
}
