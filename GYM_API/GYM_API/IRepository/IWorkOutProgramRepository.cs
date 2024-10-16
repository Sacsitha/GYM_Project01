using GYM_API.Entities;

namespace GYM_API.IRepository
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
