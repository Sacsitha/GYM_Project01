using Microsoft.Data.Sqlite;
using System.Reflection.PortableExecutable;

namespace GYM_API.Database
{
    public class DatabaseInitializer
    {
        private readonly string _connectionString;

        public DatabaseInitializer(string connectionString)
        {
            _connectionString = connectionString;
        }


        public void TableCreate()
        {
            using(var connection = new SqliteConnection(_connectionString))
            {
                connection.Open();
                var command = connection.CreateCommand();
                command.CommandText = @"
                    CREATE TABLE IF NOT EXISTS MembersDetails(
                        Id NVARCHAR(100) PRIMARY KEY,
                        Nic NVARCHAR(12) NOT NULL,
                        FirstName NVARCHAR(50) NOT NULL,
                        LastName NVARCHAR(50) NOT NULL,
                        Password NVARCHAR(50) NOT NULL,
                        DOB DATE NOT NULL,
                        ContactNumber NVARCHAR(50) NOT NULL,                          
                        Email NVARCHAR(50) NOT NULL,
                        Age INT NOT NULL,
                        Gender NVARCHAR(50) NOT NULL,
                        Height INT NOT NULL,
                        Weight INT NOT NULL,
                        CreationDate DATE NOT NULL,
                        MemberStatus BOOLEAN NOT NULL
                    );
                

                    CREATE TABLE IF NOT EXISTS Payments(
                        Id INT PRIMARY KEY,
                        Details NVARCHAR(15) NOT NULL,
                        Amount INT NOT NULL,
                        PaymentDate Date NOT NULL,
                        MemberId INT NOT NULL,

                        FOREIGN KEY (MemberId) REFERENCES MembersDetails(Id) ON DELETE CASCADE
                    );
                ";


                command.ExecuteNonQuery();


            }
        }
    }
}
