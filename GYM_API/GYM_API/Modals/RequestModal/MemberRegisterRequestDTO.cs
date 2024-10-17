﻿namespace GYM_API.Modals.RequestModal
{
    public class MemberRegisterRequestDTO
    {
        public string Id { get; set; }
        public string nicNumber { get; set; }
        public string address { get; set; }
        public string contactNo { get; set; }
        public string email { get; set; }
        public DateTime dob { get; set; }
        public string fname { get; set; }
        public string lname { get; set; }
        public int age { get; set; }
        public string gender { get; set; }
        public int height { get; set; }
        public int weight { get; set; }
        public bool MemberStatus { get; set; }=true;

        public DateTime admissionDate { get; set; }
        public int userId { get; set; }
    }
}

