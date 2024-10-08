let userDetails = JSON.parse(localStorage.getItem('userDetails')) || [];
const gymMember = JSON.parse(localStorage.getItem('gymMember')) || [];
const paymentHistory = JSON.parse(localStorage.getItem('paymentHistory')) || [];


const message=document.getElementById("loginMessage");
function getUserDetails(userId){
    const memberDetails=gymMember.find(item => item.id === userId);
    const memberPaymentHistory=paymentHistory.find(item=>item[0]===userId);
    userDetails={
        id:userId,
        memberDetails:memberDetails,
        memberPaymentHistory:memberPaymentHistory[1]
    };
    localStorage.setItem('userDetails', JSON.stringify(userDetails));


}


function encryptPassword(password) {
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
        let pasword = EncryptPassword.join("");
        return pasword;
}



// Login
document.getElementById('userLogin').addEventListener('submit', function (event) {
    event.preventDefault();
    console.log("a")
    let userId = document.getElementById('userId').value;
    let password = document.getElementById('userPassword').value;
    if(userId=='Admin' && password==='123'){
        window.location.href = "../../Admin/Dashboard/dashboard.html";
    }else{
        const member=gymMember.find(item => item.id === userId);
        if (member){
            if(member.pasword===encryptPassword(password)){
                console.log("j")
                getUserDetails(userId);
                 window.location.href = "../User_profile/User_Profile.html";
            }else{
            message.innerHTML=`Your Password invalid<br>Please try again`        
                
            }
        }else{
            message.innerHTML=`User Id invalid<br>Please try again`        
        }
    }

});

