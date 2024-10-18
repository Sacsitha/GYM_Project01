const paymentApiUrl = "http://localhost:3000/payments";



const paymentHistory = JSON.parse(localStorage.getItem('paymentHistory')) || [];
const summary = document.getElementById("summary");
const tableBody = document.querySelector('#data-table tbody');
const paymentTableBody = document.querySelector('#payment-data-table tbody');

async function data(){
    try{
        const res=await fetch(`http://localhost:5237/api/Member/Get-All-Members`);
        const gymMember=await res.json();
        if (!res.ok) {
            console.log("Table not found");
            return;
        }
        tableBodyCreation(gymMember);
    }catch(error){
        console.log(error)
    }  
}
data();
//function to add data to table
async function tableBodyCreation(EntireData) {
    let tableData = "";
    tableBody.innerHTML = "";
    EntireData.forEach(async item => {
        const res=await fetch(`http://localhost:5237/api/Payment/Get-All-Payments-Id/${item.id}`);
        const paymentHistory=await res.json();
        const lastpayment=paymentHistory[paymentHistory.length-1].paymentDate;
            const date = new Date(lastpayment);
            const formattedDate = date.toISOString().split('T')[0];
        let tableRow=document.createElement("tr");
        tableRow.innerHTML= `
                            <td>${item.userId}</td>
                            <td>${item.fname} ${item.lname}</td>
                            <td>${item.nicNumber}</td>
                            <td>${item.contactNo}</td>
                            <td>${formattedDate}</td>
                            <td>
                                <button type="button" class="tablecolor btn"onclick="viewMemberPaymentHistory('${item.id}')">View Payment History</button>
                            </td>
                        `;
        tableBody.appendChild(tableRow)
    });
}
// tableBodyCreation(EntireData);
//Search function
async function search(){
    let Search=searchInput.value;
    const res = await fetch(`http://localhost:5237/api/Member/Get-Member-By-UserID /${Search}`);
    const member = await res.json();
    const memberList=[]
    memberList.push(member)
    tableBodyCreation(memberList);
}
async function EnrolledPrograms(id) {
    try {
        const res = await fetch(`http://localhost:5237/api/Enrollment/Get-Enrollments-By-MemberId/${id}`);
        const userEnrollments = await res.json();
        if (!res.ok) {
            console.log("Table not found");
            return;
        }
        let list = "";
        programContent.innerHTML = "";

        userEnrollments.forEach(async i => {
            const res = await fetch(`http://localhost:5237/api/WorkOutProgram/Get-WorkOut-Program-By-ID /${i.programId}`);
            const program = await res.json();
            const line = document.createElement("div");
            line.className = "catergory"
            line.innerHTML = `<p>${program.title}</p>
            <p>${i.subscriptiontype}</p>
            <button type="button" class="tablecolor btn" onclick="pay('${id}','${i.programId}')">Pay</button>`;
            programContent.appendChild(line)
        });
        modalVeiwProgram.style.display = 'block';
    } catch (e) {
        console.log(e);
    }
}


async function viewMemberPaymentHistory(id) {
    try{
        const res=await fetch(`http://localhost:5237/api/Payment/Get-All-Payments-Id/${id}`);
        const userPaymentHistory=await res.json();
        if (!res.ok) {
            console.log("Table not found");
            return;
        }
       
    let tableRows = "";
    paymentTableBody.innerHTML = "";
    memberId.innerHTML = id;
    // let userPaymentHistory = AllPaymentHistory.filter(element => element.memberId == id)
    userPaymentHistory.forEach(element => {
        const date = new Date(element.paymentDate);
        const formattedDate = date.toISOString().split('T')[0];
        tableRows += `
        <tr>
                <td>${formattedDate}</td>
                <td>${element.details}</td>
                <td>${element.amount}</td>
        </tr>`
    });
    paymentTableBody.innerHTML = tableRows;
    modalVeiwPaymentHistory.style.display = 'block'
}catch(e){
    console.log(e)
}}
function closeModals(modalName) {
    modalName.style.display = 'none'
}
