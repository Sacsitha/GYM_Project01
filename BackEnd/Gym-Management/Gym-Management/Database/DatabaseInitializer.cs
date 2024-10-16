using Microsoft.Data.Sqlite;

namespace Gym_Management.Database
{
    public class DatabaseInitializer
    {
        private readonly string _ConnectionString;
        public DatabaseInitializer(string connectionString)
        {
            _ConnectionString = connectionString;
        }


        public void Initialize()
        {
            using (var connection = new SqliteConnection(_ConnectionString))
            {

                connection.Open();
                var command = connection.CreateCommand();
                command.CommandText = @"
                        CREATE TABLE IF NOT EXISTS  Programs(
                        Id INT NOT NULL PRIMARY KEY,
                        Title NVARCHAR(25) NOT NULL,
                        Description NVARCHAR(25) NOT NULL,
                        CreatedDate DATE not null,
                        ProgramStatus bool NOT NULL,
                        InitalFee DECIMAL NOT NULL,
                        MonthlyFee DECIMAL NOT NULL,
                        AnnualFee DECIMAL NOT NULL

                    );
                  ";
                command.ExecuteNonQuery();
            }
        } 
    }
}
