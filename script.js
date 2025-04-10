//! Getting all elements from html
const form = document.getElementById("form");
const textInput = document.getElementById("textInput");
const dateInput = document.getElementById("dateInput");
const textarea = document.getElementById("textarea");
const msg = document.getElementById("msg");
const tasks = document.getElementById("tasks");
const add = document.getElementById("add");

//! Form validation

const formValidation = () => {
  if (
    textInput.value === "" ||
    dateInput.value === "" ||
    textarea.value === ""
  ) {
    msg.innerHTML = "Input Fields Cannot Be Empty 😞";
    //console.log("data not found");
  } else {
    msg.innerHTML = "";
    //console.log("data found");
    getData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();
    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};


//! Submit logic

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    formValidation();
})

//! getting details from the form input and storing it in data in array of objects.

let data = [{}]

const getData = ()=>{
    data.push({
        text: textInput.value,
        date: dateInput.value,
        task: textarea.value
    })
    
    //to save the data to the local storage
    localStorage.setItem("data", JSON.stringify(data));
  
    createTask();
}

//! Create function used to get the data from local storage and display it in my todo's

const createTask = () =>{
    tasks.innerHTML =""
    data.map((ele,y)=>{
        return(
            tasks.innerHTML += `
            <div id=${y}>
            <span class="fw-bolder">${ele.text}</span>
            <span class="fw-bolder">${ele.date}</span>
            <p class="fw-bold">${ele.task} </p>
            <span class="options">
            <i onclick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fa-solid fa-square-pen fa-beat" style="color: #FFD43B;"></i>
            <i onclick="deleteTask(this); createTask()" class="fa-solid fa-trash-can fa-beat" style="color: #FFD43B;"></i>
            </span>
            </div>
            ` 
        )
    })
    resetForm();

}

// Resetting the form after displaying the task

const resetForm =()=>{
   textInput.value="";
   dateInput.value="";
   textarea.value="";
}

(()=>{
   data = JSON.parse(localStorage.getItem("data")) || []
   createTask();
}) ();


//! Edit function for created TODO's

const editTask = (e) =>{
    let result = e.parentElement.parentElement;
    textInput.value = result.children[0].innerHTML;
    dateInput.value = result.children[1].innerHTML;
    textarea.value = result.children[2].innerHTML;
    
    //to remove the old task after edited
    deleteTask(e)
}

//delete function for created Todo

const deleteTask = (e)=>{
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id,1);
  localStorage.setItem("data",JSON.stringify(data))
}