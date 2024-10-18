const gymMember = JSON.parse(localStorage.getItem('gymMember')) || [];
const paymentHistory = JSON.parse(localStorage.getItem('paymentHistory')) || [];

const tableBody=document.querySelector('#data-table tbody');
const UserDetails=document.getElementById("UserDetails");
const modalVeiwUser=document.getElementById('modalVeiwUser');

//function to combine data
const EntireData = [];
function SelectData() {
    gymMember.forEach(item => {
        let userPaymentHistory = paymentHistory.find(element => element[0] == item.id)
        let userObj = {
            id: item.id,
            memberDetails: item,
            memberPaymentHistory: userPaymentHistory[1]
        }
        EntireData.push(userObj)
    })
}
SelectData();
// function filterOverDueMembers() {
//         const todayDate = new Date();
//         const today=`${todayDate.getFullYear()}-${todayDate.getMonth() + 1}-${todayDate.getDate()}`
//         let displayData = [];
//         EntireData.forEach(item => {
//             if (today < item.memberDetails.nxtDueDate) {
//                 displayData.push(item);
//             }
//         });
//         tableBodyCreation(displayData);
// }
async function data(){
    try {
        const res = await fetch(`http://localhost:5237/api/Enrollment/Get-All-OverDue-Enrollments`);
        const enrollments = await res.json();

        if (!res.ok) {
            console.log("Table not found");
            return;
        }
        tableBodyCreation(enrollments);
    } catch (error) {
        console.log(error)
    }
}
data();
//function to add data to table
async function tableBodyCreation(EntireData) {
    let tableData = "";
    tableBody.innerHTML = "";
    EntireData.forEach(item => {
        const date = new Date(item.nxtDueDate);
        const formattedDate = date.toISOString().split('T')[0];
        tableData += `<tr ">
                            <td>${item.memberId}</td>
                            <td>${item.programId} </td>
                            <td>${item.subscriptiontype}</td>
                            <td>${formattedDate}</td>
                        </tr>`;
    });
    tableBody.innerHTML = tableData;
}
// filterOverDueMembers();

//ViewUser
function viewUser(id) {
    UserDetails.innerHTML = "";
    const member = gymMember.find(item => item.id === id);
    let programList=[];
    member.trainingProgram.forEach(item =>{
        programList +=`<li>${item.title}</li>`;
    })
    let SingleUserDetail = `                
                <h2 class="modalTitle">User Details</h2>
                <p><span>Id</span> : ${member.id}</p>
                <p><span>Name</span> : ${member.fname} ${member.lname}</p>
                <p><span>NIC</span> : ${member.nicNumber} </p>
                <p><span>Age</span> : ${member.age} </p>
                <p><span>Gender</span> : ${member.gender}</p>
                <p><span>Date of Birth</span> : ${member.dob}</p>
                <p><span>Height</span> : ${member.height} </p>
                <p><span>Weight</span> : ${member.weight} </p>
                <p><span>Email</span> : ${member.email}</p>
                <p><span>Address</span> : ${member.address}</p>
                <p><span>Contact No.</span> : ${member.contactNo}</p>
                <p><span>Membership Type</span> : ${member.membershipType}</p>
                <p><span>Selected Training Program</span> :</p>
                <ul id="ProgramView"> ${programList}</ul>
`;
    UserDetails.innerHTML = SingleUserDetail;
    modalVeiwUser.style.display = "block";

}
function closeModals(modalName) {
    modalName.style.display = 'none'
    // location.reload();
}