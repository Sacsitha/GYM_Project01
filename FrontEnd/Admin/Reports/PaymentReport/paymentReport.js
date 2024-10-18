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
// // let payment=[];
// //     paymentHistory.forEach(element => {
// //         element[1].forEach(item=>{
// //             payment.push(item);
// //         })
// //     });
// function ReportMonth() {
//     let today = new Date();
//     const Calculatemonth = today.getMonth();
//     const CalculateYear = today.getFullYear();
//     return [Calculatemonth, CalculateYear];
// }

// function filterPaymentsByMonth(payments) {
//     let filterDate = ReportMonth();
//     let data = payments.filter(payment => {
//         const paymentDate = new Date(payment.date);
//         return paymentDate.getMonth() == filterDate[0] && paymentDate.getFullYear() == filterDate[1];
//     });

//     return data;
// }
// function filterPaymentTypes(payment, detail) {
//     return payment.filter(item => item.feeType == detail);
// }
// async function payments() {
//     try {
//         const res = await fetch(paymentApiUrl);
//         const payments = await res.json();
//         if (!res.ok) {
//             console.log("Table not found");
//             return;
//         }
//         const monthPaymentDetails = filterPaymentsByMonth(payments);
//         let MonthlyFeePayment = filterPaymentTypes(monthPaymentDetails, "Monthly Fee")
//         let AnnualFeePayment = filterPaymentTypes(monthPaymentDetails, "Annual fee")
//         let initialFeePayment = filterPaymentTypes(monthPaymentDetails, "initial Fee")
//         let RenewalFeePayment = filterPaymentTypes(monthPaymentDetails, "Renewal Fee")

//         function TotalValue(paymentList) {
//             let sum = 0;
//             paymentList.forEach(item => {
//                 sum += Number(item.amount);
//             })
//             return sum;
//         }

//         let NumberOfPaymentOcured = monthPaymentDetails.length;

// tableBody.innerHTML = `
//                 <tr>
//                     <td>Initial Fee</td>
//                     <td class="right-text">${initialFeePayment.length}</td>
//                     <td class="right-text">${TotalValue(initialFeePayment)}</td>
//                 </tr>
//                 <tr>
//                     <td>Monthly Fee</td>
//                     <td class="right-text">${MonthlyFeePayment.length}</td>
//                     <td class="right-text">${TotalValue(MonthlyFeePayment)}</td>
//                 </tr>
//                 <tr>
//                     <td>Annual Fee</td>
//                     <td class="right-text">${AnnualFeePayment.length}</td>
//                     <td class="right-text">${TotalValue(AnnualFeePayment)}</td>
//                 </tr>
//                 <tr>
//                     <td>Renewal Fee</td>
//                     <td class="right-text">${RenewalFeePayment.length}</td>
//                     <td class="right-text">${TotalValue(RenewalFeePayment)}</td>
//                 </tr>
//                 <tr style="color:red;">
//                     <td>Total</td>
//                     <td class="right-text">${NumberOfPaymentOcured}</td>
//                     <td class="right-text" >${TotalValue(monthPaymentDetails)}</td>
//                 </tr>`

//     } catch (error) {
//         console.log(error)
//     }
// }
// payments();
// const monthPaymentDetails = filterPaymentsByMonth(payment);

// let MonthlyFeePayment = filterPaymentTypes(monthPaymentDetails, "Monthly Fee")
// let AnnualFeePayment = filterPaymentTypes(monthPaymentDetails, "Annual fee")
// let initialFeePayment = filterPaymentTypes(monthPaymentDetails, "initial Fee")
// let RenewalFeePayment = filterPaymentTypes(monthPaymentDetails, "Renewal Fee")

// function TotalValue(paymentList) {
//     let sum = 0;
//     paymentList.forEach(item => {
//         sum += item.amount;
//     })
//     return sum;
// }

// let NumberOfPaymentOcured = monthPaymentDetails.length;

// tableBody.innerHTML = `
//                 <tr>
//                     <td>Initial Fee</td>
//                     <td class="right-text">${initialFeePayment.length}</td>
//                     <td class="right-text">${TotalValue(initialFeePayment)}</td>
//                 </tr>
//                 <tr>
//                     <td>Monthly Fee</td>
//                     <td class="right-text">${MonthlyFeePayment.length}</td>
//                     <td class="right-text">${TotalValue(MonthlyFeePayment)}</td>
//                 </tr>
//                 <tr>
//                     <td>Annual Fee</td>
//                     <td class="right-text">${AnnualFeePayment.length}</td>
//                     <td class="right-text">${TotalValue(AnnualFeePayment)}</td>
//                 </tr>
//                 <tr>
//                     <td>Renewal Fee</td>
//                     <td class="right-text">${RenewalFeePayment.length}</td>
//                     <td class="right-text">${TotalValue(RenewalFeePayment)}</td>
//                 </tr>
//                 <tr style="color:red;">
//                     <td>Total</td>
//                     <td class="right-text">${NumberOfPaymentOcured}</td>
//                     <td class="right-text" >${TotalValue(monthPaymentDetails)}</td>
//                 </tr>`
