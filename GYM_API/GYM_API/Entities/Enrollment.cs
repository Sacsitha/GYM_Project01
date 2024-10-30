using static System.Runtime.InteropServices.JavaScript.JSType;


using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GYM_API.Entities
{
    public class Enrollment
    {

        [Key, Column(Order = 0)]
        public string MemberId { get; set; }

        [Key, Column(Order = 1)]
        public int ProgramId { get; set; }
        public string subscriptiontype { get; set; }
        public DateTime EntrollmentDate { get; set; }
        public DateTime nxtDueDate { get; set; }


    }
}
