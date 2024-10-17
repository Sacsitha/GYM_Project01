// ----------User----------
class Users {
    id;
    userRole;
    password;

    //Create a uniques password
    createPassword() {
        let password = `${(parseInt(Math.random() * 1000000))}`
        return password;
    }
    // Encrypt the password to store
    encryptPassword(password) {
        try {
            let EncryptPassword = [];
            //Reversing the password and returning an array
            for (let i = 0; i < password.length; i++) {
                EncryptPassword.push(password[(password.length - 1) - i])
            }
            for (let i = 0; i < EncryptPassword.length; i = i + 2) {
                //Changing the Numbers in the password
                if (!isNaN(EncryptPassword[i])) {
                    if (EncryptPassword[i] <= 4) {
                        EncryptPassword[i] = (EncryptPassword[i]) + 5;
                    } else {
                        EncryptPassword[i] = (EncryptPassword[i]) - 3;
                    }
                }
                if (!isNaN(EncryptPassword[i + 1])) {
                    if (EncryptPassword[i + 1] <= 4) {
                        EncryptPassword[i + 1] = (EncryptPassword[i + 1]) + 1;
                    } else {
                        EncryptPassword[i + 1] = (EncryptPassword[i + 1]) - 5;
                    }
                }
                //jumbling the characters
                let temp = EncryptPassword[i];
                EncryptPassword[i] = EncryptPassword[i + 1];
                EncryptPassword[i + 1] = temp;
            }
            this.password = EncryptPassword.join("");
        } catch (error) {
            console.log(error);
        }
    }
    //A method to create a unique Id
    createID(gymMember) {
        try {
            if (gymMember==[]) {
                this.id = "GM" + (100000 + (gymMember.length))
            } else {
                let ExtractNum = Number(gymMember.slice(2, 8));
                this.id = "GM" + (ExtractNum + 1)
            }

        } catch (error) {
            console.log(error);
        }
    }

}


//-------Gym Members Class------

class Member {
    // ----All the properties of members------

    id;
    nicNumber = "N/A";
    address;
    contactNo;
    email;
    dob;
    fname;
    lname;
    age;
    gender;
    height;
    weight;
    memberStatus=true;
    admissionDate;
    userId;
    ;

    // Constructor to initialize the object with attributes
    constructor(address, contactNo, height, weight, email, dob, gender, fname, lname,userId) {
        this.address = address;
        this.contactNo = contactNo;
        this.gender = gender;
        this.height = height;
        this.weight = weight;
        this.email = email;
        this.dob = dob;
        // this.membershipType = membershipType;
        this.fname = fname;
        this.lname = lname;
        const date = new Date();
        this.admissionDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        const timestamp = date.valueOf();
        this.id = "M"+timestamp;
        this.userId=userId;
    }
// --------------------------------Set-------------------------------------------------------------------------------//
    //A method to validate Age   
    setAge(age) {
        try {
            if ((age >= 14) && (age <= 100)) {
                this.age = Number(age);
            } else {
                throw "Age is invalid"
            }
        } catch (error) {
            document.getElementById("message8").innerHTML = error;
        }
    }
    // A method to set NIC number
    setNicNo(nicNo) {
        try {
            // Conditions for the NIC number validation
            if ((nicNo.length == 10) && ((nicNo[0] == 1) && ((nicNo[9]) == "V" || (nicNo[9] == "X")))) {    //Condition for old NIC number
                this.nicNumber = nicNo;
                document.getElementById("message").innerHTML = "User Creation Successful";
            } else if ((nicNo.length == 12) && (nicNo[0] == 2) && (nicNo[1] == 0)) {                    //Condition for new NIC number
                this.nicNumber = nicNo;
                document.getElementById("message").innerHTML = "User Creation Successful";
            } else {
                throw "NIC number is incorrect";                                           //The error message that should be thrown
            }
        } catch (error) {
            console.log(error);
        }
    }

    //-----------------------------------------------------------------------------------------------------------------------------//
    //Get
    // Methhod to get admission date of the user
    getAdmissionDate() {
        return this.admissionDate;
    }
}
class Enrollment {
    memberId;
    programId;
    subscriptiontype;
    enrollmentDate;
    nxtDueDate;

    constructor(memberId, programId, subscriptiontype) {
        this.memberId = memberId;
        this.programId = programId;
        this.subscriptiontype = subscriptiontype;
        const date = new Date();
        this.enrollmentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    }
    setNxtDueDate(mdate) {
        if (this.subscriptiontype == "monthlySubscription") {
            const Mdate = new Date(mdate);
            if (Mdate.getMonth() + 1 < 12) {
                this.nxtDueDate = `${Mdate.getFullYear()}-${Mdate.getMonth() + 2}-${Mdate.getDate()}`;
            } else {
                this.nxtDueDate = `${Mdate.getFullYear() + 1}-${Mdate.getMonth() - 10}-${Mdate.getDate()}`;
            }
        } else if (this.subscriptiontype == "annualSubscription") {
            console.log("a");
            const Adate = new Date(mdate);
            console.log(Adate);
            this.nxtDueDate = `${Adate.getFullYear() + 1}-${Adate.getMonth() + 1}-${Adate.getDate()}`;
            console.log(this.nxtDueDate);
        }
    }
}

