let newTask = document.forms["input_task"]["new_task"];
let addTask = document.forms["input_task"]["add_task"];
let ul = document.querySelector('ul');
//let bodyTag = document.body;
let clearTasks = document.querySelector('#clear-tasks');

//bodyTag.addEventListener("load", refreshList);
addTask.addEventListener('click', add_Task);
clearTasks.addEventListener('click', clearTaskList);

function add_Task(e)
{
    // let li = document.createElement('li');
    // let taskText = document.createTextNode(newTask.value);
    // li.appendChild(taskText);
  //  console.log("Event type "+ e.type);
    let li = createTaskLI(newTask.value)
    ul.appendChild(li);
    
    /* storing data to local storage */
    let task = newTask.value;
    let tasks = [];

    if(localStorage.getItem("taskList") !== null)
        tasks = JSON.parse(localStorage.getItem("taskList"));
    
    alert(task);
    tasks.push(task);

    localStorage.setItem("taskList", JSON.stringify(tasks));

    /* Empty text field */
    newTask.value = "";

   // e.preventDefault();

}

// Create <li></li> element with task from input field
function createTaskLI(text)
{
    let li = document.createElement('li');
    let taskText = document.createTextNode(text);
    li.appendChild(taskText);
    li.className = "list";

    let delBtn = document.createElement('button');
    delBtn.appendChild(document.createTextNode("x"));
    delBtn.className = "del";
    delBtn.addEventListener('click', removeTask);

    li.appendChild(delBtn);

    return li;
}

function refreshList(e)
{
    //alert("Going to refresh the list");
    let tasks = JSON.parse(localStorage.getItem("taskList"));

    tasks.forEach(function(task){
        let li = createTaskLI(task);
        //console.log(li);
        ul.appendChild(li);
    });
    //e.preventDefault();
}

function clearTaskList(e)
{
    let res = confirm("This will clear all task list");
    if(res === true)
    {
        localStorage.clear();
        document.location.reload(); // reload the page
    }
}

function removeTask(e)
{
    let li = e.target.parentElement;
    let removeTask = li.firstChild; //return the task to remove as object
    //console.log(removeTask.textContent);
    
    let allTasks = JSON.parse(localStorage.getItem("taskList"));

     allTasks.forEach(function(task, index){
        if(task == removeTask.textContent)
        {
            allTasks.splice(index,1);
            //alert(allTasks);
            localStorage.setItem("taskList", JSON.stringify(allTasks));
            return;
        }
    });

    li.remove();
}