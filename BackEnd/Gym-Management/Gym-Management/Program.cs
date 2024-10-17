
using Gym_Management.Database;
using Gym_Management.IRepository;
using Gym_Management.Repositories;

namespace Gym_Management
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var connectionstring = builder.Configuration.GetConnectionString("DBConnection");


            builder.Services.AddSingleton<IWorkOutProgramRepository>(ProviderAliasAttribute => new WorkOutProgramRepository(connectionstring));
            builder.Services.AddSingleton<IEnrollmentRepository>(ProviderAliasAttribute => new EntrollmentRepository(connectionstring));



            //Initialize The Database
            //var Initialize = new DatabaseInitializer(connectionString);
            //Initialize.Initialize();

            var Initialize = new DatabaseInitializer(connectionstring);
            Initialize.Initialize();


            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
