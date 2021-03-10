let addTodoBtn = document.querySelector('.add-todo'), 
    textInput = document.querySelector('.text-input'), 
    todoListWrap = document.querySelector('.todo-list-wrapper'), 
    removeBtn = document.querySelector('.todoList-li'),
    mainWrapper = document.querySelector('.wrapper');

document.addEventListener('DOMContentLoaded', retrieveTodo)
addTodoBtn.addEventListener('click', addTodo);
todoListWrap.addEventListener('click', removeTodo);

// Add todos to DOM
function addTodo(e){
    e.preventDefault();
    if(textInput.value){
        let createLi = document.createElement('li');
        createLi.classList.add('todoList-li');
        createLi.innerHTML = (`<div class="todo-text">${textInput.value} </div>
                                <div class="btn-wrap">
                                    <button class="remove-btn"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
                                </div>`);
        todoListWrap.append(createLi);
        saveTodosLocal(textInput.value);
        textInput.value = "";
        textInput.focus();
    }else{
        mainWrapper.classList.add('wiggle');
        setTimeout(function(){
            mainWrapper.classList.remove('wiggle');
        }, 700)
    }
}

// Remove todos from DOM
function removeTodo(e){
    e.preventDefault();
    let eTarget = e.target;
    if(eTarget.classList[0] === 'remove-btn'){
        let eParent = eTarget.parentElement.parentElement;
        let thisTodoText = eParent.children[0];
        removeLocalTodo(thisTodoText.innerText);
        eParent.classList.add('slideRight');
        eParent.addEventListener('transitionend', function(){
            eParent.remove();
        });
    }
}

// Save todos to localstorage
function saveTodosLocal(todo){
    let todoList;
    localStorage.getItem('todoList') === null ? todoList = [] : todoList = JSON.parse(localStorage.getItem('todoList'));
    
    todoList.push(todo);
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

function retrieveTodo(){
    let todoList;
    localStorage.getItem('todoList') === null ? todoList = [] : todoList = JSON.parse(localStorage.getItem('todoList'));
    todoList.forEach(function(todo){
        let createLi = document.createElement('li');
        createLi.classList.add('todoList-li');
        createLi.innerHTML = (`<div class="todo-text">${todo} </div>
                                <div class="btn-wrap">
                                    <button class="remove-btn"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
                                </div>`);
        todoListWrap.append(createLi);
    });
    textInput.focus();
}

// Remove todos from localstorage
function removeLocalTodo(todoItem){
    let todoList;
    localStorage.getItem('todoList') === null ? todoList = [] : todoList = JSON.parse(localStorage.getItem('todoList'));
    todoList.splice(todoList.indexOf(todoItem), 1);
    localStorage.setItem('todoList', JSON.stringify(todoList));
}


