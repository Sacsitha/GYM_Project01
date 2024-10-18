// const userDetails = JSON.parse(localStorage.getItem('userDetails')) || [];
const UserId = JSON.parse(localStorage.getItem('UserId')) || [];

const Workout_Program = document.getElementById("Workout_Program");

// const personalInfo=userDetails.memberDetails;

async function userDetailDisplay() {
    try {
        const res = await fetch(`http://localhost:5237/api/Member/Get-Member-By-UserID /${UserId}`);
        const member = await res.json();
        const enrollres = await fetch(`http://localhost:5237/api/Enrollment/Get-Enrollments-By-MemberId/${member.id}`);
        const enrollments = await enrollres.json();
        if (!res.ok) {
            console.log("Table not found");
        }
        console.log("sd")
        console.log(enrollments);
        
        let allProgram = '';
        enrollments.forEach(async element => {
            console.log(element.programId);
            
            const prores = await fetch(`http://localhost:5237/api/WorkOutProgram/Get-WorkOut-Program-By-ID /${element.programId}`);
            const programs = await prores.json();
            console.log(enrollments)
            const SingleProgram=document.createElement("div")
            SingleProgram.innerHTML = `        
        <div class="Program_Details">
            <h4>${programs.title}</h4>
            <p>${programs.description}</p>
        </div>`
        Workout_Program.appendChild(SingleProgram);
        });
        // Workout_Program.innerHTML = allProgram;
    } catch (e) {
        console.log(e);
    }
}
userDetailDisplay();
// let allProgram = '';
// personalInfo.trainingProgram.forEach(element => {
//     allProgram += `        
//         <div class="Program_Details">
//             <h4>${element.title}</h4>
//             <p>${element.description}</p>
//         </div>`
// });
// Workout_Program.innerHTML = allProgram;