let gymMember = JSON.parse(localStorage.getItem('gymMember')) || [];
const paymentHistory = JSON.parse(localStorage.getItem('paymentHistory')) || [];
const PaymentModal = document.getElementById('PaymentModal');
const modalVeiwPaymentHistory = document.getElementById("modalVeiwPaymentHistory");
const paymentTableBody = document.querySelector('#payment-data-table tbody');
const modalVeiwProgram = document.getElementById("modalVeiwProgram");
const programContent=document.getElementById("programContent");

function EnrolledPrograms(id){
    let list="";
    programContent.innerHTML="";
    let userDetails = gymMember.find(element => element.id == id);
    let programList=userDetails.trainingProgram;
    programList.forEach(item=>{
    list +=`<li>${item.title}</li>`
    })
    programContent.innerHTML=list;
    console.log(programContent)
    modalVeiwProgram.style.display='block';
}





const tableBody = document.querySelector('#data-table tbody');


function tableBodyCreation(gymMember) {
    let tableData = "";
    tableBody.innerHTML = "";
    gymMember.forEach(item => {
        //Get every user and creating their rows
        tableData += `<tr>
                            <td class="t-op-nextlvl">${item.id}</td>
                            <td class="t-op-nextlvl">${item.fname} ${item.lname}</td>
                            <td class="t-op-nextlvl">${item.admissionDate}</td>
                            <td class="t-op-nextlvl">${item.nicNumber}</td>
                            <td class="t-op-nextlvl">${item.membershipType}</td>
                            <td class="t-op-nextlvl">${item.address}</td>
                            <td class="t-op-nextlvl">
                            <button type="button" class="tablecolor btn" onclick="PaymentHistory('${item.id}')">Payment</button>
                            <button type="button" class="tablecolor btn" onclick="EnrolledPrograms('${item.id}')">Programs</button>
                        </td>
                        </tr>`;
    });
    tableBody.innerHTML = tableData;
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