using Gym_Management.Entities;
using Gym_Management.Models.RequestModel;

namespace Gym_Management.IRepository
{
    public interface IWorkOutProgramRepository
    {
        void AddProgram(WorkOutProgram newProgram);
        ICollection<WorkOutProgram> GetAllPrograms();
        WorkOutProgram GetWorkOutProgramById(int id);
        //void UpdateWorkOutProgram(int id);
        void DeleteWorkOutProgram(int id);
    }
}
