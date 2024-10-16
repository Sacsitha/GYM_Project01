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
                        Id nvarchar(25) not null,
                        ProgramName NVARCHAR(25) NOT NULL,
                        Description NVARCHAR(25) NOT NULL,
                        ProgramStatus bool NOT NULL,
                        CreationDate DATETIME not null
                    );     
                        CREATE TABLE IF NOT EXISTS  Payment(
                       Id nvarchar(25) not null,
                       Date DATETIME,
                       FeeType nvarchar(25),
                       FeeAmount nvarchar(25),
                       FeeStatus  bool not null
                    );     
                    ";
                command.ExecuteNonQuery();
            }
        } 
    }
}
