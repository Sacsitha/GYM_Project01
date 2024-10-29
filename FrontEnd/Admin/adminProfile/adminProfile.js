
        function openModal() {
            document.getElementById("passwordModal").style.display = "flex";
        }

        function closeModal() {
            document.getElementById("passwordModal").style.display = "none";
        }

        // document.getElementById("passwordForm").addEventListener("submit", function(event) {
        //     event.preventDefault();


        //     const oldPassword = document.getElementById("oldPassword").value;
        //     const newPassword = document.getElementById("newPassword").value;
        //     const confirmPassword = document.getElementById("confirmPassword").value;

        //     let isValid = true;
        //     document.getElementById("newPasswordError").textContent = "";
        //     document.getElementById("confirmPasswordError").textContent = "";

    
        //     const passwordPattern = /^(?=.[A-Z])(?=.\d)[A-Za-z\d]{8,}$/;
        //     if (!passwordPattern.test(newPassword)) {
        //         document.getElementById("newPasswordError").textContent =
        //             "Password must be at least 8 characters, including 1 uppercase letter and 1 number.";
        //         isValid = false;
        //     }

      
        //     if (newPassword !== confirmPassword) {
        //         document.getElementById("confirmPasswordError").textContent =
        //             "Passwords do not match.";
        //         isValid = false;
        //     }

        //     if (isValid) {
        
        //         closeModal();
        //     }
        // });

const changePassword=document.getElementById('passwordForm');


        changePassword.addEventListener('submit',async function (event){
            event.preventDefault()
            const oldPassword = document.getElementById("oldPassword").value
            const newPassword = document.getElementById("newPassword").value
            const confirmPassword = document.getElementById("confirmPassword").value;
            const message=document.getElementById('message');
            const encryptedPassword=encryptPassword(oldPassword);
            const res = await fetch(`http://localhost:5237/api/User/Get-User-By-Id/${UserId}`);
            const User = await res.json();
        
            if(encryptedPassword==User.password){
                if(newPassword===confirmPassword){
                    User.password=encryptPassword(newPassword)
                    await fetch(`http://localhost:5237/api/Member/Update-Member/${UserId}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(User)
                    }); 
                }else{
                    message.innerHTML="confirm password is invalid"
                }
            }else{
                message.innerHTML="Password incorrect"}
            }
        )
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