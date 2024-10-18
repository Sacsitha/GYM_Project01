namespace GYM_API.Modals.RequestModal
{
    public class EnrollmentRequestModel
    {
        public string memberId { get; set; }
        public int programId { get; set; }
        public string subscriptiontype { get; set; }
        public DateTime entrollmentDate { get; set; }
        public DateTime nxtDueDate { get; set; }
    }
}
