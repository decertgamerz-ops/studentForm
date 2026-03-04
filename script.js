let submit = document.querySelector("#forms");

let database = [];
database = JSON.parse(localStorage.getItem("studentList")) || [];
submit.addEventListener("submit", (e) => {
   e.preventDefault()
   let details = {
      name: document.querySelector(".name").value,
      address: document.querySelector(".address").value,
      age: document.querySelector(".age").value,
      studentClass: document.querySelector(".classes").value,
   }

   if (details.name.trim() === "" ||
      details.age.trim() === "" ||
      details.studentClass.trim() === "" ||
      details.address.trim() === "") {
      alert("fill all the fields")
      return;
   }

   if (details.name.trim() === "" || details.name.trim().length < 3) {
      alert("Please enter valid name (minimum 3 characters)");
      return;
   }

   if (details.name.trim() === "") {
      alert("Please enter age");
      return;
   }

   if (details.address.trim() === "" || details.address.trim().length < 3) {
      alert("Please enter address (minimum 3 characters)");
      return;
   }

   if (details.studentClass === "") {
      alert("Please enter student Class");
      return;
   }





   database.push(details);
   localStorage.setItem("studentList", JSON.stringify(database));
   document.querySelector("#forms").reset();
   tableShow()
})

function showdata() {
   localStorage.setItem("studentList", JSON.stringify(database));
   let data = JSON.parse(localStorage.getItem("studentList"));
   // console.log(data);
}
tableShow();
function tableShow() {

   let data = JSON.parse(localStorage.getItem("studentList")) || [];
   let tableBody = document.querySelector("#tableBody");
   tableBody.innerHTML = "";
   for (i = 0; i < data.length; i++) {
      let student = data[i];

      tableBody.innerHTML += `
      <tr>
      <td>${student.name}</td>
      <td>${student.address}</td>
      <td>${student.age}</td>
      <td>${student.studentClass}</td>
      <td><button onclick="deleteRow(${i})">Delete</button></td>
      </tr>
      `;

   }
}

function deleteRow(index) {
   let data = JSON.parse(localStorage.getItem("studentList")) || [];
   data.splice(index, 1);
   database = data
   localStorage.setItem("studentList", JSON.stringify(data));
   tableShow()
}

let search = "";
let search_btn = document.querySelector("#Search");

search_btn.addEventListener("submit", (e) => {
   e.preventDefault()
   let input = document.querySelector(".search_input");
   search = input.value;
   searchStudent(search)
});


function searchStudent(search) {

   let data = JSON.parse(localStorage.getItem("studentList")) || [];
   let found = false;
   let tableData = [];
   for (i = 0; i < data.length; i++) {
      if (data[i].name.toLowerCase() === search.toLowerCase()) {

         found = true;
         tableData.push(data[i]);
      }

      else if (found === false) {
         console.log("user not found");

      }
   }

   if (found === false) {
      showPopup("user not found");
   }

   let tableBody = document.querySelector("#tableBody");
   tableBody.innerHTML = "";
   for (i = 0; i < tableData.length; i++) {
      let student = tableData[i];

      tableBody.innerHTML += `
      <tr>
      <td>${student.name}</td>
      <td>${student.address}</td>
      <td>${student.age}</td>
      <td>${student.studentClass}</td>
      <td><button onclick="deleteRow(${i})">Delete</button></td>
      </tr>
      `;

   }

   // console.log(found);
}

let closeMgs = document.querySelector(".close_mgs");
closeMgs.addEventListener("click", () => {
   closePopup();
})

function showPopup(message) {
   document.querySelector("#popupMessage").innerText = message;
   document.querySelector("#popup").style.display = "flex";
}

function closePopup() {
   document.querySelector("#popup").style.display = "none";
   tableShow();
}
