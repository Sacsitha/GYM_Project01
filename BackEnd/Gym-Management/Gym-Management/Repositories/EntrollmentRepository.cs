using Gym_Management.Entities;
using Gym_Management.IRepository;
using Gym_Management.Models.RequestModel;
using Gym_Management.Models.ResponseModel;
using Microsoft.Data.Sqlite;

namespace Gym_Management.Repositories
{
    public class EntrollmentRepository : IEnrollmentRepository
    {
        private readonly string _connectionString;

        public EntrollmentRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public EntrollmentResponseDTO AddEntrollment(EntrollmentRequestDTO entrollmentRequestDTO)
        {
            using (var connection = new SqliteConnection(_connectionString))
            {
                connection.Open();
                var command = connection.CreateCommand();
                command.CommandText = @"
                  INSERT INTO EnrollDetails (ProgramId,MemberId,EntrollmentDate,MemberShipType) VALUES (@programId,@memberId,@entrollmentDate,@memberShipType) returning Id;
                  ";

                command.Parameters.AddWithValue("@programId",entrollmentRequestDTO.ProgramId);
                command.Parameters.AddWithValue("@memberId",entrollmentRequestDTO.MemberId);
                command.Parameters.AddWithValue("@entrollmentDate", entrollmentRequestDTO.EntrollmentDate);
                command.Parameters.AddWithValue("@memberShipType", entrollmentRequestDTO.MemberShipType);
                 
                var id = (long)command.ExecuteScalar();

                EntrollmentResponseDTO responseDTO = new EntrollmentResponseDTO
                {
                    Id = id,
                    MemberId= entrollmentRequestDTO.MemberId,
                    ProgramId= entrollmentRequestDTO.ProgramId,
                    EntrollmentDate =entrollmentRequestDTO.EntrollmentDate,
                    MemberShipType = entrollmentRequestDTO.MemberShipType
                };
                return responseDTO;
            }
        }

        public async Task<ICollection<EntrollmentResponseDTO>> GetAllEntrollments()
        {
            var EntrollmentsList = new List<EntrollmentResponseDTO>();

            using (var connection = new SqliteConnection(_connectionString))
            {
                connection.Open();
                var command = connection.CreateCommand();
                command.CommandText = "SELECT * FROM EnrollDetails";
                using (var reader = command.ExecuteReader()) 
                {
                    while (reader.Read()) 
                    {
                        EntrollmentsList.Add(new EntrollmentResponseDTO()
                        {
                            Id = reader.GetInt64(0),
                            ProgramId = reader.GetInt32(1),
                            MemberId = reader.GetString(2),
                            EntrollmentDate=reader.GetDateTime(3),
                            MemberShipType = reader.GetString(4)
                        });
                    }
                }
                return EntrollmentsList;
            }
        }

        public EntrollmentResponseDTO GetEntrollmentById(Int64 id)
        {
            using (var connection = new SqliteConnection(_connectionString))
            {
                connection.Open();
                var command = connection.CreateCommand();
                command.CommandText = "SELECT * FROM Enrollment WHERE Id == @id";
                command.Parameters.AddWithValue("id", id);
                using (var reader = command.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        return new EntrollmentResponseDTO
                        {
                            Id = id,
                            ProgramId = reader.GetInt32(0),
                            MemberId = reader.GetString(1),
                            EntrollmentDate = reader.GetDateTime(2),
                            MemberShipType = reader.GetString(3)
                        };
                    }
                    else
                    {
                        throw new Exception("No such Enrolls!");
                    }
                };
            };
            return null;
        }

        public void DeleteEnrollment(Int64 Id)
        {
            using (var connection = new SqliteConnection(_connectionString))
            {
                connection.Open();
                var command = connection.CreateCommand();
                command.CommandText = "DELETE FROM Enrollment WHERE Id == @id";
                command.Parameters.AddWithValue("@id", Id);
                command.ExecuteNonQuery();
            }
        }
    }
}
