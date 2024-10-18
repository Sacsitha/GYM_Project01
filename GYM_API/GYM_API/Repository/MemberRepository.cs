using GYM_API.Entities;
using GYM_API.IRepository;
using GYM_API.Modals.RequestModal;
using GYM_API.Modals.ResponseModal;
using Microsoft.Data.Sqlite;

namespace GYM_API.Repository
{
    public class MemberRepository : IMemberRepository
    {
        private readonly string _connectionString;

        public MemberRepository(string connectionString)
        {
            _connectionString = connectionString;
        }


        public ICollection<MemberResponseDTO> GetAllMember()
        {
            var WorkOutProgramList = new List<MemberResponseDTO>();
            using (var connection = new SqliteConnection(_connectionString))
            {
                connection.Open();
                var command = connection.CreateCommand();
                command.CommandText = "SELECT * FROM MembersDetails WHERE MemberStatus=true ";
                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        WorkOutProgramList.Add(new MemberResponseDTO()
                        {
                            userId = reader.GetString(14),
                            Id=reader.GetString(0),
                            nicNumber = reader.GetString(1),
                            fname = reader.GetString(2),
                            lname = reader.GetString(3),
                            address = reader.GetString(5),
                            dob = reader.GetDateTime(4),
                            contactNo = reader.GetString(5),
                            email = reader.GetString(6),
                            age = reader.GetInt32(7),
                            gender = reader.GetString(8),
                            height = reader.GetInt32(9),
                            weight = reader.GetInt32(10)
                        }
                        );
                    }
                }
                return WorkOutProgramList;
            }
        }
        public MemberResponseDTO GetMemberById(string id)
        {
            using (var connection = new SqliteConnection(_connectionString))
            {
                connection.Open();
                var command = connection.CreateCommand();
                command.CommandText = "SELECT * FROM MembersDetails WHERE Id == @id";
                command.Parameters.AddWithValue("@id", id);
                using (var reader = command.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        return new MemberResponseDTO()
                        {
                            userId = reader.GetString(14),
                            Id = reader.GetString(0),
                            nicNumber = reader.GetString(1),
                            fname = reader.GetString(2),
                            lname = reader.GetString(3),
                            address = reader.GetString(5),
                            dob = reader.GetDateTime(4),
                            contactNo = reader.GetString(5),
                            email = reader.GetString(6),
                            age = reader.GetInt32(7),
                            gender = reader.GetString(8),
                            height = reader.GetInt32(9),
                            weight = reader.GetInt32(10)
                        };
                    }
                    else
                    {
                        throw new Exception("Member Not Found");
                    }
                };
            };
            return null;
        }
        public MemberResponseDTO GetMemberByUserid(string id)
        {
            using (var connection = new SqliteConnection(_connectionString))
            {
                connection.Open();
                var command = connection.CreateCommand();
                command.CommandText = "SELECT * FROM MembersDetails WHERE UserId == @id";
                command.Parameters.AddWithValue("@id", id);
                using (var reader = command.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        return new MemberResponseDTO()
                        {
                            userId = reader.GetString(14),
                            Id = reader.GetString(0),
                            nicNumber = reader.GetString(1),
                            fname = reader.GetString(2),
                            lname = reader.GetString(3),
                            address = reader.GetString(5),
                            dob = reader.GetDateTime(4),
                            contactNo = reader.GetString(5),
                            email = reader.GetString(6),
                            age = reader.GetInt32(7),
                            gender = reader.GetString(8),
                            height = reader.GetInt32(9),
                            weight = reader.GetInt32(10)
                        };
                    }
                    else
                    {
                        throw new Exception("Member Not Found");
                    }
                };
            };
            return null;
        }
        public void AddMember(MemberRegisterRequestDTO memberRegister)
        {
            using (var connection = new SqliteConnection(_connectionString))
            {
                connection.Open();
                var command = connection.CreateCommand();
                command.CommandText = "INSERT INTO MembersDetails(Id,Nic,FirstName,LastName,DOB,ContactNumber,Email,Age,Gender,Height,Weight,AdmissionDate,MemberStatus,Address,UserId) values(@Id,@Nic,@FirstName,@LastName,@DOB,@ContactNumber,@Email,@Age,@Gender,@Height,@Weight,@AdmissionDate,@MemberStatus,@Address,@UserId)";
                command.Parameters.AddWithValue("@Id", memberRegister.Id);
                command.Parameters.AddWithValue("@Nic", memberRegister.nicNumber);
                command.Parameters.AddWithValue("@FirstName", memberRegister.fname);
                command.Parameters.AddWithValue("@LastName", memberRegister.lname);
                command.Parameters.AddWithValue("@DOB", memberRegister.dob);
                command.Parameters.AddWithValue("@ContactNumber", memberRegister.contactNo);
                command.Parameters.AddWithValue("@Email", memberRegister.email);
                command.Parameters.AddWithValue("@Age", memberRegister.age);
                command.Parameters.AddWithValue("@Gender", memberRegister.gender);
                command.Parameters.AddWithValue("@Height", memberRegister.height);
                command.Parameters.AddWithValue("@Weight", memberRegister.weight);
                command.Parameters.AddWithValue("@AdmissionDate", memberRegister.admissionDate);
                command.Parameters.AddWithValue("@MemberStatus", memberRegister.MemberStatus);
                command.Parameters.AddWithValue("@Address", memberRegister.address);
                command.Parameters.AddWithValue("@UserId", memberRegister.userId);
                command.ExecuteNonQuery();
            }
        }


        //public void DeleteMember(string memberId)
        //{
        //    using (var connection = new SqliteConnection(_connectionString))
        //    {
        //        connection.Open();
        //        var command = connection.CreateCommand();
        //        command.CommandText = "DELETE FROM MembersDetails WHERE Id == @id";
        //        command.Parameters.AddWithValue("@id", memberId);
        //        command.ExecuteNonQuery();
        //    }
        //}


        public void UpdateMember(string memberId, MemberRegisterRequestDTO memberRegisterRequestDTO)
        {
            using (var connection = new SqliteConnection(_connectionString))
            {
                connection.Open();
                var command = connection.CreateCommand();
                command.CommandText = "UPDATE MembersDetails SET FirstName = @firstname ,Nic=@Nic, LastName = @lastname , DOB = @dob , ContactNumber = @contactnumber , Email = @email , Age = @age , Gender = @gender , Height = @height , Weight = @weight,Address = @Address  WHERE Id == @id ";
                command.Parameters.AddWithValue("@firstname", memberRegisterRequestDTO.fname);
                command.Parameters.AddWithValue("@lastname", memberRegisterRequestDTO.lname);
                command.Parameters.AddWithValue("@dob", memberRegisterRequestDTO.dob);
                command.Parameters.AddWithValue("@contactnumber", memberRegisterRequestDTO.contactNo);
                command.Parameters.AddWithValue("@email", memberRegisterRequestDTO.email);
                command.Parameters.AddWithValue("@age", memberRegisterRequestDTO.age);
                command.Parameters.AddWithValue("@gender", memberRegisterRequestDTO.gender);
                command.Parameters.AddWithValue("@height", memberRegisterRequestDTO.height);
                command.Parameters.AddWithValue("@weight", memberRegisterRequestDTO.weight);
                command.Parameters.AddWithValue("@Address", memberRegisterRequestDTO.address);
                command.Parameters.AddWithValue("@Nic", memberRegisterRequestDTO.nicNumber);
                command.Parameters.AddWithValue("@id", memberId);
                command.ExecuteNonQuery();
            }
        }

        public void DeleteMember(string memberId)
        {
            using (var connection = new SqliteConnection(_connectionString))
            {
                connection.Open();
                var command = connection.CreateCommand();
                command.CommandText = "UPDATE MembersDetails SET MemberStatus =false   WHERE Id == @id ";
                command.Parameters.AddWithValue("@id", memberId);
                command.ExecuteNonQuery();
            }
        }

    }
}
