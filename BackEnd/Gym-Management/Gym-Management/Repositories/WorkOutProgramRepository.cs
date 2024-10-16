﻿using Gym_Management.Controllers;
using Gym_Management.Entities;
using Gym_Management.IRepository;
using Gym_Management.Models.RequestModel;
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
        public void AddProgram(WorkOutProgram newProgram)
        {
            using (var connection = new SqliteConnection(_connectinString))
            {
                connection.Open();
                var command = connection.CreateCommand();
                command = connection.CreateCommand();
                command.CommandText = "INSERT INTO Programs (Id,Title,Description,CreatedDate,ProgramStatus,InitalFee,MonthlyFee,AnnualFee) VALUES (@Id,@Title,@Description,@CreatedDate,@ProgramStatus,@InitalFee,@MonthlyFee,@AnnualFee);";
                command.Parameters.AddWithValue("@Id", newProgram.id);
                command.Parameters.AddWithValue("@Title", newProgram.title);
                command.Parameters.AddWithValue("@Description", newProgram.description);
                command.Parameters.AddWithValue("@CreatedDate", newProgram.createdDate);
                command.Parameters.AddWithValue("@ProgramStatus", newProgram.programStatus);
                command.Parameters.AddWithValue("@InitalFee", newProgram.initalFee);
                command.Parameters.AddWithValue("@MonthlyFee", newProgram.monthlyFee);
                command.Parameters.AddWithValue("@AnnualFee", newProgram.annualFee);
                command.ExecuteNonQuery();
            
            }
        }

        public ICollection<WorkOutProgram> GetAllPrograms() 
        {
            var WorkOutProgramList = new List<WorkOutProgram>();
            using (var connection = new SqliteConnection(_connectinString)) 
            {
                connection.Open();
                var command = connection.CreateCommand();
                command.CommandText = "SELECT Id,Title,Description,CreatedDate,ProgramStatus,InitalFee,InitalFee,MonthlyFee,AnnualFee FROM Programs";
                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read()) 
                    {
                        WorkOutProgramList.Add(new WorkOutProgram()
                        {
                            id = reader.GetInt32(0),
                            title = reader.GetString(1),
                            description = reader.GetString(2),
                            createdDate = reader.GetDateTime(3),
                            programStatus = reader.GetBoolean(4),
                            initalFee = reader.GetDecimal(5),
                            monthlyFee = reader.GetDecimal(6),
                            annualFee = reader.GetDecimal(7)
                        }
                        );
                    }
                }
                return WorkOutProgramList;
            }       
        }

        public WorkOutProgram GetWorkOutProgramById(int id)
        {
            using (var connection = new SqliteConnection(_connectinString))
            {
                connection.Open();
                var command = connection.CreateCommand();
                command.CommandText = "SELECT Id,Title,Description,CreatedDate,ProgramStatus,InitalFee,InitalFee,MonthlyFee,AnnualFee FROM Programs WHERE id == @id";
                command.Parameters.AddWithValue("@id", id);
                using (var reader = command.ExecuteReader()) 
                {
                 if (reader.Read())
                    {
                        return new WorkOutProgram()
                        {
                            id = reader.GetInt32(0),
                            title = reader.GetString(1),
                            description = reader.GetString(2),
                            createdDate = reader.GetDateTime(3),
                            programStatus = reader.GetBoolean(4),
                            initalFee = reader.GetDecimal(5),
                            monthlyFee = reader.GetDecimal(6),
                            annualFee = reader.GetDecimal(7)
                        };
                    }
                    else
                    {
                        throw new Exception("WorkOutProgram Not Found");
                    }
                };
            };
            return null;
        }

        //public void UpdateWorkOutProgram(int id)
        //{
        //    if(id == 0)
        //    {
        //        using (var connection = new SqliteConnection(_connectinString))
        //        {
        //            connection.Open();
        //            var command = connection.CreateCommand();
        //            command.CommandText = "UPDATE Id,Title,Description,CreatedDate,ProgramStatus,InitalFee,InitalFee,MonthlyFee,AnnualFee FROM Programs WHERE id == @id";
        //            command.Parameters.AddWithValue("@Id", id);
        //            command.Parameters.AddWithValue("@Title",title);
        //            command.Parameters.AddWithValue("@Description", description);
        //            command.Parameters.AddWithValue("@CreatedDate", createdDate);
        //            command.Parameters.AddWithValue("@ProgramStatus", programStatus);
        //            command.Parameters.AddWithValue("@InitalFee", initalFee);
        //            command.Parameters.AddWithValue("@MonthlyFee", monthlyFee);
        //            command.Parameters.AddWithValue("@AnnualFee", annualFee);
        //            command.ExecuteNonQuery();
        //        }
        //    }
        //}

        public void DeleteWorkOutProgram(int id) 
        {
        
            var workOutProgram = GetWorkOutProgramById(id);
            if (workOutProgram != null) 
            {
                using (var connection = new SqliteConnection(_connectinString))
                {
                    connection.Open();
                    var command = connection.CreateCommand();
                    command.CommandText = "DELETE FROM Programs WHERE Id = @id";
                    command.Parameters.AddWithValue("@id",id);
                    command.ExecuteNonQuery();
                }
            }
            else
            {
                throw new Exception("WorkOut Program Not Found");
            }
        }
    }
}
    


