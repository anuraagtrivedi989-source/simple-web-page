const addBtn = document.querySelector("#addbtn");
const addedTaskBtn = document.querySelector("#addedbtn")

const addedTask = document.querySelector(".added-task")
const addTask = document.querySelector(".addTask")

const completedTask = document.querySelector(".completed-task")
const form = document.querySelector("form")

const inputs = document.querySelectorAll("input")

addedTask.addEventListener("click", function (e) {
    if (e.target.matches("button")) {
        removeTask(e.target.closest(".task"));
    }
})


addBtn.addEventListener("click", function (e) {
    e.preventDefault();
    addTask.classList.toggle("taskactivate");

})

function removeTask(val){
    val.remove()
    const tasks = document.querySelectorAll(".task")
    const taskData =Array.from(tasks).map(t=>{
        return{
            title: t.querySelector("h3").innerText,
            description: t.querySelector("h4").innerText
        }
    })
    localStorage.setItem("todoTasks", JSON.stringify(taskData))

}

function clearTaskForm() {
    document.querySelector("#taskname").value = " "
    document.querySelector("#description").value = " "
}


function addTaskinTaskBox(){
         
form.addEventListener("submit", (e) => {
    e.preventDefault()

    const taskName = document.querySelector("#taskname")
    const description = document.querySelector("#description")

    const task = document.createElement("div")

    task.classList.add("task")

    task.innerHTML = `
     <h3>${taskName.value}</h3>
     <h4>${description.value}</h4>
     <button> Delete</delete>
        `
    addedTask.append(task)
    clearTaskForm();
    addTask.classList.remove("taskactivate");

    const tasks = document.querySelectorAll(".task")
    
    const taskData =Array.from(tasks).map(t=>{
        return{
            title: t.querySelector("h3").innerText,
            description: t.querySelector("h4").innerText
        }
    })
    localStorage.setItem("todoTasks", JSON.stringify(taskData))
    console.log(taskData)
})
}
addTaskinTaskBox()

function toDeleteAtask(){

    if(localStorage.getItem("todoTasks")){
    const data = JSON.parse(localStorage.getItem("todoTasks"))
    data.forEach(t=>{
        const task = document.createElement("div")
        task.classList.add("task")

        task.innerHTML = `
        <h3>${t.title}</h3>
        <h4>${t.description}</h4>
        <button>Delete</button>    `
     
        addedTask.appendChild(task)

    })
}}

toDeleteAtask()


addedTaskBtn.addEventListener("click", function (e) {
    e.preventDefault();
    addedTask.classList.toggle("addactive")

})

// remove task 






