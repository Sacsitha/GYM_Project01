using GYM_API.Modals.RequestModal;
using GYM_API.Modals.ResponseModal;

namespace GYM_API.IRepository
{
    public interface IUserRepository
    {
        Task<ICollection<UserResponseModel>> GetAllUser();
        void UpdateUser(int userId, string password);
        void DeleteUser(int userId);
        void AddUser(UserRequestModel userRequestModel);
        UserResponseModel GetUserById(int id);
    }
}
