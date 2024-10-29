// ----------Fetch Api-------------
const apiUrl = "http://localhost:3000/members";
const enrollmentapiUrl = "http://localhost:3000/enrollments";
const userApiUrl = "http://localhost:3000/users";
const paymentApiUrl = "http://localhost:3000/payments";
const programapiUrl = "http://localhost:3000/workoutPrograms";


// const UserList = JSON.parse(localStorage.getItem('memberID')) ||[];
// console.log(UserList)
//-------------------HTML Elements and their values-------------------------
//table
const tableBody = document.querySelector('#data-table tbody');
//modals
const programSelectionModal = document.getElementById("programSelectionModal");
const addMemberModal = document.getElementById("addMemberModal");
const modalDeleteUser = document.getElementById("modalDeleteUser");
const modalVeiwUser = document.getElementById("modalVeiwUser");
const Enrollprogram = document.getElementById('Enrollprogram');
const modalSubmit = document.getElementById("modalSubmit");
const modalTitle = document.getElementById("modalTitle");
//Addmember
const addMemberbtn = document.getElementById("addMember");
const addMember = document.getElementById("memberDetails");
const programSelection = document.getElementById("programSelection");
//form data
const nicNo = document.getElementById("nicNo");
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const age = document.getElementById("age");
const height = document.getElementById("height");
const weight = document.getElementById("weight");
const checkGender = document.forms["memberDetails"]["gender"];
const dob = document.getElementById("dob");
const contactNo = document.getElementById("contactNo");
const email = document.getElementById("email");
const address = document.getElementById("address");
// const membershipType = document.getElementById("membershipType");
const paymentAmount = document.getElementById("paymentAmount");
// Enrollment
const EnrolledPrograms = document.getElementById("EnrolledPrograms");
const AllProgram = document.getElementById("AllProgram");
const programEnrollmentDetails = document.getElementById('programEnrollmentDetails');
const EnrollProgramDetails = document.getElementById('EnrollProgramDetails');
//View 
const User = document.getElementById("User");
const UserDetails = document.getElementById("UserDetails");
const ProgramView = document.getElementById("ProgramView");
//Delete
const Delete = document.getElementById("Delete");

//Search
const searchInput = document.getElementById("searchInput");
//------------Global Variable Declarations
let UserSelectedProgram = [];
let Ipayment = 0;
let Mpayment = 0;
let Apayment = 0;

//function to close modals
function closeModalWindow(modalName) {
    modalName.style.display = 'none'
}

//function to close modals
function openModalWindow(modalName) {
    modalName.style.display = 'block'
}

//Search
async function search() {
    let Search = searchInput.value;
    const res = await fetch(`http://localhost:5237/api/Member/Get-Member-By-UserID /${Search}`);
    const member = await res.json();
    const memberList=[]
    memberList.push(member)
    tableBodyCreation(memberList);
}

async function editRow(id) {
    // Find the member with the specified id
    const res = await fetch(`http://localhost:5237/api/Member/Get-Member-By-ID /${id}`);
    const member = await res.json();
    // showing the alredy existing data to the user   
    nicNo.value = member.nicNumber
    age.value = member.age
    email.value = member.email
    dob.value = member.dob
    address.value = member.address
    height.value = member.height
    weight.value = member.weight
    contactNo.value = member.contactNo
    fname.value = member.fname
    lname.value = member.lname
    checkGender.value = member.gender;
    modalTitle.innerHTML = `Edit member ${member.userId}`
    modalSubmit.innerHTML = "Edit Member"
    modalSubmit.type = "button";
    console.log(nicNo.value)
    console.log(member.nic)

    //Saving the changes 
    modalSubmit.onclick = async function () {
        member.nicNumber = nicNo.value;
        member.age = age.value
        member.email = email.value
        member.dob = dob.value
        member.address = address.value
        member.height = height.value
        member.weight = weight.value
        member.contactNo = contactNo.value
        member.fname = fname.value
        member.lname = lname.value;
        member.gender = checkGender.value;
        await fetch(`http://localhost:5237/api/Member/Update-Member/${member.userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(member)
        });
        //Storing the data in the local storage
        closeModalWindow(addMemberModal);
        location.reload();
    };
    // Display the modal
    addMemberModal.style.display = "block";
}
//delete User
function deleteUserbtn(id) {
    User.innerHTML = id;
    modalDeleteUser.style.display = "block";
    Delete.onclick = async function () {
        await fetch(`http://localhost:5237/api/Member/Delete-Member/${id}`, {
            method: "DELETE"
        });
        tables();
        closeModalWindow(modalDeleteUser);
    }
}
//ViewUser
async function viewUser(id) {
    UserDetails.innerHTML = "";
    const res = await fetch(`http://localhost:5237/api/Member/Get-Member-By-ID /${id}`);
    const member = await res.json();
    let dateString = member.dob;
    const date = new Date(dateString);
    // Format the date as YYYY-MM-DD
    const formattedDate = date.toISOString().split('T')[0];

    let SingleUserDetail = `                
                <h2 class="modalTitle">User Details</h2>
                <p><span>Id</span> : ${member.userId}</p>
                <p><span>Name</span> : ${member.fname} ${member.lname}</p>
                <p><span>NIC</span> : ${member.nicNumber} </p>
                <p><span>Age</span> : ${member.age} </p>
                <p><span>Gender</span> : ${member.gender}</p>
                <p><span>Date of Birth</span> : ${formattedDate}</p>
                <p><span>Height</span> : ${member.height} </p>
                <p><span>Weight</span> : ${member.weight} </p>
                <p><span>Email</span> : ${member.email}</p>
                <p><span>Address</span> : ${member.address}</p>
                <p><span>Contact No.</span> : ${member.contactNo}</p>

`;
    UserDetails.innerHTML = SingleUserDetail;
    modalVeiwUser.style.display = "block";

}
// Enrollment
async function enrollments(id) {
    try {
        const res = await fetch(`http://localhost:5237/api/Enrollment/Get-Enrollments-By-MemberId/${id}`);
        const userEnrolledProgram = await res.json();
        if (!res.ok) {
            console.log("Table not found");
            return;
        }
        const programRes = await fetch(`http://localhost:5237/api/WorkOutProgram/Get-All-WorkOut-Programs`);
        const workoutPrograms = await programRes.json();
        if (!res.ok) {
            console.log("Table not found");
            return;
        }
        EnrolledPrograms.innerHTML = '';
        AllProgram.innerHTML = ''
        let EnrolledProgramdetails = [];
        if (userEnrolledProgram != []) {
            userEnrolledProgram.forEach(i => {
                let workoutProgram = workoutPrograms.find(j => j.id == i.programId)
                EnrolledProgramdetails += `
                <div class="catergory">
                <p>${workoutProgram.title}</p>
                <button type="button" class="tablecolor btn button-spacings" onclick="removeEnrollment('${id}','${i.programId}')" >Remove</button>
                </div>`
            });
            EnrolledPrograms.innerHTML = EnrolledProgramdetails;
        }
        const programEnrollDetails = [];
        workoutPrograms.forEach(i => {
            let count = 0;
            userEnrolledProgram.forEach(j => {
                if (i.id == j.programId) {
                    count++;
                    return;
                }
            })
            if (count == 0) {
                programEnrollDetails.push(i);
            }
        })
        let allProgramDetails = [];

        programEnrollDetails.forEach(i => {
            allProgramDetails += `
            <div class="catergory">
                <p>${i.title}</p>
                <button type="button" class="tablecolor btn button-spacing" onclick="addNewEnrollment('${id}','${i.id}')">Enroll</button>
            </div>       
        `
        })
        AllProgram.innerHTML = allProgramDetails;
        openModalWindow(programSelectionModal)
    } catch (e) {
        console.log(e)
    }
}

// Add new enrollment
async function addNewEnrollment(memberId, programId) {
    console.log(memberId + "   " + programId)
    openModalWindow(Enrollprogram);
    const res = await fetch(`http://localhost:5237/api/WorkOutProgram/Get-WorkOut-Program-By-ID /${programId}`);
    const programDetails = await res.json();
    programEnrollmentDetails.innerHTML=`<h1>${programDetails.title}</h1>
    <p>${programDetails.title}</p> <ul><li>${programDetails.initalFee}</li><li>${programDetails.monthlyFee}</li><li>${programDetails.annualFee}</li></ul> `
    document.getElementById('EnrollProgramDetails').addEventListener("submit", async (event) => {
        event.preventDefault();
        const subscriptiontype = document.getElementById('membershipType').value;
        const newEnrollment = new Enrollment(memberId, programId, subscriptiontype)
        newEnrollment.setNxtDueDate(newEnrollment.enrollmentDate);
        await fetch(`http://localhost:5237/api/Enrollment/Add-Enrollment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newEnrollment)
        });
        enrollments(memberId)
        closeModalWindow(Enrollprogram);

        const programRes = await fetch(`http://localhost:5237/api/WorkOutProgram/Get-WorkOut-Program-By-ID /${programId}`);
        const workoutPrograms = await programRes.json();
        if (subscriptiontype == "monthlySubscription") {
            console.log(memberId);
            const initialPayment = new Payment(Number(workoutPrograms.initalFee), `initial fees ${workoutPrograms.title}`, memberId);
            await fetch(`http://localhost:5237/api/Payment/Add-Payment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(initialPayment)
            });
        } else if (subscriptiontype == "annualSubscription") {
            const annualPayment = new Payment(Number(workoutPrograms.annualFee), `annual fees ${workoutPrograms.title}`, memberId);
            await fetch(`http://localhost:5237/api/Payment/Add-Payment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(annualPayment)
            });
        }
    });
}

async function removeEnrollment(memberId, programId) {
    try {
        await fetch(`http://localhost:5237/api/Enrollment/Delete-Enrollment/${memberId},${programId}`, {
            method: "DELETE"
        });
        enrollments(memberId);

    } catch (e) {
        console.log(e)
    }
}

async function tables() {
    try {
        const res = await fetch(`http://localhost:5237/api/Member/Get-All-Members`);
        const gymMember = await res.json();

        if (!res.ok) {
            console.log("Table not found");
            return;
        }
        const member = Array.isArray(gymMember) ? gymMember : [gymMember];
        tableBodyCreation(member);
    } catch (error) {
        console.log(error)
    }
}
tables();
//-----functions to create the table of user details
function tableBodyCreation(member) {

    let tableData = "";
    tableBody.innerHTML = "";
    member.forEach(item => {

        //Get every user and creating their rows
        tableData += `<tr>
                                <td class="t-op-nextlvl">${item.userId}</td>
                                <td class="t-op-nextlvl">${item.fname} ${item.lname} </td>
                                <td class="t-op-nextlvl">${item.nicNumber}</td>
                                <td class="t-op-nextlvl">
                                    <button type="button" class="tablecolor btn" onclick="viewUser('${item.id}')">View</button>
                                    <button type="button" class="tablecolor btn" onclick="editRow('${item.id}')">Edit</button>
                                    <button type="button" class="tablecolor btn"onclick="deleteUserbtn('${item.id}')">Delete</button>
                                    <button type="button" class="tablecolor btn"onclick="enrollments('${item.id}')">Enrollments</button>
                                </td>
                            </tr>`;
    });
    tableBody.innerHTML = tableData;

}



//Get the data from form
addMember.addEventListener("submit", async function (event) {
    event.preventDefault();
    //create user
    const newUser = new Users();
    newUser.userRole = "member";
    let password = newUser.createPassword();
    alert(password);
    newUser.encryptPassword(password);
    await fetch(`http://localhost:5237/api/User/Add-User`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
    });
    //create member
    //get the gender***
    let gender;
    if (checkGender.value == "male") {
        gender = "male"
    } else if (checkGender.value == "female") {
        gender = "female"
    } else {
        gender = "other"
    }
    //Creating an object to each user and inserting their details
    const newMember = new Member(address.value, contactNo.value, Number(height.value), Number(weight.value), email.value, dob.value, gender, fname.value, lname.value, newUser.Id);
    newMember.setAge(age.value);
    // newMember.userId = newUser.id;
    if (!(nicNo.value == "")) {
        newMember.setNicNo(nicNo.value);
    }
    await fetch(`http://localhost:5237/api/Member/Add-Member`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newMember)
    });
    console.log(JSON.stringify(newMember));
    event.target.reset();
    tables();
    addMemberModal.style.display = "none";
}
);












