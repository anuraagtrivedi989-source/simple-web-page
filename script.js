// const { createElement } = require("react");

const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");

const tasks = document.querySelectorAll(".task");

const addTaskbutton = document.querySelector("#add-new-task")
const taskData = {};
const columns = [todo, progress, done];

// to delete a task 
function deleteTask(val){


    val.remove()

        columns.forEach(col => {
            const tasks = col.querySelectorAll(".task")
            const count = col.querySelector(".right");


            taskData[col.id] = Array.from(tasks).map(t => {
                return {
                    title: t.querySelector("h2").innerText,
                    description: t.querySelector("p").innerText
                }
            })
           localStorage.setItem("tasks", JSON.stringify(taskData))
            console.log(taskData)
            count.innerText = tasks.length
        })


}

if (localStorage.getItem("tasks")) {
    const data = JSON.parse(localStorage.getItem("tasks"));
    for (const col in data) {
        const column = document.querySelector(`#${col}`)

        data[col].forEach(task => {
            const div = document.createElement("div");
            div.classList.add("task");
            div.setAttribute("draggable", "true")

            div.innerHTML = `<h2>${task.title}</h2>
                            <p> ${task.description} </p>
                            <button>Delete Task</button>
            `
           

            const deleteButton = div.querySelector("button");

            deleteButton.addEventListener("click", () => {
                deleteTask(div);
            });
              
            column.appendChild(div)

            div.addEventListener("drag", (e) => {
                dragElement = div;
            })
        })
    }
}

let draggedItem = null;

tasks.forEach(task => {
    task.addEventListener("drag", (e) => {
        dragElement = task;
    })
})


function dragEventsOnColumn(column) {
    column.addEventListener("dragenter", (e) => {
        e.preventDefault();
        column.classList.add("hover-over");
    })
    column.addEventListener("dragleave", (e) => {
        e.preventDefault();
        column.classList.remove("hover-over");
    })
    column.addEventListener("dragover", (e) => {
        e.preventDefault();
    })
    column.addEventListener("drop", (e) => {
        e.preventDefault();

        column.appendChild(dragElement);
        column.classList.remove("hover-over");

        columns.forEach(col => {
            const tasks = col.querySelectorAll(".task")
            const count = col.querySelector(".right");


            taskData[col.id] = Array.from(tasks).map(t => {
                return {
                    title: t.querySelector("h2").innerText,
                    description: t.querySelector("p").innerText
                }
            })
           localStorage.setItem("tasks", JSON.stringify(taskData))
            console.log(taskData)
            count.innerText = tasks.length
        })     
    })
}
dragEventsOnColumn(todo);
dragEventsOnColumn(progress);
dragEventsOnColumn(done);


// modall related logic
const toggleModalButton = document.querySelector("#toggle-modal");
const modal = document.querySelector(".modal");

const bg = document.querySelector(".modal .bg")

toggleModalButton.addEventListener("click", (e) => {
    modal.classList.toggle("active")
})
bg.addEventListener("click", (e) => {
    modal.classList.remove("active")
})

// clear task form
function clearTaskForm(){
    document.querySelector("#task-title").value =" ";
     document.querySelector("#task-description").value=" ";
}

// add new task

addTaskbutton.addEventListener("click", (e) => {
    const taskTitle = document.querySelector("#task-title").value;
    const description = document.querySelector("#task-description").value;

    const div = document.createElement("div")

    div.classList.add("task");
    div.setAttribute("draggable", "true")

    div.innerHTML = `
    <h2>${taskTitle}</h2>
    <p>${description}</p>
    <button>Delete Task </button>
    `
    const deleteButton = div.querySelector("button");

    deleteButton.addEventListener("click", () => {
        deleteTask(div);
    });

    todo.appendChild(div);
    columns.forEach(col => {
        const tasks = col.querySelectorAll(".task")
        const count = col.querySelector(".right");

        taskData[col.id] = Array.from(tasks).map(t => {
            return {
                title: t.querySelector("h2").innerText,
                description: t.querySelector("p").innerText
            }
        })
        localStorage.setItem("tasks", JSON.stringify(taskData))
        console.log(taskData)
        count.innerText = tasks.length
    })
    div.addEventListener("drag", (e) => {
        dragElement = div;
    })
    clearTaskForm();
    modal.classList.remove("active")
})
