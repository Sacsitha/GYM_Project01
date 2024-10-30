using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GYM_API.Modals.RequestModal
{
    public class EnrollmentRequestModel
    {

        [Key, Column(Order = 0)]
        public string memberId { get; set; }



        [Key, Column(Order = 1)]
        public int programId { get; set; }
        public string subscriptiontype { get; set; }
        public DateTime entrollmentDate { get; set; }
        public DateTime nxtDueDate { get; set; }
    }
}
