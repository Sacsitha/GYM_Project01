const apiUrl = "http://localhost:3000/workoutPrograms";
const enrollmentapiUrl = "http://localhost:3000/enrollments";

const conclusion = document.getElementById("conclution");
const programChart = document.getElementById('ProgramReportChart').getContext('2d');
const ProgamNames = [];
const ParticpantsNumber = [];
const ProgramData = [];
let programClarification = [];
async function ProgramEnrollment() {
    try {
        const res = await fetch(apiUrl);
        const programs = await res.json();
        if (!res.ok) {
            console.log("Table not found");
            return;
        }
        const resEnroll = await fetch(enrollmentapiUrl);
        const Enrolls = await resEnroll.json();
        if (!resEnroll.ok) {
            console.log("Table not found");
            return;
        }
        programs.forEach(item => {
            let count = 0;
            Enrolls.forEach(element => {
                if (item.id == element.programId) {
                    count++;
                }
            });
            let individualProgram = {
                ProgramName: item.title,
                Particpants: count
            }
            programClarification += `<p>${item.title} : ${count} members</p>`
            ProgramData.push(individualProgram);
        });
        conclusion.innerHTML = programClarification;
        ProgramData.forEach(item => {
            ProgamNames.push(item.ProgramName);
            ParticpantsNumber.push(item.Particpants);
        })
        const myBarChart = new Chart(programChart, {
            type: 'bar',
            data: {
                labels: ProgamNames,
                datasets: [{
                    label: 'Participating Members',
                    data: ParticpantsNumber,
                    backgroundColor: 'rgba(0,204,255, 0.6)',
                    borderColor: 'rgba(0,204,255, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        display: true
                    }
                }
            }

        });
    } catch (e) {
        console.log(e)
    }
}
ProgramEnrollment();


