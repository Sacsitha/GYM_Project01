using Gym_Management.Controllers;
using Gym_Management.Entities;
using Gym_Management.IRepository;
using Microsoft.Data.Sqlite;
using System;

namespace Gym_Management.Repositories
{

    public class WorkOutProgramRepository : IWorkOutProgramRepository
    {
        private readonly string _connectinString;

        public WorkOutProgramRepository(string connectinString)
        {
            _connectinString = connectinString;
        }
        public WorkOutProgram AddProgram(WorkOutProgram newProgram)
        {
            using (var connection = new SqliteConnection(_connectinString))
            {
                connection.Open();
                var command = connection.CreateCommand();
                command = connection.CreateCommand();
                command.CommandText = "INSERT INTO Programs (ProgramName,Description,ProgramStatus,CreationDate) VALUES (@programName,@description,@programStatus,@creationDate);select last_insert_rowid()";
                command.Parameters.AddWithValue("@programName", newProgram.ProgramName);
                command.Parameters.AddWithValue("@description", newProgram.Description);
                command.Parameters.AddWithValue("@programStatus", newProgram.ProgramStatus);
                command.Parameters.AddWithValue("@creationDate", newProgram.CreationDate);



                // Create a new Programs object and set its Id


              // return the newly created Programs object
            }
            return newProgram;
        }
    }
}
    


