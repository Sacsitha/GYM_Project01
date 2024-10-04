const userDetails = JSON.parse(localStorage.getItem('userDetails')) || [];
const paymentHistory = JSON.parse(localStorage.getItem('paymentHistory')) || [];
const gymMember = JSON.parse(localStorage.getItem('gymMember')) || [];


const tableBody = document.querySelector('#data-table tbody');
const userMessage=document.getElementById("userMessage");
const paymentbtn=document.getElementById("paymentbtn");
const PaymentModal=document.getElementById("PaymentModal");
const paymentAmount=document.getElementById("paymentAmount");

const userPaymentHistory=userDetails.memberPaymentHistory;
const personalInfo=userDetails.memberDetails;


if(personalInfo.membershipType=="monthlyMembership"){
    userMessage.innerHTML=`Your due date is ${personalInfo.nxtDueDate}<br>
                            Monthly Payment ${personalInfo.payment}`
    paymentbtn.innerHTML=`<button type="button" onclick="monthlyPayment()">Pay</button>`
}else{
    userMessage.innerHTML=`Membership Expiry date <span>${personalInfo.RenewalDate}</span>`
}

function TableCreation(){
    let tableRows="";
    tableBody.innerHTML="";
    userPaymentHistory.forEach(element => {
        tableRows +=`
        <tr>
                <td>${element.date}</td>
                <td>${element.details}</td>
                <td>${element.amount}</td>
        </tr>` 
    });
    tableBody.innerHTML=tableRows;
}
TableCreation();

function monthlyPayment(){
    paymentAmount.innerHTML=personalInfo.payment;
    PaymentModal.style.display="block";
}
console.log(personalInfo.payment);
function pay(){
    const date = new Date();
    let paymentDate=`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    const UserPayment = new Payment(personalInfo.payment, "Monthly Fee", paymentDate);
    const memberPayment = paymentHistory.find(item => item[0] === personalInfo.id);
    let NewDueDate=setNxtDueDateMonth(personalInfo.nxtDueDate);
    console.log(NewDueDate)
    personalInfo.nxtDueDate=NewDueDate;
    memberPayment[1].push(UserPayment);
    userPaymentHistory.push(UserPayment);
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
    localStorage.setItem('paymentHistory', JSON.stringify(paymentHistory));
    const member = gymMember.find(item => item.id === personalInfo.id);
    member.nxtDueDate=NewDueDate;
    localStorage.setItem('gymMember', JSON.stringify(gymMember));
    closePaymentModal();
    location.reload();
};

function setNxtDueDateMonth(day){
    const Mdate=new Date(day);
    if(Mdate.getMonth()+1<12){
        return `${Mdate.getFullYear()}-${Mdate.getMonth() + 2}-${Mdate.getDate()}`;
    }else{
        return `${Mdate.getFullYear()+1}-${Mdate.getMonth()-10}-${Mdate.getDate()}`;
    }
}
function closePaymentModal(){
    PaymentModal.style.display='none'
}
