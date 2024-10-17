using Microsoft.Data.Sqlite;
using System.Security.Cryptography.Xml;

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
                        CREATE TABLE IF NOT EXISTS EnrollDetails(
                        Id INTEGER PRIMARY KEY AUTOINCREMENT,
                        EntrollmentDate Date NOT NULL,
                        MemberShipType NVARCHAR(10) NOT NULL,
                        MemberId NVARCHAR(15) NOT NULL,
                        ProgramId INT NOT NULL
                     
                    );
                  ";
                command.ExecuteNonQuery();
            }
        } 
    }
    //FOREIGN KEY(ProgramId) REFERENCES Programs(Id) ON DELETE CASCADE
    //FOREIGN KEY(MemberId) REFERENCES Students(Nic) ON DELETE CASCADE NOTE
}
