using GYM_API.Entities;
using GYM_API.IRepository;
using GYM_API.Modals.RequestModal;
using GYM_API.Modals.ResponseModal;
using Microsoft.Data.Sqlite;

namespace GYM_API.Repository
{
    public class EnrollmentRepositorys: IEnrollmentRepository
    {
        private readonly string _connectionString;

        public EnrollmentRepositorys(string connectionString)
        {
            _connectionString = connectionString;
        }
        public void AddEnrollment(EnrollmentRequestModel enrollmentRequestModel)
        {
            using (var connection = new SqliteConnection(_connectionString))
            {
                connection.Open();
                var command = connection.CreateCommand();
                command.CommandText = "INSERT INTO Enrollments(MemberId,ProgramId,subscriptiontype,EnrollmentDate,NextDueDate) values(@MemberId,@ProgramId,@subscriptiontype,@EnrollmentDate,@NextDueDate)";
                command.Parameters.AddWithValue("@MemberId", enrollmentRequestModel.memberId);
                command.Parameters.AddWithValue("@ProgramId", enrollmentRequestModel.programId);
                command.Parameters.AddWithValue("@subscriptiontype", enrollmentRequestModel.subscriptiontype);
                command.Parameters.AddWithValue("@EnrollmentDate", enrollmentRequestModel.entrollmentDate);
                command.Parameters.AddWithValue("@NextDueDate", enrollmentRequestModel.nxtDueDate);
                command.ExecuteNonQuery();
            }
        }

        public void UpdateNextDueDate(string memberId,int programId, EnrollmentRequestModel enrollmentRequestModel)
        {
            using (var connection = new SqliteConnection(_connectionString))
            {
                connection.Open();
                var command = connection.CreateCommand();
                command.CommandText = "UPDATE Enrollments SET NextDueDate = @NextDueDate  WHERE MemberId = @memberId AND ProgramId=@programId ";
                command.Parameters.AddWithValue("@memberId", memberId);
                command.Parameters.AddWithValue("@programId", programId);
                command.Parameters.AddWithValue("@NextDueDate", enrollmentRequestModel.nxtDueDate);
                command.ExecuteNonQuery();
            }
        }

        public ICollection<EnrollmentResponseModel> GetAllEnrollment()
        {
            var EnrollmentList = new List<EnrollmentResponseModel>();
            using (var connection = new SqliteConnection(_connectionString))
            {
                connection.Open();
                var command = connection.CreateCommand();
                command.CommandText = "SELECT * FROM Enrollments";
                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        EnrollmentList.Add(new EnrollmentResponseModel()
                        {
                            memberId = reader.GetString(0),
                            programId = reader.GetInt32(1),
                            subscriptiontype = reader.GetString(2),
                            entrollmentDate = reader.GetDateTime(3),
                            nxtDueDate = reader.GetDateTime(4)

                        });
                    }
                }
            }
            return EnrollmentList;
        }

        public EnrollmentResponseModel GetSingleEnrollment(string MemberId,int ProgramId)
        {
            using (var connection = new SqliteConnection(_connectionString))
            {
                connection.Open();
                var command = connection.CreateCommand();
                command.CommandText = "SELECT * FROM Enrollments WHERE MemberId == @MemberId AND ProgramId=@programId";
                command.Parameters.AddWithValue("@MemberId", MemberId);
                command.Parameters.AddWithValue("@programId", ProgramId);
                using (var reader = command.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        return new EnrollmentResponseModel()
                        {
                            memberId = reader.GetString(0),
                            programId = reader.GetInt32(1),
                            subscriptiontype = reader.GetString(2),
                            entrollmentDate = reader.GetDateTime(3),
                            nxtDueDate = reader.GetDateTime(4)

                        };
                    }
                    else
                    {
                        throw new Exception("No enrollment found");
                    }
                }
            }
            return null;
        }

        public ICollection<EnrollmentResponseModel> GetEnrollmentByMemberId(string id)
        {
            var EnrollmentList = new List<EnrollmentResponseModel>();
            using (var connection = new SqliteConnection(_connectionString))
            {
                connection.Open();
                var command = connection.CreateCommand();
                command.CommandText = "SELECT * FROM Enrollments WHERE MemberId=@id";
                command.Parameters.AddWithValue("@id", id);
                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        EnrollmentList.Add(new EnrollmentResponseModel()
                        {
                            memberId = reader.GetString(0),
                            programId = reader.GetInt32(1),
                            subscriptiontype = reader.GetString(2),
                            entrollmentDate = reader.GetDateTime(3),
                            nxtDueDate = reader.GetDateTime(4)

                        });
                    }
                }
            }
            return EnrollmentList;
        }
        public ICollection<EnrollmentResponseModel> GetEnrollmentByMemberIdOverDue(string id)
        {
            DateTime currentDate = DateTime.Now;
            var EnrollmentList = new List<EnrollmentResponseModel>();
            using (var connection = new SqliteConnection(_connectionString))
            {
                connection.Open();
                var command = connection.CreateCommand();
                command.CommandText = "SELECT * FROM Enrollments WHERE MemberId=@id AND NextDueDate<@today";
                command.Parameters.AddWithValue("@id", id);
                command.Parameters.AddWithValue("@today", currentDate);

                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        EnrollmentList.Add(new EnrollmentResponseModel()
                        {
                            memberId = reader.GetString(0),
                            programId = reader.GetInt32(1),
                            subscriptiontype = reader.GetString(2),
                            entrollmentDate = reader.GetDateTime(3),
                            nxtDueDate = reader.GetDateTime(4)

                        });
                    }
                }
            }
            return EnrollmentList;
        }
        public ICollection<EnrollmentResponseModel> GetEnrollmentOverDues()
        {
            DateTime currentDate = DateTime.Now;
            var EnrollmentList = new List<EnrollmentResponseModel>();
            using (var connection = new SqliteConnection(_connectionString))
            {
                connection.Open();
                var command = connection.CreateCommand();
                command.CommandText = "SELECT * FROM Enrollments WHERE NextDueDate<@today";
                command.Parameters.AddWithValue("@today", currentDate);

                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        EnrollmentList.Add(new EnrollmentResponseModel()
                        {
                            memberId = reader.GetString(0),
                            programId = reader.GetInt32(1),
                            subscriptiontype = reader.GetString(2),
                            entrollmentDate = reader.GetDateTime(3),
                            nxtDueDate = reader.GetDateTime(4)

                        });
                    }
                }
            }
            return EnrollmentList;
        }
        public void DeleteEnrollment(string MemberId,int ProgramId)
        {
            using (var connection = new SqliteConnection(_connectionString))
            {
                connection.Open();
                var command = connection.CreateCommand();
                command.CommandText = "DELETE FROM Enrollments WHERE MemberId == @MemberId AND ProgramId=@programId";
                command.Parameters.AddWithValue("@MemberId", MemberId);
                command.Parameters.AddWithValue("@programId", ProgramId);
                command.ExecuteNonQuery();
            }
        }
    }
}
