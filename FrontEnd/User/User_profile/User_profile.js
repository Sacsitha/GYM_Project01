const gymMember = JSON.parse(localStorage.getItem('gymMember')) || [];
const userDetails = JSON.parse(localStorage.getItem('userDetails')) || [];
const UserDetailsDisplay=document.getElementById("UserDetails");
const editModal=document.getElementById("editModal");
const adminMessage=document.getElementById("adminMessage");
const personalInfo=userDetails.memberDetails;

const today = new Date();
if(today>personalInfo.nxtDueDate){
    adminMessage.style.color='red';
    adminMessage.innerHTML=`Your monthly fee is overdue`
}else{
    adminMessage.style.color='green'
    adminMessage.innerHTML=`You hav Paid this month fee already`
}

function userDetailDisplay() {
    UserDetailsDisplay.innerHTML = "";
    let SingleUserDetail = `                
                <h2>Personal Info</h2>
                <p>Id : ${personalInfo.id}</p>
                <p>Name : ${personalInfo.fname} ${userDetails.memberDetails.lname}</p>
                <p>NIC : ${personalInfo.nicNumber} </p>
                <p>Age : ${personalInfo.age} </p>
                <p>Gender : ${personalInfo.gender}</p>
                <p>Date of Birth : ${personalInfo.dob}</p>
                <p>Height : ${personalInfo.height} </p>
                <p>Weight : ${personalInfo.weight} </p>
                <p>Email : ${personalInfo.email}</p>
                <p>Address : ${personalInfo.address}</p>
                <p>Contact No. : ${personalInfo.contactNo}</p>
                <p>Membership Type : ${personalInfo.membershipType}</p>
`;
UserDetailsDisplay.innerHTML = SingleUserDetail;
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

window.addEventListener('load', () => {
    populateForm(personalInfo);
});

document.getElementById('memberDetails').addEventListener('submit', function(event) {
    event.preventDefault(); 
    // Create a FormData object from the form
    const formData = new FormData(this);
    formData.forEach((value, key) => {
        personalInfo[key] = value;
    });
    //Save the changes in the local storage
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
    const index = gymMember.findIndex(item => item.id === personalInfo.id);
    if (index !== -1) {
        gymMember[index] = personalInfo;  // Update the member info in the array
        localStorage.setItem('gymMember', JSON.stringify(gymMember));
    }

    closeEditModal();
    location.reload();


});
function UserEditModal(){
    editModal.style.display='block'
}
function closeEditModal(){
    editModal.style.display='none'
}




