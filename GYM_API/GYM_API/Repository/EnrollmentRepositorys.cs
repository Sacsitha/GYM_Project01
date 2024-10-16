using GYM_API.IRepository;

namespace GYM_API.Repository
{
    public class EnrollmentRepositorys: IEnrollmentRepository
    {
        private readonly string _connectionString;

        public EnrollmentRepositorys(string connectionString)
        {
            _connectionString = connectionString;
        }
    }
}
