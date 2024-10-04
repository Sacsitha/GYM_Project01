class Payment{
    title;
    description;
    initalFee;
    monthlyFee;
    annualFee;
    id;

    constructor(title,description,monthlyFee,annualFee,initialFee){
        this.title=title;
        this.description=description;
        this.monthlyFee=monthlyFee;
        this.annualFee=annualFee;
        this.initalFee=initialFee
    }
    createID(gymTrainingProgram) {
        try {
            console.log("c")
            if(gymTrainingProgram.length==0){
                this.id = "T" + (100 + (gymTrainingProgram.length)) 
                console.log("a")               
            }else{
                let Lastobj=(gymTrainingProgram[gymTrainingProgram.length-1])
                let Lastid=Lastobj.id;
                let ExtractNum=Number(Lastid.slice(1,4));
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