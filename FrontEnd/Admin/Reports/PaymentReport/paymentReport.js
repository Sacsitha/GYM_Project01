const paymentApiUrl = "http://localhost:3000/payments";



const paymentHistory = JSON.parse(localStorage.getItem('paymentHistory')) || [];
const summary = document.getElementById("summary");
const tableBody = document.querySelector('#data-table tbody');


// let payment=[];
//     paymentHistory.forEach(element => {
//         element[1].forEach(item=>{
//             payment.push(item);
//         })
//     });
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
function filterPaymentTypes(payment, detail) {
    return payment.filter(item => item.feeType == detail);
}
async function payments() {
    try {
        const res = await fetch(paymentApiUrl);
        const payments = await res.json();
        if (!res.ok) {
            console.log("Table not found");
            return;
        }
        const monthPaymentDetails = filterPaymentsByMonth(payments);
        let MonthlyFeePayment = filterPaymentTypes(monthPaymentDetails, "Monthly Fee")
        let AnnualFeePayment = filterPaymentTypes(monthPaymentDetails, "Annual fee")
        let initialFeePayment = filterPaymentTypes(monthPaymentDetails, "initial Fee")
        let RenewalFeePayment = filterPaymentTypes(monthPaymentDetails, "Renewal Fee")

        function TotalValue(paymentList) {
            let sum = 0;
            paymentList.forEach(item => {
                sum += Number(item.amount);
            })
            return sum;
        }

        let NumberOfPaymentOcured = monthPaymentDetails.length;

tableBody.innerHTML = `
                <tr>
                    <td>Initial Fee</td>
                    <td class="right-text">${initialFeePayment.length}</td>
                    <td class="right-text">${TotalValue(initialFeePayment)}</td>
                </tr>
                <tr>
                    <td>Monthly Fee</td>
                    <td class="right-text">${MonthlyFeePayment.length}</td>
                    <td class="right-text">${TotalValue(MonthlyFeePayment)}</td>
                </tr>
                <tr>
                    <td>Annual Fee</td>
                    <td class="right-text">${AnnualFeePayment.length}</td>
                    <td class="right-text">${TotalValue(AnnualFeePayment)}</td>
                </tr>
                <tr>
                    <td>Renewal Fee</td>
                    <td class="right-text">${RenewalFeePayment.length}</td>
                    <td class="right-text">${TotalValue(RenewalFeePayment)}</td>
                </tr>
                <tr style="color:red;">
                    <td>Total</td>
                    <td class="right-text">${NumberOfPaymentOcured}</td>
                    <td class="right-text" >${TotalValue(monthPaymentDetails)}</td>
                </tr>`

    } catch (error) {
        console.log(error)
    }
}
payments();
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
