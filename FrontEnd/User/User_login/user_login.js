let userDetails = JSON.parse(localStorage.getItem('userDetails')) || [];
const gymMember = JSON.parse(localStorage.getItem('gymMember')) || [];
const paymentHistory = JSON.parse(localStorage.getItem('paymentHistory')) || [];


const message = document.getElementById("loginMessage");
function getUserDetails(userId) {
    const memberDetails = gymMember.find(item => item.id === userId);
    const memberPaymentHistory = paymentHistory.find(item => item[0] === userId);
    userDetails = {
        id: userId,
        memberDetails: memberDetails,
        memberPaymentHistory: memberPaymentHistory[1]
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
document.getElementById('userLogin').addEventListener('submit', async function (event) {
    event.preventDefault();

    let userId = document.getElementById('userId').value;
    let password = document.getElementById('userPassword').value;

    const res = await fetch(`http://localhost:5237/api/User/Get-All-Users`);
    const UserList = await res.json();
    const User=UserList.find(u=>u.id==userId);
    console.log(User)
    if(User){
    console.log(User.userRole)
    const sres = await fetch(`http://localhost:5237/api/User/Get-User-By-Id/${User.id}`);
    const singleUser = await sres.json();
    console.log(User)
    console.log(singleUser)
    console.log(singleUser.password)
    if (singleUser.password != encryptPassword(password)) {
        message.innerHTML = `Password is invalid<br>Please try again`
        console.log(encryptPassword(password))
        console.log(singleUser.pasword);
        
    } else if (singleUser.password == encryptPassword(password)) {
        window.location.href = "../User_profile/User_Profile.html";
        if (singleUser.userRole == 'member') {

            localStorage.setItem('UserId', JSON.stringify(User.id))
            window.location.href = "../User_profile/User_Profile.html";
        } else {
            window.location.href = "../../Admin/Dashboard/dashboard.html";
        }
    }
}else{
    message.innerHTML=`User Id is invalid <br>Please try again`
}
});

