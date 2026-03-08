const API_URL = "/api/tasks"

document.addEventListener("DOMContentLoaded", () => {
    loadTasks()
})

async function loadTasks() {
    try{
        const res = await fetch(API_URL)
        const tasks = await res.json()

        document.getElementById("todo").innerHTML = ""
        document.getElementById("doing").innerHTML = ""
        document.getElementById("done").innerHTML = ""

        tasks.forEach(task => {

            const div = document.createElement("div")
            div.className = "task"

            div.innerHTML = `
                <strong>${task.title}</strong><br>
                <button onclick="updateStatus(${task.id}, 'TODO')">TODO</button>
                <button onclick="updateStatus(${task.id}, 'DOING')">DOING</button>
                <button onclick="updateStatus(${task.id}, 'DONE')">DONE</button>
                <button onclick="deleteTask(${task.id})">削除</button>
            `

            if(task.status === "TODO"){
                document.getElementById("todo").appendChild(div)
            }
            else if(task.status === "DOING"){
                document.getElementById("doing").appendChild(div)
            }
            else{
                document.getElementById("done").appendChild(div)
            }

        })

    }catch(err){
        console.error("タスク取得エラー", err)
    }
}

async function createTask(){

    const input = document.getElementById("task-input")
    const title = input.value.trim()

    if(title === "") return

    try{

        await fetch(API_URL,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                title:title
            })
        })

        input.value = ""

        loadTasks()

    }catch(err){
        console.error("タスク作成エラー", err)
    }
}

async function updateStatus(id, status){

    try{

        await fetch(`${API_URL}/${id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                status:status
            })
        })

        loadTasks()

    }catch(err){
        console.error("更新エラー", err)
    }
}

async function deleteTask(id){

    try{

        await fetch(`${API_URL}/${id}`,{
            method:"DELETE"
        })

        loadTasks()

    }catch(err){
        console.error("削除エラー", err)
    }
}
