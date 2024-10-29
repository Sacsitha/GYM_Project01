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
    tableBody.innerHTML = "";
    EntireData.forEach(async item => {
        const res = await fetch(`http://localhost:5237/api/Member/Get-Member-By-ID /${item.memberId}`);
        const member = await res.json();
        const pres = await fetch(`http://localhost:5237/api/WorkOutProgram/Get-WorkOut-Program-By-ID /${item.programId}`);
        const programDetails = await pres.json();
        const date = new Date(item.nxtDueDate);
        const formattedDate = date.toISOString().split('T')[0];
        console.log(member.fname+member.lname+programDetails.title);
        console.log();
        const tableData=document.createElement('tr');

        tableData.innerHTML= `
                            <td>${member.userId} </td>
                            <td>${member.fname} ${member.lname}</td>
                            <td>${programDetails.title} </td>
                            <td>${item.subscriptiontype}</td>
                            <td>${formattedDate}</td>`;
        tableBody.appendChild(tableData)
    });


}

function closeModals(modalName) {
    modalName.style.display = 'none'
    // location.reload();
}