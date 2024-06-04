let btn=document.querySelector(".container .form .add");
let Input=document.querySelector(".container .form .input");
let tasks=document.querySelector(".container .tasks")

let arrayOfTasks=[];

if(localStorage.getItem("tasks")){
   arrayOfTasks=JSON.parse(localStorage.getItem("tasks"))
}

getDataFromLocalStorage();

// Submit task
btn.addEventListener("click",function(){
   if(Input.value.length !==0){
      addTaskToArray(Input.value);
      Input.value="";
   }
})

tasks.addEventListener("click",function(e){
   if(e.target.classList.contains("del")){
      deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
      e.target.parentElement.remove();
   }
   if(e.target.classList.contains("task")){
      e.target.classList.toggle("done");
      toggleStatusTaskWith(e.target.getAttribute("data-id"));
   }
})


// Add task object to array
function addTaskToArray(taskText){
   // task data
   const task={
      id: Date.now(),
      title:taskText,
      completed:false
   }
   // push tas to array
   arrayOfTasks.push(task);

   addElementsToPageFrom(arrayOfTasks);
   addDataToLocalStorageFrom(arrayOfTasks);
}

function addElementsToPageFrom(arrayOfTasks){
   // empty tasks div
   tasks.innerHTML="";
   //  looping on array of tasks
   arrayOfTasks.forEach((task)=>{
      // create main div
      let div=document.createElement("div");
      div.className="task";
      // check if task is done
      if(task.completed){
         task.className="task done";
      }
      div.setAttribute("data-id",task.id);
      div.appendChild(document.createTextNode(task.title));
      // create delete button
      let span=document.createElement("span");
      span.className="del";
      // append button to main div
      span.appendChild(document.createTextNode("Delete"));
      div.appendChild(span);
      // add task div to tasks
      tasks.appendChild(div);
   // Start Styling 
   span.style.cssText=`
   padding:0 10px;
   font-size:18px;
   color:white;
   background-color:red;
   border:none;
   border-radius:6px;
   cursor:pointer;
   text-align: center;
   display:flex;
   justify-content::center;
   align-items:center;



   `
   div.style.cssText=`
   font-size:26px;
   display:flex;
   justify-content:space-between;
   margin:20px;
   background-color:white;
   padding:10px;
   border-radius:10px;
   `



   });

   
}
function addDataToLocalStorageFrom(arrayOfTasks){
  window.localStorage.setItem("tasks",JSON.stringify(arrayOfTasks))
}

function getDataFromLocalStorage(){
   let data =window.localStorage.getItem("tasks");
   if(data){
     let tasks=JSON.parse(data);
     addElementsToPageFrom(tasks)
   }
}

function deleteTaskWith(taskId){
   arrayOfTasks=arrayOfTasks.filter((task)=>
      task.id!=taskId);

   addDataToLocalStorageFrom(arrayOfTasks);

}


function toggleStatusTaskWith(taskId){
  for(let i in arrayOfTasks){
   if(arrayOfTasks[i].id==taskId){
      arrayOfTasks[i].completed==false ?(arrayOfTasks[i].completed=true):(arrayOfTasks[i].completed=false);
   }
  }
  addDataToLocalStorageFrom(arrayOfTasks);
}