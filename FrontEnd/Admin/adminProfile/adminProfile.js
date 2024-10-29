
        function openModal() {
            document.getElementById("passwordModal").style.display = "flex";
        }

        function closeModal() {
            document.getElementById("passwordModal").style.display = "none";
        }

        document.getElementById("passwordForm").addEventListener("submit", function(event) {
            event.preventDefault();


            const oldPassword = document.getElementById("oldPassword").value;
            const newPassword = document.getElementById("newPassword").value;
            const confirmPassword = document.getElementById("confirmPassword").value;

            let isValid = true;
            document.getElementById("newPasswordError").textContent = "";
            document.getElementById("confirmPasswordError").textContent = "";

    
            const passwordPattern = /^(?=.[A-Z])(?=.\d)[A-Za-z\d]{8,}$/;
            if (!passwordPattern.test(newPassword)) {
                document.getElementById("newPasswordError").textContent =
                    "Password must be at least 8 characters, including 1 uppercase letter and 1 number.";
                isValid = false;
            }

      
            if (newPassword !== confirmPassword) {
                document.getElementById("confirmPasswordError").textContent =
                    "Passwords do not match.";
                isValid = false;
            }

            if (isValid) {
        
                closeModal();
            }
        });