

class Program{
    title;
    description;
    programStatus;
    createdDate
    initalFee;
    monthlyFee;
    annualFee;

    constructor(title,description,monthlyFee,annualFee,initialFee){
        this.title=title;
        this.description=description;
        this.programStatus=true;
        this.monthlyFee=monthlyFee;
        this.annualFee=annualFee;
        this.initalFee=initialFee;
        const date = new Date();
        this.createdDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }
    createID(gymTrainingProgram) {
        try {
            console.log("c")
            if(gymTrainingProgram.length==0){
                this.id = "T" + (100 + (gymTrainingProgram.length)) 
                console.log("a")               
            }else{
                let ExtractNum=Number(gymTrainingProgram.slice(1,4));
                this.id="T"+(ExtractNum+1)
            }

        } catch (error) {
            console.log(error);
        }
    }
    setMonthlyFee(monthlyFee){
        this.monthlyFee=monthlyFee;
    }
    setAnnualFee(annualFee){
        this.annualFee=annualFee;
    }

    getMonthlyFee(){
        return this.monthlyFee;
    }
    getAnnualFee(){
        return this.annualFee;
    }
    getId(){
        return this.id;
    }
}