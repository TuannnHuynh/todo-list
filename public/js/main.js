
const todos = [
    {
        id: 1,
        content: "Hang out with GF"
    },
    {
        id: 2,
        content: "Do homework"
    }
]
let flag = false
let item = {}
renderTodo(todos)

$(".btn-add").on("click",function(e){
    e.preventDefault()
    let val = $("#todo-input").val()
    if(val === ""){
        alert("Enter your task !")
        return
    }
    if(flag){
        todos[item.id - 1].content = $("#todo-input").val()
        $("#todo-input").val("")
        $(".btn-add").html(`<i class="fa-solid fa-plus"></i>ADD`)
        $(".btn-add").removeAttr('style')
        renderTodo(todos)
        flag = false
        return
    }
    todos.push({
        id: todos.length + 1,
        content: val
    })
    $("#todo-input").val("")
    renderTodo(todos)
    return
})

$(".todo-list").on("click","button",function(e){
    e.preventDefault()
    const btnDelete = $(e.target).parent(".btn-delete")[0]
    const btnEdit = $(e.target).parent(".btn-edit")[0]
    if(btnDelete){
        const id = $(btnDelete).data("id")
        const idx = todos.findIndex((val) => val.id === +id)
        todos.splice(idx,1)
        renderTodo(todos)
        return
    }
    if(btnEdit){
        const id = $(btnEdit).data("id")
        item = todos.find((val) => val.id === +id)
        $("#todo-input").val(item.content)
        $(".btn-add").html(`<i class="fa-solid fa-plus"></i>UPDATE`)
        $(".btn-add").css({"width": "25%"})
        flag = true
        return
    }
    
})

function renderTodo(todos){
    let str = ""
    for(todo of todos){
        str += `
            <li>
                ${todo.content}
                <div class="actions">
                    <button data-id=${todo.id} class="btn-edit"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button data-id=${todo.id} class="btn-delete"><i class="fa-solid fa-trash-can"></i></button>
                </div>
            </li>
        `
    }
    $(".todo-list").html(str)
}