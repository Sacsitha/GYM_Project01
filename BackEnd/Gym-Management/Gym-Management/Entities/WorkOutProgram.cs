namespace Gym_Management.Entities
{
    public class WorkOutProgram
    {
        public string Id { get; set; }
        public string ProgramName { get; set; }
        public string Description { get; set; }
        public bool ProgramStatus { get; set; }
        public DateTime CreationDate { get; set; }
    }
}
