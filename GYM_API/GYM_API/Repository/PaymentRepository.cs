using GYM_API.IRepository;
using GYM_API.Modals.RequestModal;
using GYM_API.Modals.ResponseModal;
using Microsoft.Data.Sqlite;

namespace GYM_API.Repository
{
    public class PaymentRepository: IPaymentRepository
    {
        public readonly string _connectionString;

        public PaymentRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public ICollection<PaymentResponseDTO> GetAllFullPayments()
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
                            Id = reader.GetInt32(0),
                            Details = reader.GetString(1),
                            Amount = reader.GetInt32(2),
                            PaymentDate = reader.GetDateTime(3),
                            MemberId=reader.GetInt32(4)
                        });
                    }
                }
            }
            return PaymentList;
        }

        public PaymentResponseDTO AddFullPayment(PaymentResponseDTO paymentResponseDTO)
        {
            using (var connection = new SqliteConnection(_connectionString))
            {
                connection.Open();
                var command = connection.CreateCommand();
                command = connection.CreateCommand();
                command.CommandText = "INSERT INTO Payments (Id,Details,Amount,PaymentDate,MemberId) VALUES (@id,@details,@amount,@paymentDate,@memberid);";
                command.Parameters.AddWithValue("@id", paymentResponseDTO.Id);
                command.Parameters.AddWithValue("@details", paymentResponseDTO.Details);
                command.Parameters.AddWithValue("@amount", paymentResponseDTO.Amount);
                command.Parameters.AddWithValue("@paymentDate", paymentResponseDTO.PaymentDate);
                command.Parameters.AddWithValue("@memberid", paymentResponseDTO.MemberId);
                command.ExecuteNonQuery();
            }

            return paymentResponseDTO;
        }
    }
}
