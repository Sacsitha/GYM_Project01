﻿using GYM_API.IRepository;
using GYM_API.Modals.RequestModal;
using GYM_API.Modals.ResponseModal;
using Microsoft.Data.Sqlite;

namespace GYM_API.Repository
{
    public class MemberRepository : IMemberRepository
    {
        private readonly string _connectionString;

        public MemberRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<ICollection<MemberResponseDTO>> GetAllMembers()
        {
            var MemberList = new List<MemberResponseDTO>();

            using (var connection = new SqliteConnection(_connectionString))
            {
                connection.Open();
                var command = connection.CreateCommand();
                command.CommandText = "SELECT * FROM MembersDetails";
                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        MemberList.Add(new MemberResponseDTO()
                        {
                            Id = reader.GetString(0),
                            Nic = reader.GetString(1),
                            FirstName = reader.GetString(2),
                            LastName = reader.GetString(3),
                            password = reader.GetString(4),
                            DOB = reader.GetDateTime(5),
                            ContactNumber = reader.GetString(6),
                            Email = reader.GetString(7),
                            Age = reader.GetInt32(8),
                            Gender = reader.GetString(9),
                            Height = reader.GetInt32(10),
                            Weight = reader.GetInt32(11),
                            CreationDate = reader.GetDateTime(12),
                            MemberStatus = reader.GetBoolean(13)
                        });
                    }
                }

            }
            return MemberList;

        }

        public void AddMember(MemberRegisterRequestDTO memberRegister)
        {
            using (var connection = new SqliteConnection(_connectionString))
            {
                connection.Open();
                var command = connection.CreateCommand();
                command.CommandText = "INSERT INTO MembersDetails values(@id,@nic,@firstname,@lastname,@password,@dob,@contactnumber,@email,@age,@gender,@height,@weight,@creationDate,@memberstatus)";
                command.Parameters.AddWithValue("@id", memberRegister.Id);
                command.Parameters.AddWithValue("@nic", memberRegister.Nic);
                command.Parameters.AddWithValue("@firstname", memberRegister.FirstName);
                command.Parameters.AddWithValue("@lastname", memberRegister.LastName);
                command.Parameters.AddWithValue("@password", memberRegister.password);
                command.Parameters.AddWithValue("@dob", memberRegister.DOB);
                command.Parameters.AddWithValue("@contactnumber", memberRegister.ContactNumber);
                command.Parameters.AddWithValue("@email", memberRegister.Email);
                command.Parameters.AddWithValue("@age", memberRegister.Age);
                command.Parameters.AddWithValue("@gender", memberRegister.Gender);
                command.Parameters.AddWithValue("@height", memberRegister.Height);
                command.Parameters.AddWithValue("@weight", memberRegister.Weight);
                command.Parameters.AddWithValue("@creationDate", memberRegister.CreationDate);
                command.Parameters.AddWithValue("@memberstatus", memberRegister.MemberStatus);
                command.ExecuteNonQuery();
            }
        }


        public void DeleteMember(string memberId)
        {
            using(var connection = new SqliteConnection(_connectionString))
            {
                connection.Open();
                var command = connection.CreateCommand();
                command.CommandText = "DELETE FROM MembersDetails WHERE Id == @id";
                command.Parameters.AddWithValue("@id" , memberId);
                command.ExecuteNonQuery();
            }
        }


        public void UpdateMember(string memberId , MemberUpdateRequestDTO memberUpdate)
        {
            using(var connection = new SqliteConnection(_connectionString))
            {
                connection.Open();
                var command = connection.CreateCommand();
                command.CommandText = "UPDATE MembersDetails SET FirstName = @firstname , LastName = @lastname , DOB = @dob , ContactNumber = @contactnumber , Email = @email , Age = @age , Gender = @gender , Height = @height , Weight = @weight  WHERE Id == @id ";
                command.Parameters.AddWithValue("@firstname", memberUpdate.FirstName);
                command.Parameters.AddWithValue("@lastname", memberUpdate.LastName);
                command.Parameters.AddWithValue("@dob", memberUpdate.DOB );
                command.Parameters.AddWithValue("@contactnumber", memberUpdate.ContactNumber);
                command.Parameters.AddWithValue("@email", memberUpdate.Email);
                command.Parameters.AddWithValue("@age", memberUpdate.Age);
                command.Parameters.AddWithValue("@gender", memberUpdate.Gender);
                command.Parameters.AddWithValue("@height", memberUpdate.Height);
                command.Parameters.AddWithValue("@weight", memberUpdate.Weight);
                command.Parameters.AddWithValue("@id", memberId);
                command.ExecuteNonQuery();
            }
        } 

    }  
}
