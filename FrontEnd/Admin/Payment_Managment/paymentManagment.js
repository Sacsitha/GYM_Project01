const apiUrl = "http://localhost:3000/members";
const enrollmentapiUrl = "http://localhost:3000/enrollments";
const paymentApiUrl = "http://localhost:3000/payments";
const programapiUrl = "http://localhost:3000/workoutPrograms";

//Local Storage
const paymentHistory = JSON.parse(localStorage.getItem('paymentHistory')) || [];
const gymMember = JSON.parse(localStorage.getItem('gymMember')) || [];
//Html elements
const tableBody = document.querySelector('#data-table tbody');
const paymentTableBody = document.querySelector('#payment-data-table tbody');
const modalVeiwPaymentHistory = document.getElementById("modalVeiwPaymentHistory");
const memberId = document.getElementById('memberId');
const PaymentModal = document.getElementById('PaymentModal');
const message = document.getElementById('message');
const paymentAmount = document.getElementById('paymentAmount');
const payingProcess = document.getElementById('payingProcess');
const searchInput=document.getElementById("searchInput");
const modalVeiwProgram = document.getElementById("modalVeiwProgram");




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
                                <button type="button" class="tablecolor btn" onclick="EnrolledPrograms('${item.id}')">Pay</button>
                            </td>
                        `;
        tableBody.appendChild(tableRow)
    });
}

//Search
async function search() {
    let Search = searchInput.value.toLowerCase();
    const res = await fetch(`http://localhost:5237/api/Member/Get-All-Members`);
    const gymMember = await res.json();
    const data= gymMember.filter((a)=>{
        return a.fname.toLowerCase().includes(Search.toLowerCase()) || a.lname.toLowerCase().includes(Search.toLowerCase())||a.userId.toLowerCase().includes(Search.toLowerCase())
       });

    tableBodyCreation(data);
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
    const mres = await fetch(`http://localhost:5237/api/Member/Get-Member-By-ID /${id}`);
    const member = await mres.json();
        const res=await fetch(`http://localhost:5237/api/Payment/Get-All-Payments-Id/${id}`);
        const userPaymentHistory=await res.json();
        if (!res.ok) {
            console.log("Table not found");
            return;
        }
       
    let tableRows = "";
    paymentTableBody.innerHTML = "";
    memberId.innerHTML = member.fname+" "+member.lname;
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
}
}
function UserPayment(id) {
    paymentAmount.innerHTML = personalInfo.payment;
    PaymentModal.style.display = "block";
}

async function pay(id,programId) {
    try{
        const res = await fetch(`http://localhost:5237/api/Enrollment/Get-Single-Enrollments/${id},${programId}`);
        const userEnrollments = await res.json();
        if (!res.ok) {
            console.log("Table not found");
            return;
        }
        const Prores = await fetch(`http://localhost:5237/api/WorkOutProgram/Get-WorkOut-Program-By-ID /${programId}`);
        const Program = await Prores.json();
        if (!res.ok) {
            console.log("Table not found");
            return;
        }
        let paymentType=[];
        if(userEnrollments.subscriptiontype=="annualSubscription"){
            let payObj={
                payment:Program.annualFee,
                description:"RenwalFee"
            }
            paymentType=payObj;
        }else{
            let payObj={
            payment:Program.monthlyFee,
            description:"monthlySubscription"
            }
            paymentType=payObj;
        }
    message.innerHTML = `Do you want to pay for program ${Program.title} payment`
    paymentAmount.innerHTML = ` Rs.${paymentType.payment}`;
    PaymentModal.style.display = 'block';
    modalVeiwProgram.style.display='none'
    payingProcess.onclick = async function () {
        const date = new Date();
        let paymentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        let details = [];
        let ChangedDate = [];
        if (userEnrollments.subscriptiontype=="annualSubscription") {
            details = "Renewal Fee";
            ChangedDate = setRenewalDate(userEnrollments.nxtDueDate);
            userEnrollments.nxtDueDate= ChangedDate;
        } else {
            details = "Monthly Fee";
            ChangedDate = setNxtDueDateMonth(userEnrollments.nxtDueDate);
            userEnrollments.nxtDueDate = ChangedDate;
        }
        const UserPayment = new Payment(paymentType.payment, paymentType.description, id);
        await fetch(`http://localhost:5237/api/Payment/Add-Payment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(UserPayment)
        });
        await fetch(`http://localhost:5237/api/Enrollment/Update-NextOverDue/${id},${programId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userEnrollments)
        });

        closeModals(PaymentModal);
        location.reload();

    }

    }catch(e){
        console.log(e);
        
    }
};

function setNxtDueDateMonth(day) {
    const Mdate = new Date(day);
    if (Mdate.getMonth() + 1 < 12) {
        return `${Mdate.getFullYear()}-${Mdate.getMonth() + 2}-${Mdate.getDate()}`;
    } else {
        return `${Mdate.getFullYear() + 1}-${Mdate.getMonth() - 10}-${Mdate.getDate()}`;
    }
}
function setRenewalDate(date) {
    const Adate = new Date(date);
    return `${Adate.getFullYear() + 1}-${Adate.getMonth() + 1}-${Adate.getDate()}`;
}

function closeModals(modalName) {
    modalName.style.display = 'none'
}