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

        public async Task<ICollection<MemberResponseDTO>> GetAllMembers()
        {
            var MemberList = new List<MemberResponseDTO>();

            using (var connection = new SqliteConnection(_connectionString))
            {
                connection.Open();
                var command = connection.CreateCommand();
            command.CommandText = "SELECT * FROM MembersDetails WHERE MemberStatus=true";
                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        MemberList.Add(new MemberResponseDTO()
    {
                            userId = reader.GetInt32(14),
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

                        });
                    }
                }

            }
            return MemberList;

        }

        public void AddMember(MemberRegisterRequestDTO memberRegister)
        {
            using (var connection = new SqliteConnection(_connectionString))
            {
                connection.Open();
                var command = connection.CreateCommand();
                command.CommandText = "INSERT INTO MembersDetails(Nic,FirstName,LastName,DOB,ContactNumber,Email,Age,Gender,Height,Weight,AdmissionDate,MemberStatus,Address,UserId) values(@Nic,@FirstName,@LastName,@DOB,@ContactNumber,@Email,@Age,@Gender,@Height,@Weight,@AdmissionDate,@MemberStatus,@Address,@UserId)";
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
                command.Parameters.AddWithValue("@Address", memberRegister.MemberStatus);
                command.Parameters.AddWithValue("@UserId", memberRegister.MemberStatus);
                command.ExecuteNonQuery();
            }
        }


        public void DeleteMember(string memberId)
        {
            using (var connection = new SqliteConnection(_connectionString))
            {
                connection.Open();
                var command = connection.CreateCommand();
                command.CommandText = "DELETE FROM MembersDetails WHERE Id == @id";
                command.Parameters.AddWithValue("@id", memberId);
                command.ExecuteNonQuery();
            }
        }


        //    public void UpdateMember(string memberId , MemberUpdateRequestDTO memberUpdate)
        //    {
        //        using(var connection = new SqliteConnection(_connectionString))
        //        {
        //            connection.Open();
        //            var command = connection.CreateCommand();
        //            command.CommandText = "UPDATE MembersDetails SET FirstName = @firstname , LastName = @lastname , DOB = @dob , ContactNumber = @contactnumber , Email = @email , Age = @age , Gender = @gender , Height = @height , Weight = @weight  WHERE Id == @id ";
        //            command.Parameters.AddWithValue("@firstname", memberUpdate.FirstName);
        //            command.Parameters.AddWithValue("@lastname", memberUpdate.LastName);
        //            command.Parameters.AddWithValue("@dob", memberUpdate.DOB );
        //            command.Parameters.AddWithValue("@contactnumber", memberUpdate.ContactNumber);
        //            command.Parameters.AddWithValue("@email", memberUpdate.Email);
        //            command.Parameters.AddWithValue("@age", memberUpdate.Age);
        //            command.Parameters.AddWithValue("@gender", memberUpdate.Gender);
        //            command.Parameters.AddWithValue("@height", memberUpdate.Height);
        //            command.Parameters.AddWithValue("@weight", memberUpdate.Weight);
        //            command.Parameters.AddWithValue("@id", memberId);
        //            command.ExecuteNonQuery();
        //        }
        //    } 

    }
}
