// const TrainingProgram = JSON.parse(localStorage.getItem('gymTrainingProgram')) || [];

let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
const Programs=document.getElementById("Programs");

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

window.onscroll = () => {
    menu.classList.remove('bx-x');
    navbar.classList.remove('active');
}

const typed = new Typed('.multiple-text',  {
    strings: ['Physical Fitness', 'Weight Gain', 'Strength Training', 'Fat Lose', 'Weightlifting', 'Running'],
    typeSpeed: 60,
    backSpeed: 60,
    backDelay: 1000,
    loop: true,
 });
 let data=[];
 async function Program(){
    const res=await fetch(`http://localhost:5237/api/WorkOutProgram/Get-All-WorkOut-Programs`);
    const workoutProgram=await res.json();
    workoutProgram.forEach(element => {
    data +=`            <div class="row">
                <h4>${element.title}</h4>
                <p>${element.description}</p>
            </div>`
 });
 Programs.innerHTML=data;
}
Program();