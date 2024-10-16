using GYM_API.Modals.RequestModal;
using GYM_API.Modals.ResponseModal;

namespace GYM_API.IRepository
{
    public interface IMemberRepository
    {
        Task<ICollection<MemberResponseDTO>> GetAllMembers();
        void AddMember(MemberRegisterRequestDTO memberRegister);
        //void DeleteMember(string memberId);
        //void UpdateMember(string memberId, MemberUpdateRequestDTO memberUpdate);
    }
}
