using Gym_Management.Entities;
using Gym_Management.IRepository;
using Microsoft.Data.Sqlite;

namespace Gym_Management.Repositories
{
    public class ProgramPaymentDetailsRepository : IProgramPaymentDetailsRepository
    {
        private readonly string _connectionString;
        public ProgramPaymentDetailsRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public ProgramPaymentDetails AddPaymentDetails(ProgramPaymentDetails newPaymentDetails)
        {
            using (var connection = new SqliteConnection(_connectionString))
            {
                {
                    connection.Open();
                    var command = connection.CreateCommand();
                    command = connection.CreateCommand();
                    command.CommandText = "INSERT INTO Payment (Id,Date,FeeType,FeeAmount,FeeStatus) VALUES (@id,@date,@feeType,@feeAmount,@feeStatus);select last_insert_rowid()";
                    command.Parameters.AddWithValue("@id", newPaymentDetails.Id);
                    command.Parameters.AddWithValue("@date", newPaymentDetails.Date);
                    command.Parameters.AddWithValue("@feeType", newPaymentDetails.FeeType);
                    command.Parameters.AddWithValue("@feeAmount", newPaymentDetails.FeeAmount);
                    command.Parameters.AddWithValue("@feeStatus", newPaymentDetails.FeeStatus);

                    // Create a new Programs object and set its Id
                    // return the newly created Programs object
                }
                return newPaymentDetails;

            }
        }

        public void UpdatePaymentDetails(string memberId, MemberUpdateRequestDTO memberUpdate)
        {
            using (var connection = new SqliteConnection(_connectionString))
            {
                connection.Open();
                var command = connection.CreateCommand();
                command.CommandText = "UPDATE MembersDetails SET FirstName = @firstname , LastName = @lastname , DOB = @dob , ContactNumber = @contactnumber , Email = @email , Age = @age , Gender = @gender , Height = @height , Weight = @weight  WHERE Id == @id ";
                command.Parameters.AddWithValue("@firstname", memberUpdate.FirstName);
                command.Parameters.AddWithValue("@lastname", memberUpdate.LastName);
                command.Parameters.AddWithValue("@dob", memberUpdate.DOB);
                command.Parameters.AddWithValue("@contactnumber", memberUpdate.ContactNumber);
                command.Parameters.AddWithValue("@email", memberUpdate.Email);
                command.Parameters.AddWithValue("@age", memberUpdate.Age);
                command.Parameters.AddWithValue("@gender", memberUpdate.Gender);
                command.Parameters.AddWithValue("@height", memberUpdate.Height);
                command.Parameters.AddWithValue("@weight", memberUpdate.Weight);
                command.Parameters.AddWithValue("@id", memberId);
                command.ExecuteNonQuery();
            }
        }
    }
}
