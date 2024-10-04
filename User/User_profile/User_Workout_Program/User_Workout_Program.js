const userDetails = JSON.parse(localStorage.getItem('userDetails')) || [];

const Workout_Program =document.getElementById("Workout_Program");

const personalInfo=userDetails.memberDetails;

let allProgram='';
personalInfo.trainingProgram.forEach(element => {
    allProgram+=`        
        <div class="Program_Details">
            <h4>${element.title}</h4>
            <p>${element.description}</p>
        </div>`
});
Workout_Program.innerHTML=allProgram;