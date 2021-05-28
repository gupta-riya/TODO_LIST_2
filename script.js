
let taskArr = [];


let allTasks = document.querySelector(".all-tasks");
let addBtn = document.querySelector(".add-container");
let completeTab = document.querySelector(".completed-task-container");
let allTaskTab = document.querySelector(".task-list-container");

if (localStorage.getItem("allTask")) {
    taskArr = JSON.parse(localStorage.getItem("allTask"));

    for (let i = 0; i < taskArr.length; i++) {
        let { task, id , completed } = taskArr[i];
        if(completed==false)
        createTask(task , id);
    }
}





addBtn.addEventListener("click",function(){

    let numOfTasks = taskArr.length;
    let lastNum;
    if(numOfTasks >= 1)
    {
        lastNum = taskArr[numOfTasks-1].id;
        lastNum = Number(lastNum);
    }
    else
    {
        lastNum = 0;
    }
    
    let taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    taskDiv.setAttribute("num", `${lastNum+1}`);
    
    taskDiv.innerHTML = `
    <img src="icon/check.png" class = "check-button" alt="">
    <div class="task-text" contenteditable = "true"></div>
    <img src="icon/clear.png" class = "delete-button" alt="">`;

    
    allTasks.append(taskDiv);
    let obj = {"task": "" , "id":`${lastNum+1}` , "completed": false};
    taskArr.push(obj);
    let finalArr = JSON.stringify(taskArr);
    localStorage.setItem("allTask", finalArr);

    let inputText = taskDiv.children[1];

    inputText.addEventListener("keydown",function(e)
    {
        if(e.key=="Enter")
        {
            e.target.blur();
            inputTaskEvent(e.target.parentNode);
            

        }
    })



    let deleteBtn = taskDiv.children[2];
    
    deleteBtn.addEventListener("click",function(e)
    {
        let parentTask = e.target.parentNode;
        console.log(e.target);
        deleteTaskEvent(e.target.parentNode);
        parentTask.remove();
    });


    let checkBtn = taskDiv.children[0];
    checkBtn.addEventListener("click",function(e){
        let parentTask = e.target.parentNode;
        addToCompleteList(parentTask);

    })

})



function createTask(task , id)
{
    let taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    taskDiv.setAttribute("num", `${id}`);
    
    taskDiv.innerHTML = `
    <img src="icon/check.png" class = "check-button" alt="">
    <div class="task-text" contenteditable = "true">${task}</div>
    <img src="icon/clear.png" class = "delete-button" alt="">`;

    
    allTasks.append(taskDiv);
    let inputText = taskDiv.children[1];

    inputText.addEventListener("keydown",function(e)
    {
        if(e.key=="Enter")
        {
            e.target.blur();
            inputTaskEvent(e.target.parentNode);
            

        }
    })



    let deleteBtn = taskDiv.children[2];
    
    deleteBtn.addEventListener("click",function(e)
    {
        let parentTask = e.target.parentNode;
        console.log(e.target);
        deleteTaskEvent(e.target.parentNode);
        parentTask.remove();
    });

    let checkBtn = taskDiv.children[0];
    checkBtn.addEventListener("click",function(e){
        let parentTask = e.target.parentNode;
        addToCompleteList(parentTask);

    })
}

function inputTaskEvent(taskDiv)
{
    let text = taskDiv.children[1].innerText;
    let numAttr = taskDiv.getAttribute("num");
    let idx = 0;
    for(let i = 0  ; i < taskArr.length ; i++)
    {
        if(numAttr==taskArr[i].id)
        {
            idx = i;
            console.log(idx);
            break;
        }
    }

    taskArr[idx].task = text;
    let finalArr = JSON.stringify(taskArr);
    localStorage.setItem("allTask", finalArr);
}

function deleteTaskEvent(taskDiv)
{

    let numAttr = taskDiv.getAttribute("num");
    let idx = 0;
    for(let i = 0  ; i < taskArr.length ; i++)
    {
        if(numAttr==taskArr[i].id)
        {
            idx = i;
            console.log(idx);
            break;
        }
    }

    taskArr.splice(idx,1);
    let finalArr = JSON.stringify(taskArr);
    localStorage.setItem("allTask", finalArr);
}

function addToCompleteList(taskDiv)
{
    let numAttr = taskDiv.getAttribute("num");
    let idx = 0;
    for(let i = 0  ; i < taskArr.length ; i++)
    {
        if(numAttr==taskArr[i].id)
        {
            idx = i;
            console.log(idx);
            break;
        }
    }

    taskArr[idx].completed = true;
    let finalArr = JSON.stringify(taskArr);
    localStorage.setItem("allTask", finalArr);
    taskDiv.remove();
}


completeTab.addEventListener("click",function(){

    allTaskTab.classList.remove("active");
    completeTab.classList.add("active");
    allTasks.innerHTML=``;
    if (localStorage.getItem("allTask")) {
        taskArr = JSON.parse(localStorage.getItem("allTask"));
    
        for (let i = 0; i < taskArr.length; i++) {
            let { task, id , completed } = taskArr[i];
            if(completed==true)
            createCompletedTask(task , id);
        }
    }
    addBtn.style.opacity = 0;
})


function createCompletedTask(task , id)
{
    
    let taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    taskDiv.setAttribute("num", `${id}`);
    
    taskDiv.innerHTML = `
    
    <div class="task-text" contenteditable = "false"><span >${task}</span></div>
    <img src="icon/clear.png" class = "delete-button" alt="">`;

    
    allTasks.append(taskDiv);
   

    let deleteBtn = taskDiv.children[1];
    deleteBtn.addEventListener("click",function(e)
    {
        let parentTask = e.target.parentNode;
        console.log(e.target);
        deleteTaskEvent(e.target.parentNode);
        parentTask.remove();
    });

}


allTaskTab.addEventListener("click",function(){

    allTaskTab.classList.add("active");
    completeTab.classList.remove("active");
    allTasks.innerHTML=``;
    addBtn.style.opacity = 1;
    if (localStorage.getItem("allTask")) {
        taskArr = JSON.parse(localStorage.getItem("allTask"));
    
        for (let i = 0; i < taskArr.length; i++) {
            let { task, id , completed } = taskArr[i];
            if(completed==false)
            createTask(task , id);
        }
    }
})