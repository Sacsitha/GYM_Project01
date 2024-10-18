using GYM_API.IRepository;
using GYM_API.Modals.RequestModal;
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

        [HttpGet("Get-All-Members")]
        public async Task<IActionResult> GetAllMembers()
        {
            var MembersList = _memberRepository.GetAllMembers();
            return Ok(MembersList);
        }

        [HttpPost("Add-Member")]

        public IActionResult AddMembers([FromForm]MemberRegisterRequestDTO memberRegister)
        {
            _memberRepository.AddMember(memberRegister);
            return Ok(memberRegister);
        }

        [HttpDelete("Delete-Member/{memberId}")]

        public IActionResult DeleteMembers(string memberId)
        {
            _memberRepository.DeleteMember(memberId);
            return Ok("Delete Successfully..");
        }

        [HttpPut("Update-Member/{memberId}")]

        public IActionResult UpdateMember( string memberId , [FromForm] MemberUpdateRequestDTO memberUpdate )
        {
            _memberRepository.UpdateMember(memberId, memberUpdate);
            return Ok("Update Successfully..");
        }
    }
}
