using GYM_API.Entities;
using GYM_API.IRepository;
using GYM_API.Modals.ResponseModal;
using Microsoft.Data.Sqlite;

namespace GYM_API.Repository
{
    public class PaymentRepository: IPaymentRepository
    {
        private readonly string _connectionString;

        public PaymentRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        public ICollection<PaymentResponseDTO> GetAllPayments()
        {
            var PaymentList = new List<PaymentResponseDTO>();
            using (var connection = new SqliteConnection(_connectionString))
            {
                connection.Open();
                var command = connection.CreateCommand();
                command.CommandText = "SELECT * FROM Payments";
                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        PaymentList.Add(new PaymentResponseDTO()
                        {
                            Details = reader.GetString(1),
                            Amount = reader.GetInt32(2),
                            PaymentDate = reader.GetDateTime(3),
                            MemberId = reader.GetInt32(4)
                        });
                    }
                }
            }
            return PaymentList;
        }
        public ICollection<PaymentResponseDTO> GetPaymentsByMemberId(int id)
        {
            var PaymentList = new List<PaymentResponseDTO>();


            using (var connection = new SqliteConnection(_connectionString))
            {
                connection.Open();
                var command = connection.CreateCommand();
                command.CommandText = "SELECT * FROM Payments WHERE MemberId=@MemberId";
                command.Parameters.AddWithValue("@MemberId", id);
                using (var reader = command.ExecuteReader())
                {
                    PaymentList.Add(new PaymentResponseDTO()
                    {
                        Details = reader.GetString(1),
                        Amount = reader.GetInt32(2),
                        PaymentDate = reader.GetDateTime(3),
                        MemberId = reader.GetInt32(4)
                    });
                };
            };
            return PaymentList;
        }

        public void AddFullPayment(Payment payment)
        {
            using (var connection = new SqliteConnection(_connectionString))
            {
                connection.Open();
                var command = connection.CreateCommand();
                command = connection.CreateCommand();
                command.CommandText = "INSERT INTO Payments (Id,Details,Amount,PaymentDate,MemberId) VALUES (@id,@details,@amount,@paymentDate,@memberid);";
                command.Parameters.AddWithValue("@id", payment.Id);
                command.Parameters.AddWithValue("@details", payment.Details);
                command.Parameters.AddWithValue("@amount", payment.Amount);
                command.Parameters.AddWithValue("@paymentDate", payment.PaymentDate);
                command.Parameters.AddWithValue("@memberid", payment.MemberId);
                command.ExecuteNonQuery();
            }
        }
    }
}
