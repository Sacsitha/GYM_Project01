using GYM_API.Modals.RequestModal;
using GYM_API.Modals.ResponseModal;

namespace GYM_API.IRepository
{
    public interface IUserRepository
    {
        ICollection<UserResponseModel> GetAllUser();
        void UpdateUser(string userId, string password);
        void DeleteUser(string userId);
        void AddUser(UserRequestModel userRequestModel);
        UserResponseModel GetUserById(string id);
    }
}
