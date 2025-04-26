const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo-input');
const todoListUL = document.getElementById('todo-list');

let allTodos = getTodos();
updateTodoList();

todoForm.addEventListener('submit', function(e){
    e.preventDefault();
    addTodo();
})

function addTodo(){
    const todoText = todoInput.value.trim();
    if(todoText.length > 0){
        const todoObject = {
            text: todoText,
            completed: false
        }
        allTodos.push(todoObject);
        updateTodoList();
        saveTodos();
        todoInput.value ="";
    }
}

function updateTodoList(){
    todoListUL.innerHTML="";
    allTodos.forEach((todo, todoIndex)=>{
        todoItem=createTodoItem(todo, todoIndex);
        todoListUL.append(todoItem);
    })
}

function createTodoItem(todo, todoIndex){
    const todoId ="todo-"+todoIndex;
    const todoLi = document.createElement('li');
    const todoText = todo.text;
    todoLi.className="todo";
    todoLi.innerHTML=`
    <input type="checkbox" id="${todoId}">
    <label for="${todoId}" class="custom-checkbox">
        <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"/></svg>
    </label>
    <label for="${todoId}" class="todo-text">
       ${todoText}
    </label>
    <button class="delete-button">
        <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"/>
            <path d="M9 10h2v8H9zm4 0h2v8h-2z"/></svg>
    </button>
    `
    const deleteButton = todoLi.querySelector(".delete-button");
    deleteButton.addEventListener("click", ()=>{
        deleteTodoItems(todoIndex);
    })
    const checkbox = todoLi.querySelector("input");
    checkbox.addEventListener("change", ()=>{
        allTodos[todoIndex].completed = checkbox.checked;
        saveTodos();
    })
    checkbox.checked = todo.completed;
    return todoLi;
}
function deleteTodoItems(todoIndex){
    allTodos = allTodos.filter((_, i)=> i !== todoIndex);
    saveTodos();
    updateTodoList();
}
function saveTodos(){
    const todosJson = JSON.stringify(allTodos);
    localStorage.setItem("todos",todosJson);
}
function getTodos(){
    const todos = localStorage.getItem("todos") || "[]";
    return JSON.parse(todos);
}
