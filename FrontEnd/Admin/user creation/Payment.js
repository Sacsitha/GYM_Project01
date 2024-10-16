class Payment {
    date;
    details;
    feeType
    amount;
    memberId;
    constructor(amount, details,memberId,feeType) {
        const date = new Date();
        this.date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        this.amount = amount;
        this.details = details;
        this.memberId=memberId;
        this.feeType=feeType;
    }

    setPaymentDate() {
        try {
            const date = new Date();
            this.date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

        } catch (error) {
            console.log(error);
        }
    }
    setDetails(detail) {
        this.details = detail;
    }
    getPaymentDate() {
        return this.date;
    }

    setMemberId(memberId) {
        this.memberId = memberId
    }
    getMemberId() {
        return this.memberId;
    }

}