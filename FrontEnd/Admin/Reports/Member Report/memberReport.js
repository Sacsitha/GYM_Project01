const apiUrl = "http://localhost:3000/members";
const enrollmentapiUrl = "http://localhost:3000/enrollments";
const userApiUrl = "http://localhost:3000/users";
const programapiUrl = "http://localhost:3000/workoutPrograms";

let gymMember = JSON.parse(localStorage.getItem('gymMember')) || [];
const paymentHistory = JSON.parse(localStorage.getItem('paymentHistory')) || [];
const PaymentModal = document.getElementById('PaymentModal');
const modalVeiwPaymentHistory = document.getElementById("modalVeiwPaymentHistory");
const paymentTableBody = document.querySelector('#payment-data-table tbody');
const modalVeiwProgram = document.getElementById("modalVeiwProgram");
const tableBody = document.querySelector('#data-table tbody');
const programContent = document.getElementById("programContent");

async function EnrolledPrograms(id) {
    try {
        const res = await fetch(enrollmentapiUrl);
        const Enrollments = await res.json();
        if (!res.ok) {
            console.log("Table not found");
            return;
        }
        let list = "";
        programContent.innerHTML = "";

        let userEnrollments = Enrollments.filter(i => i.memberId == id)
        console.log(id);
        console.log(userEnrollments);

        userEnrollments.forEach( async i => {
            console.log(i.programId)
            const res = await fetch(programapiUrl + `/${i.programId}`);
            const program = await res.json();
            console.log(program);
            const line=document.createElement("div");
            line.className="catergory"
            line.innerHTML=`<p>${program.title}</p><p>${i.subscriptiontype}</p>`;
            // list += `<li>${program.title}</li>`
            // console.log(list)
            programContent.appendChild(line)
        });
        // let userDetails = gymMember.find(element => element.id == id);
        // let programList = userDetails.trainingProgram;
        // programList.forEach(item => {

        // })
        // programContent.innerHTML = list;
        // console.log(programContent)
        modalVeiwProgram.style.display = 'block';
    } catch (e) {
        console.log(e);
    }
}







async function tableBodyCreation() {
    try {
        const res = await fetch(apiUrl);
        const gymMember = await res.json();
        if (!res.ok) {
            console.log("Table not found");
            return;
        }
        let tableData = "";
        tableBody.innerHTML = "";
        gymMember.forEach(item => {
            //Get every user and creating their rows
            tableData += `<tr>
                            <td class="t-op-nextlvl">${item.userId}</td>
                            <td class="t-op-nextlvl">${item.fname} ${item.lname}</td>
                            <td class="t-op-nextlvl">${item.admissionDate}</td>
                            <td class="t-op-nextlvl">${item.nicNumber}</td>
                            <td class="t-op-nextlvl">${item.address}</td>
                            <td class="t-op-nextlvl">
                            <button type="button" class="tablecolor btn" onclick="PaymentHistory('${item.id}')">Payment</button>
                            <button type="button" class="tablecolor btn" onclick="EnrolledPrograms('${item.id}')">Enrollments</button>
                        </td>
                        </tr>`;
        });

        tableBody.innerHTML = tableData;
    } catch (error) {
        console.log(error)
    }
}

tableBodyCreation(gymMember);

function PaymentHistory(id) {
    let tableRows = "";
    paymentTableBody.innerHTML = "";
    memberId.innerHTML = id;
    let userPaymentHistory = paymentHistory.find(element => element[0] == id)
    userPaymentHistory[1].forEach(element => {
        tableRows += `
        <tr>
                <td>${element.date}</td>
                <td>${element.details}</td>
                <td>${element.amount}</td>
        </tr>`
    });
    paymentTableBody.innerHTML = tableRows;
    modalVeiwPaymentHistory.style.display = 'block'
}


function closeModals(modalName) {
    modalName.style.display = 'none'
    // location.reload();
}