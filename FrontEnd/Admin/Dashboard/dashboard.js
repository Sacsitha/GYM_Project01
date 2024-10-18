const gymMember = JSON.parse(localStorage.getItem('gymMember')) || [];
const TrainingProgram = JSON.parse(localStorage.getItem('gymTrainingProgram')) || [];
const paymentHistory = JSON.parse(localStorage.getItem('paymentHistory')) || [];


const main = document.getElementById("main");
const MembersCount = document.getElementById("MembersCount");
const ProgramCount = document.getElementById("ProgramCount");
const PaymentCount = document.getElementById("PaymentCount");
async function Data() {
    try {
        const res = await fetch(`http://localhost:5237/api/Member/Get-All-Members`);
        const gymMember = await res.json();
        const Prores = await fetch(`http://localhost:5237/api/WorkOutProgram/Get-All-WorkOut-Programs`);
        const gymTrainingProgram = await Prores.json();
        const Payres = await fetch(`http://localhost:5237/api/Payment/Get-All-Payments`);
        const Payments = await Payres.json();
        if (!res.ok) {
            console.log("Table not found");
        }
        MembersCount.innerHTML = gymMember.length;
        ProgramCount.innerHTML = gymTrainingProgram.length;
        PaymentCount.innerHTML=Payments.length;
    } catch (error) {
        console.log(error);
    }
}
Data();
function iframe(siteName) {
    if (siteName == 'UserManagment') {
        main.innerHTML = `
        <iframe src="../user creation/index.html" ></iframe>
         `
    } else if (siteName == 'ProgramManagement') {
        main.innerHTML = `
        <iframe src="../program creation/progamCreation.html" ></iframe>
         `
    } else if (siteName == 'PaymentManagment') {
        main.innerHTML = `
        <iframe  src="../Payment_Managment/paymentManagment.html" ></iframe>
        `
    } else if (siteName == 'Reports') {
        main.innerHTML = `
        <iframe  src="../Reports/report.html" ></iframe>`
    }
    else if (siteName == 'notification') {
        main.innerHTML = `
        <iframe  src="../notification/notification.html" ></iframe>`
    }
}
function ReportMonth() {
    let today = new Date();
    const Calculatemonth = today.getMonth();
    const CalculateYear = today.getFullYear();
    return [Calculatemonth, CalculateYear];
}
function filterPaymentsByMonth(payments) {
    let filterDate = ReportMonth();
    let data = payments.filter(payment => {
        const paymentDate = new Date(payment.date);
        return paymentDate.getMonth() == filterDate[0] && paymentDate.getFullYear() == filterDate[1];
    });

    return data;
}
const monthPaymentDetails = filterPaymentsByMonth(paymentHistory);
let NumberOfPaymentOcured = monthPaymentDetails.length;
PaymentCount.innerHTML = monthPaymentDetails.length;
function reload() {
    location.reload();
}
function logout() {
    window.location.href = '../../User/User_login/user_login.html'; // Redirect to login page or home page
}

