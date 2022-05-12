//SECLECTORS
const todoInput = document.querySelector(".todoInput");
const todoBtn = document.querySelector(".todoBtn");
const todoList = document.querySelector(".todoList");
const filterOption = document.querySelector(".filterTodo");
//EVENT LISTENER
todoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo)

//FUNCTIONS

function addTodo(event){
    //this prevents the browser from refreshing
    event.preventDefault();
    //todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todoItem");
    todoDiv.appendChild(newTodo);
    //check btn
    const checkBtn = document.createElement("button");
    checkBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    checkBtn.classList.add("toCheckBtn");
    todoDiv.appendChild(checkBtn);
    //delete Btn
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
    deleteBtn.classList.add("toDeleteBtn");
    todoDiv.appendChild(deleteBtn);
    //append todo list
    todoList.appendChild(todoDiv);
    //clear input value
    todoInput.value = "";
}

function deleteCheck(e){
    const item = e.target;
    //delete todo
    if(item.classList[0] === "toDeleteBtn"){
        const todo = item.parentElement;
        //animation
        todo.classList.add("fall");
        todo.addEventListener("transitionend", function(){
            todo.remove();
        })

    }
    //check todo
    if(item.classList[0] === "toCheckBtn"){
        const todo = item.parentElement;
        todo.classList.toggle("checked");
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;

            case "completed":
            if(todo.classList.contains("checked")){
                todo.style.display = "flex";
            }
            else{
                todo.style.display = "none";
            }
            break;

            case "uncompleted":
                if(!todo.classList.contains("checked")){
                    todo.style.display = "flex";
                }
                else{
                    todo.style.display = "none";
                }
                break;
        }
        
    });
}
//done for now! Congrats and keep practicing!