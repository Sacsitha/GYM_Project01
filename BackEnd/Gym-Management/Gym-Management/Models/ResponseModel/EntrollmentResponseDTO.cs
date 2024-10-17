namespace Gym_Management.Models.ResponseModel
{
    public class EntrollmentResponseDTO
    {
        public long Id { get; set; }
        public DateTime EntrollmentDate { get; set; }
        public string MemberShipType { get; set; }
        public int ProgramId { get; set; }
        public string MemberId { get; set; }
    }
}
