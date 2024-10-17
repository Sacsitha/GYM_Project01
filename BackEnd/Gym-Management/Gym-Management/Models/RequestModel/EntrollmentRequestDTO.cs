namespace Gym_Management.Models.RequestModel
{
    public class EntrollmentRequestDTO
    {
       
        public DateTime EntrollmentDate { get; set; }
        public string MemberShipType { get; set; }
        public int ProgramId { get; set; }
        public string MemberId { get; set; }
    }
}
