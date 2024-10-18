namespace GYM_API.Modals.ResponseModal
{
    public class EnrollmentResponseModel
    {
        public string memberId { get; set; }
        public int programId { get; set; }
        public string subscriptiontype { get; set; }
        public DateTime entrollmentDate { get; set; }
        public DateTime nxtDueDate { get; set; }
    }
}
