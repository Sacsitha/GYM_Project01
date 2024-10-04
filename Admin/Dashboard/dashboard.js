const gymMember = JSON.parse(localStorage.getItem('gymMember')) || [];
const TrainingProgram = JSON.parse(localStorage.getItem('gymTrainingProgram')) || [];
const paymentHistory = JSON.parse(localStorage.getItem('paymentHistory')) || [];


const main=document.getElementById("main");
const MembersCount=document.getElementById("MembersCount");
const ProgramCount=document.getElementById("ProgramCount");
const PaymentCount=document.getElementById("PaymentCount");
MembersCount.innerHTML=gymMember.length;
ProgramCount.innerHTML=TrainingProgram.length;
function iframe(siteName){
    if (siteName=='UserManagment'){
        main.innerHTML=`
        <iframe src="../user creation/index.html" ></iframe>
         `
    }else if(siteName=='ProgramManagement'){
        main.innerHTML=`
        <iframe src="../program creation/progamCreation.html" ></iframe>
         `
    }else if(siteName=='PaymentManagment'){
        main.innerHTML=`
        <iframe  src="../Payment_Managment/paymentManagment.html" ></iframe>
        `
    }else if(siteName=='Reports'){
        main.innerHTML=`
        <iframe  src="../Reports/report.html" ></iframe>`
    }
    else if(siteName=='notification'){
        main.innerHTML=`
        <iframe  src="../notification/notification.html" ></iframe>`
    }
}
function ReportMonth(){
    let today=new Date();
    const Calculatemonth=today.getMonth();
    const CalculateYear=today.getFullYear();
    return [Calculatemonth,CalculateYear];
}
function filterPaymentsByMonth(payments) {
    let filterDate=ReportMonth();
    let data= payments.filter(payment => {
        const paymentDate = new Date(payment.date);
        return paymentDate.getMonth() == filterDate[0] && paymentDate.getFullYear() == filterDate[1];
    });
    
    return data;
}
const monthPaymentDetails=filterPaymentsByMonth(paymentHistory);
let NumberOfPaymentOcured=monthPaymentDetails.length;
PaymentCount.innerHTML=monthPaymentDetails.length;
function reload(){
    location.reload();
}
function logout() {
    window.location.href = '../../User/User_login/user_login.html'; // Redirect to login page or home page
  }

