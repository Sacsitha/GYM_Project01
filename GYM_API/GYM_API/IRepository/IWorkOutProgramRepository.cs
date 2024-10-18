using GYM_API.Entities;
using GYM_API.Modals.RequestModal;

namespace GYM_API.IRepository
{
    public interface IWorkOutProgramRepository
    {
        void AddProgram(WorkOutProgramRequestDTO newProgram);
        ICollection<WorkOutProgram> GetAllPrograms();
        WorkOutProgram GetWorkOutProgramById(int id);
        //void UpdateWorkOutProgram(int id);
        void UpdateProgram(int programId, UpdateWorkOutProgramRequestModel workOutProgramRequest);
        void DeleteWorkOutProgram(int id);

    }
}
