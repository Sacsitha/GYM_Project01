const UserId = JSON.parse(localStorage.getItem('UserId')) || [];


const tableBody = document.querySelector('#data-table tbody');
const userMessage=document.getElementById("userMessage");
const paymentbtn=document.getElementById("paymentbtn");
const PaymentModal=document.getElementById("PaymentModal");
const paymentAmount=document.getElementById("paymentAmount");
const programContent=document.getElementById('programContent');
const modalVeiwProgram=document.getElementById('modalVeiwProgram');

async function data(){
    try {
        const res = await fetch(`http://localhost:5237/api/Member/Get-Member-By-UserID /${UserId}`);
        const member = await res.json();
        const payres = await fetch(`http://localhost:5237/api/Payment/Get-All-Payments-Id/${member.id}`);
        const Payment = await payres.json();

        if (!res.ok) {
            console.log("Table not found");
            return;
        }
        TableCreation(Payment);
    } catch (error) {
        console.log(error)
    }
}

data();
function TableCreation(Payment){
    let tableRows="";
    tableBody.innerHTML="";
    Payment.forEach(element => {
        tableRows +=`
        <tr>
                <td>${element.paymentDate}</td>
                <td>${element.details}</td>
                <td>${element.amount}</td>
        </tr>` 
    });
    tableBody.innerHTML=tableRows;
}
// TableCreation();



async function EnrolledPrograms() {
    try {
        const res = await fetch(`http://localhost:5237/api/Member/Get-Member-By-UserID /${UserId}`);
        const member = await res.json();
        const enres = await fetch(`http://localhost:5237/api/Enrollment/Get-Enrollments-By-MemberId/${member.id}`);
        const userEnrollments = await enres.json();
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
            <button type="button" class="tablecolor btn" onclick="pay('${member.id}','${i.programId}')">Pay</button>`;
            programContent.appendChild(line)
        });
        // console
        modalVeiwProgram.style.display = 'block';
    } catch (e) {
        console.log(e);
    }
}
function closeModals(modalName) {
    modalName.style.display = 'none'
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
