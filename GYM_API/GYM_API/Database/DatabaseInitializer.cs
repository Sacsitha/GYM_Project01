using Microsoft.Data.Sqlite;

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
                    CREATE TABLE IF NOT EXISTS Users(                        
                        Id NVARCHAR(100) PRIMARY KEY,
                        UserRole NVARCHAR(50) NOT NULL,
                        Password NVARCHAR(100) NOT NULL
                    );
                    CREATE TABLE IF NOT EXISTS MembersDetails(
                        Id NVARCHAR(100) PRIMARY KEY ,
                        Nic NVARCHAR(12) NOT NULL,
                        FirstName NVARCHAR(50) NOT NULL,
                        LastName NVARCHAR(50) NOT NULL,
                        DOB DATE NOT NULL,
                        ContactNumber NVARCHAR(50) NOT NULL,
                        Email NVARCHAR(50) NOT NULL,
                        Age INT NOT NULL,
                        Gender NVARCHAR(50) NOT NULL,
                        Height INT NOT NULL,
                        Weight INT NOT NULL,
                        AdmissionDate DATE NOT NULL,
                        MemberStatus BOOLEAN NOT NULL,
                        Address NVARCHAR(150) NOT NULL,
                        UserId NVARCHAR(100) NOT NULL,
                        FOREIGN KEY(UserId) REFERENCES Users(Id) ON DELETE CASCADE
                    );
                    CREATE TABLE IF NOT EXISTS Payments(
                        Id INTEGER PRIMARY KEY AUTOINCREMENT,
                        Details NVARCHAR(100) NOT NULL,
                        Amount DECIMAL NOT NULL,
                        PaymentDate Date NOT NULL,
                        MemberId NVARCHAR(100) NOT NULL,
                        FOREIGN KEY (MemberId) REFERENCES MembersDetails(Id) ON DELETE CASCADE
                    );
                    CREATE TABLE IF NOT EXISTS  Programs(
                        Id INTEGER PRIMARY KEY AUTOINCREMENT,
                        Title NVARCHAR(50) NOT NULL,
                        Description NVARCHAR(100) NOT NULL,
                        CreatedDate DATE not null,
                        ProgramStatus bool NOT NULL,
                        InitalFee DECIMAL NOT NULL,
                        MonthlyFee DECIMAL NOT NULL,
                        AnnualFee DECIMAL NOT NULL
                    );
                    CREATE TABLE IF NOT EXISTS  Enrollments(
                        MemberId INT NOT NULL,                      
                        ProgramId INT NOT NULL,
                        subscriptiontype NVARCHAR(100) NOT NULL,
                        EnrollmentDate DATE not null,                    
                        NextDueDate DATE not null,
                        PRIMARY KEY (MemberId, ProgramId),
                        FOREIGN KEY (MemberId) REFERENCES MembersDetails(Id) ON DELETE CASCADE
                        FOREIGN KEY (ProgramId) REFERENCES Programs(Id) ON DELETE CASCADE
                    );
                ";
                command.ExecuteNonQuery();


            }
        }
    }
}
