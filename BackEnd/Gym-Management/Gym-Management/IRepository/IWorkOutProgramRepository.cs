using Gym_Management.Entities;

namespace Gym_Management.IRepository
{
    public interface IWorkOutProgramRepository
    {
        WorkOutProgram AddProgram(WorkOutProgram newProgram);
    }
}
