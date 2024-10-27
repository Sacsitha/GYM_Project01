// Fetch API
const getAllProgramUrl = `http://localhost:5237/api/WorkOutProgram/Get-All-WorkOut-Programs`;
const getProgramByIdUrl=`http://localhost:5237/api/WorkOutProgram/Get-WorkOut-Program-By-ID /`;
const updateProgramUrl=`http://localhost:5237/api/WorkOutProgram/Update-WorkOut-Program/`;
const addProgramUrl=`http://localhost:5237/api/WorkOutProgram/Add-WorkOut-Programs`;
const deleteProgramUrl=`http://localhost:5237/api/WorkOutProgram/Delete-Program/`

// DOM variables
const tableBody = document.querySelector('#data-table tbody');
// Modals
const addProgramModal = document.getElementById("addProgramModal");
const modalTitle = document.getElementById("modalTitle");
const modalVeiwProgram = document.getElementById("modalVeiwProgram");
const modalDeleteProgram = document.getElementById("modalDeleteProgram");

const modalSubmit = document.getElementById("modalSubmit");
const addProgram = document.getElementById("addProgram");
const ProgramDetails = document.getElementById("ProgramDetails");
const program = document.getElementById("program");
const Delete = document.getElementById("Delete");
const programTitle = document.getElementById("title");
const programDescription = document.getElementById("description");
const initialFee = document.getElementById("initalFee");
const monthlyFee = document.getElementById("monthlyFee");
const annualFee = document.getElementById("annualFee");
const searchInput = document.getElementById("searchInput");


//Creating table and assigning values
// Fetching value from backend 
async function tables() {
    try {
        const res = await fetch(getAllProgramUrl);
        const gymTrainingProgram = await res.json();
        if (!res.ok) {
            console.log("Table not found");
            return;
        }
        tableBodyCreation(gymTrainingProgram);
    } catch (error) {
        console.log(error)
    }
}
tables();
// Table format
function tableBodyCreation(gymTrainingProgram) {
    let tableData = "";
    tableBody.innerHTML = "";
    gymTrainingProgram.forEach(item => {
        //Get every user and creating their rows
        tableData += `<tr>
                            <td>${item.id}</td>
                            <td>${item.title}</td>
                            <td>${item.initalFee}</td>
                            <td>${item.monthlyFee}</td>
                            <td>${item.annualFee}</td>
                            <td>${item.description}</td>
                            <td>
                                <button type="button" class="tablecolor btn"  onclick="viewProgramModal('${item.id}')">View</button>
                                <button type="button" class="tablecolor btn" onclick="programEditModal('${item.id}')">Edit</button>
                                <button type="button" class="tablecolor btn" onclick="DeleteProgram('${item.id}')">Delete</button>
                            </td>
                        </tr>`;
    });
    tableBody.innerHTML = tableData;
}

// function to search program
async function search() {
    let Search = searchInput.value;
    const res=await fetch(getProgramByIdUrl+Search);
    const workoutProgram=await res.json();
    const ProgramList=[];
    ProgramList.push(workoutProgram)
    tableBodyCreation(ProgramList);
}

// Modal functions
// Show add program modal
addProgram.onclick = function () {
    addProgramModal.style.display = 'block';
};
// Closing Modal
function closeModals(modalName) {
    modalName.style.display = 'none'
    location.reload();
}



// Handle add program form submission
document.getElementById("trainingProgramCreation").addEventListener("submit", async function (event) {
    event.preventDefault();
    const programTitle = document.getElementById("title").value;
    const programDescription = document.getElementById("description").value;
    const initialFee = document.getElementById("initalFee").value;
    const monthlyFee = document.getElementById("monthlyFee").value;
    const annualFee = document.getElementById("annualFee").value;

    const newTrainingProgram = new Program(programTitle, programDescription, monthlyFee, annualFee, initialFee);
    await fetch(addProgramUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newTrainingProgram)
    });

    event.target.reset();
    tables()
    addProgramModal.style.display = 'none';
});


// Function to handle editing a program
async function programEditModal(id) {
    modalTitle.innerHTML = `Edit Workout ${id}`;
    const res=await fetch(getProgramByIdUrl+id);
    const workoutProgram=await res.json();
    populateForm(workoutProgram);
    modalSubmit.type="button"

    modalSubmit.onclick = async function () {
        workoutProgram.title = programTitle.value;
        workoutProgram.description = programDescription.value;
        workoutProgram.monthlyFee = monthlyFee.value;
        workoutProgram.annualFee = annualFee.value;
        workoutProgram.initalFee = initialFee.value;
        await fetch(updateProgramUrl+id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(workoutProgram)
        });

        tables();
        closeModals(addProgramModal); // Close the modal
    }
    addProgramModal.style.display = 'block';
};

// Function to populate form fields with existing data
function populateForm(data) {
    programTitle.value = data.title || '';
    programDescription.value = data.description || '';
    initialFee.value = data.initalFee || '';
    monthlyFee.value = data.monthlyFee || '';
    annualFee.value = data.annualFee || '';
}


async function viewProgramModal(id) {
    ProgramDetails.innerHTML = "";
    const res=await fetch(getProgramByIdUrl+id);
    const workoutProgram=await res.json();
    let Detail = `
                <h1 class="modalTitle">${workoutProgram.title}</h4>
                <p>Program Id : ${workoutProgram.id}</p>
                <p>Initial Fee : ${workoutProgram.initalFee}</p>
                <p>Monthly Fee : ${workoutProgram.monthlyFee}</p>
                <p>Annual Fee : ${workoutProgram.annualFee}</p>
                <p>Further Details : ${workoutProgram.description}</p>`
    ProgramDetails.innerHTML = Detail;
    modalVeiwProgram.style.display = 'block';
}

function DeleteProgram(id) {
    program.innerHTML = id;
    modalDeleteProgram.style.display = "block";
    Delete.onclick = async function () {
        await fetch(deleteProgramUrl+id, {
            method: "DELETE"
            });
        tables();
        closeModals(modalDeleteProgram);
    }
}



