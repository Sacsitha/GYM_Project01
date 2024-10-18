using static System.Runtime.InteropServices.JavaScript.JSType;

namespace GYM_API.Entities
{
    public class Enrollment
    {
        public string MemberId { get; set; }
        public int ProgramId { get; set; }
        public string subscriptiontype { get; set; }
        public DateTime EntrollmentDate { get; set; }
        public DateTime nxtDueDate { get; set; }


    }
}
