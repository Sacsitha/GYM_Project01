using GYM_API.IRepository;
using GYM_API.Modals.RequestModal;
using GYM_API.Modals.ResponseModal;
using Microsoft.Data.Sqlite;

namespace GYM_API.Repository
{
    public class UserRepository: IUserRepository
    {
        private readonly string _connectionString;

        public UserRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void AddUser(UserRequestModel userRequestModel)
        {
            using (var connection = new SqliteConnection(_connectionString))
            {
                connection.Open();
                var command = connection.CreateCommand();
                command.CommandText = "INSERT INTO Users(Id,UserRole,Password) values(@Id,@UserRole,@Password)";
                command.Parameters.AddWithValue("@UserRole", userRequestModel.userRole);
                command.Parameters.AddWithValue("@Id", userRequestModel.Id);
                command.Parameters.AddWithValue("@Password", userRequestModel.password);
                command.ExecuteNonQuery();
            }
        }
        public void DeleteUser(string userId)
        {
            using (var connection = new SqliteConnection(_connectionString))
            {
                connection.Open();
                var command = connection.CreateCommand();
                command.CommandText = "DELETE FROM Users WHERE Id == @id";
                command.Parameters.AddWithValue("@id", userId);
                command.ExecuteNonQuery();
            }
        }

        public void UpdateUser(string userId, string password)
        {
            using (var connection = new SqliteConnection(_connectionString))
            {
                connection.Open();
                var command = connection.CreateCommand();
                command.CommandText = "UPDATE Users SET Password = @Password  WHERE Id == @id ";
                command.Parameters.AddWithValue("@Password", password);
                command.Parameters.AddWithValue("@id", userId);
                command.ExecuteNonQuery();
            }
        }
        public  ICollection<UserResponseModel> GetAllUser()
        {
            var UserList = new List<UserResponseModel>();

            using (var connection = new SqliteConnection(_connectionString))
            {
                connection.Open();
                var command = connection.CreateCommand();
                command.CommandText = "SELECT * FROM Users";
                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        UserList.Add(new UserResponseModel()
                        {
                            Id = reader.GetString(0),
                            userRole = reader.GetString(1),
                            password = reader.GetString(2)

                        });
                    }
                }

            }
            return UserList;
        }
        public UserResponseModel GetUserById(string id)
        {

            using (var connection = new SqliteConnection(_connectionString))
            {
                connection.Open();
                var command = connection.CreateCommand();
                command.CommandText = "SELECT * FROM Users WHERE Id=@Id";
                command.Parameters.AddWithValue("@Id", id);
                using (var reader = command.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        return new UserResponseModel()
                        {
                            Id = reader.GetString(0),
                            userRole = reader.GetString(1),
                            password = reader.GetString(2)
                        };
                    }
                    else
                    {
                        throw new Exception("User Not Found!");
                    }
                };
            };
            return null;
        }
    }
}
