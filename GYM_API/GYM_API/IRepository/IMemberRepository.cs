using GYM_API.Modals.RequestModal;
using GYM_API.Modals.ResponseModal;

namespace GYM_API.IRepository
{
    public interface IMemberRepository
    {
        ICollection<MemberResponseDTO> GetAllMember();
        void AddMember(MemberRegisterRequestDTO memberRegister);
        MemberResponseDTO GetMemberById(string id);
        MemberResponseDTO GetMemberByUserid(string id);
        void DeleteMember(string memberId);
        void UpdateMember(string memberId, MemberRegisterRequestDTO memberRegisterRequestDTO);

    }
}
