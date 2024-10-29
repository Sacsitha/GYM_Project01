
const PaymentModal = document.getElementById('PaymentModal');
const modalVeiwPaymentHistory = document.getElementById("modalVeiwPaymentHistory");
const paymentTableBody = document.querySelector('#payment-data-table tbody');
const modalVeiwProgram = document.getElementById("modalVeiwProgram");
const tableBody = document.querySelector('#data-table tbody');
const programContent = document.getElementById("programContent");

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
            console.log(i.programId)
            const res = await fetch(`http://localhost:5237/api/WorkOutProgram/Get-WorkOut-Program-By-ID /${i.programId}`);
            const program = await res.json();
            console.log(program);
            const line = document.createElement("div");
            line.className = "catergory"
            line.innerHTML = `<p>${program.title}</p><p>${i.subscriptiontype}</p>`;
            programContent.appendChild(line)
        });
        modalVeiwProgram.style.display = 'block';
    } catch (e) {
        console.log(e);
    }
}

async function tableBodyCreation() {
    try {
        const res = await fetch(`http://localhost:5237/api/Member/Get-All-Members`);
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

tableBodyCreation();

async function PaymentHistory(id) {
    try {
        const mres = await fetch(`http://localhost:5237/api/Member/Get-Member-By-ID /${id}`);
        const member = await mres.json();
        const res = await fetch(`http://localhost:5237/api/Payment/Get-All-Payments-Id/${id}`);
        const userPaymentHistory = await res.json();
        if (!res.ok) {
            console.log("Table not found");
            return;
        }

        let tableRows = "";
        paymentTableBody.innerHTML = "";
        memberId.innerHTML = member.fname+" "+member.lname+" ";
        userPaymentHistory.forEach(element => {
            let dateString = element.paymentDate;
            const date = new Date(dateString);
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
    } catch (e) {
        console.log(e);

    }
}

function closeModals(modalName) {
    modalName.style.display = 'none'
}