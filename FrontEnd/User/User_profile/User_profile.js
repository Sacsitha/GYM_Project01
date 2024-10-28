const UserId = JSON.parse(localStorage.getItem('UserId'));
// const userDetails = JSON.parse(localStorage.getItem('userDetails')) || [];
const UserDetailsDisplay = document.getElementById("UserDetails");
const editModal = document.getElementById("editModal");
const  changePasswordModal= document.getElementById("changePasswordModal");
const adminMessage = document.getElementById("adminMessage");
// const personalInfo=userDetails.memberDetails;

const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const age = document.getElementById("age");
const height = document.getElementById("height");
const weight = document.getElementById("weight");
const checkGender = document.forms["memberDetails"]["gender"];
const dob = document.getElementById("dob");
const contactNo = document.getElementById("contactNo");
const email = document.getElementById("email");
const address = document.getElementById("address");
const nicNumber=document.getElementById("nicNumber");

const today = new Date();
// if(today>personalInfo.nxtDueDate){
//     adminMessage.style.color='red';
//     adminMessage.innerHTML=`Your monthly fee is overdue`
// }else{
//     adminMessage.style.color='green'
//     adminMessage.innerHTML=`You hav Paid this month fee already`
// }
async function UserOverDue(){
    const res = await fetch(`http://localhost:5237/api/Member/Get-Member-By-UserID /${UserId}`);
    const personalInfo = await res.json();
    const mres = await fetch(`http://localhost:5237/api/Enrollment/Get-Enrollments-By-MemberId-OverDue/${personalInfo.id}`);
    const Member = await mres.json();
    Member.forEach(async i=>{
        const pres = await fetch(`http://localhost:5237/api/WorkOutProgram/Get-WorkOut-Program-By-ID /${i.programId}`);
        const Program = await pres.json();
        const userMessage=document.createElement("div");
        userMessage.innerHTML=`<p>Dear User ${personalInfo.fname} ${personalInfo.lname} you haven't paid your program ${Program.title} fee yet Pleae pay it quickly</p>`
        adminMessage.appendChild(userMessage);
    })
}

async function userDetailDisplay() {
    try {
        const res = await fetch(`http://localhost:5237/api/Member/Get-Member-By-UserID /${UserId}`);
        const personalInfo = await res.json();

        if (!res.ok) {
            console.log("Table not found");
        }
        console.log(personalInfo)
        UserDetailsDisplay.innerHTML = "";
        let SingleUserDetail = `                
                <h2>Personal Info</h2>
                <p>Id : ${personalInfo.userId}</p>
                <p>Name : ${personalInfo.fname} ${personalInfo.lname}</p>
                <p>NIC : ${personalInfo.nicNumber} </p>
                <p>Age : ${personalInfo.age} </p>
                <p>Gender : ${personalInfo.gender}</p>
                <p>Date of Birth : ${personalInfo.dob}</p>
                <p>Height : ${personalInfo.height} </p>
                <p>Weight : ${personalInfo.weight} </p>
                <p>Email : ${personalInfo.email}</p>
                <p>Address : ${personalInfo.address}</p>
                <p>Contact No. : ${personalInfo.contactNo}</p>
`;
        console.log("das");

        UserDetailsDisplay.innerHTML = SingleUserDetail;
    } catch (e) {
        console.log();
        (e)
    }

}
userDetailDisplay();

// Function to populate the form with existing data
function populateForm(data) {
    Object.keys(data).forEach(key => {
        const element = document.querySelector(`[name="${key}"]`);
        if (element) {
            element.value = data[key];
        }
    });

}
async function UserEditModal() {
    const res = await fetch(`http://localhost:5237/api/Member/Get-Member-By-UserID /${UserId}`);
    const member = await res.json();
    console.log(member)
    // showing the alredy existing data to the user   
    nicNumber.value = member.nicNumber
    age.value = member.age
    email.value = member.email
    dob.value = member.dob
    address.value = member.address
    height.value = member.height
    weight.value = member.weight
    contactNo.value = member.contactNo
    fname.value = member.fname
    lname.value = member.lname
    checkGender.value = member.gender;
    // modalTitle.innerHTML = `Edit member ${member.id}`
    modalSubmit.innerHTML = "Edit Member"
    modalSubmit.type = "button";

    
    editModal.style.display = 'block'
    //Saving the changes 
    modalSubmit.onclick = async function () {
        member.nicNumber = nicNumber.value;
        member.age = age.value
        member.email = email.value
        // member.dob = dob.value
        member.address = address.value
        member.height = height.value
        member.weight = weight.value
        member.contactNo = contactNo.value
        member.fname = fname.value
        member.lname = lname.value;
        member.gender = checkGender.value;
        // console.log(JSON.stringify(member));
        
        await fetch(`http://localhost:5237/api/Member/Update-Member/${member.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(member)
        });
    }
    location,reload();

}
function closeEditModal() {
    editModal.style.display = 'none'
}