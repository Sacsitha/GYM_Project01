
using GYM_API.Database;
using GYM_API.IRepository;
using GYM_API.Repository;

namespace GYM_API
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

            builder.Services.AddSingleton<IMemberRepository>(provider => new MemberRepository(connectionstring));
            builder.Services.AddSingleton<IUserRepository>(provider => new UserRepository(connectionstring));
            builder.Services.AddSingleton<IPaymentRepository>(provider => new PaymentRepository(connectionstring));
            builder.Services.AddSingleton<IWorkOutProgramRepository>(provider => new WorkOutProgramRepository(connectionstring));



            var TableCreate = new DatabaseInitializer(connectionstring);
            TableCreate.TableCreate();


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
