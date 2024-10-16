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
    try{
        const res=await fetch(apiUrl);
        const gymMember=await res.json();
        const enrollRes=await fetch(enrollmentapiUrl);
        const Enrollments=await enrollRes.json();
        const payRes=await fetch(`paymentApiUrl/${gymMember.id}`);
        const Payments=await payRes.json();
        if (!res.ok) {
            console.log("Table not found");
            return;
        }
        tableBodyCreation(gymMember);
    }catch(error){
        console.log(error)
    }  
}
//function to add data to table
function tableBodyCreation(EntireData) {
    let tableData = "";
    tableBody.innerHTML = "";
    console.log(EntireData)
    EntireData.forEach(item => {
        // let nxtDueDate = [];
        // if (item.memberDetails.membershipType == "monthlyMembership") {
        //     nxtDueDate = item.memberDetails.nxtDueDate;
        // } else {
        //     nxtDueDate = item.memberDetails.RenewalDate;
        // }
        // let lastPaidDate = item.memberPaymentHistory[item.memberPaymentHistory.length - 1].date;
        tableData += `<tr>
                            <td>${item.userId}</td>
                            <td>${item.memberDetails.fname} ${item.memberDetails.lname}</td>
                            <td>${item.memberDetails.nicNumber}</td>
                            <td>
                                <button type="button" class="tablecolor btn"onclick="viewMemberPaymentHistory('${item.id}','${item.userId}')">View Payment History</button>
                                <button type="button" class="tablecolor btn" onclick="pay('${item.id}')">Pay</button>
                            </td>
                        </tr>`;
    });
    tableBody.innerHTML = tableData;
}
tableBodyCreation(EntireData);
//Search function
function search(){
    let Search=searchInput.value;
    let displayData = EntireData.filter(item => item.id == Search);
    tableBodyCreation(displayData);
}

//Filter Options
function filterTable(filterby) {
    if (filterby == "all") {
        tableBodyCreation(EntireData);
    } else if (filterby == "overdue") {
        const todayDate = new Date();
        const today=`${todayDate.getFullYear()}-${todayDate.getMonth() + 1}-${todayDate.getDate()}`
        let displayData = [];
        EntireData.forEach(item => {
            if (today < item.memberDetails.nxtDueDate) {
                console.log(item.memberDetails.nxtDueDate)
                displayData.push(item);
            }
        });
        tableBodyCreation(displayData);
    }
    else {
        let displayData = EntireData.filter(item => item.memberDetails.membershipType == filterby);
        tableBodyCreation(displayData)
    }
}

async function viewMemberPaymentHistory(id) {
    try{
        const res=await fetch(paymentApiUrl);
        const AllPaymentHistory=await res.json();
        if (!res.ok) {
            console.log("Table not found");
            return;
        }
       
    let tableRows = "";
    paymentTableBody.innerHTML = "";
    memberId.innerHTML = id;
    let userPaymentHistory = AllPaymentHistory.filter(element => element.memberId == id)
    userPaymentHistory.forEach(element => {
        tableRows += `
        <tr>
                <td>${element.date}</td>
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

function pay(id) {
    let UserDetails = EntireData.find(element => element.id == id);
    let personalInfo = UserDetails.memberDetails;
    message.innerHTML = `Do you want to pay user ${id} payment`
    paymentAmount.innerHTML = ` Rs.${personalInfo.payment}`;
    PaymentModal.style.display = 'block';
    payingProcess.onclick = function () {
        const date = new Date();
        let paymentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        let details = [];
        let ChangedDate = [];
        if (personalInfo.membershipType == "monthlyMembership") {
            details = "Monthly Fee";
            ChangedDate = setNxtDueDateMonth(personalInfo.nxtDueDate);
            personalInfo.nxtDueDate = ChangedDate;


        } else {
            details = "Renewal Fee";
            ChangedDate = setRenewalDate(personalInfo.RenewalDate);
            personalInfo.RenewalDate = ChangedDate;

        }
        const UserPayment = new Payment(personalInfo.payment, details, paymentDate);
        const memberPayment = paymentHistory.find(item => item[0] === personalInfo.id);
        console.log(ChangedDate)
        memberPayment[1].push(UserPayment);
        localStorage.setItem('paymentHistory', JSON.stringify(paymentHistory));
        const member = gymMember.find(item => item.id === personalInfo.id);
        member.nxtDueDate = ChangedDate;
        localStorage.setItem('gymMember', JSON.stringify(gymMember));
        closeModals(PaymentModal);
        location.reload();

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
    // location.reload();
}