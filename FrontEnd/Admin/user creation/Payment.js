class Payment {
    paymentDate;
    amount;
    details;
    memberId;
    constructor(amount, details,memberId) {
        const date = new Date();
        this.paymentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        this.amount = amount;
        this.details = details;
        this.memberId=memberId;
    }


}