const inputValue = document.querySelector("#inputValue");
const maintodoElem = document.querySelector(".todo-lists-elem");

// Getting data form local Storage
let getTodoListFromLocal = () => {
   return JSON.parse(localStorage.getItem('MyList'));
}
let localTodoList = getTodoListFromLocal() || [];


// Deleteing Data
const addTodoListAgain = (localTodoList) => {
   return localStorage.setItem('MyList', JSON.stringify(localTodoList));
}


// Recalling from Local Storage
const addTodoListFromLocal = (curElem) => {

   const newDiv = document.createElement('div');
   newDiv.classList.add('parent_div');
   newDiv.innerHTML = `<div class="main_todo_div"><li>${curElem}</li><button class="deleteBtn">del</button></div>`;
   maintodoElem.append(newDiv);
}

const AddTodoList = (e) => {
   e.preventDefault();

   const todoListValue = inputValue.value.trim();
   inputValue.value = '';

   if (!localTodoList.includes(todoListValue) && todoListValue !== "") {
      localTodoList.push(todoListValue);
      localTodoList = [...new Set(localTodoList)]
      localStorage.setItem('MyList', JSON.stringify(localTodoList));

      addTodoListFromLocal(todoListValue);
   }
}

const showTodoList = () => {
   localTodoList.forEach((curElem) => {
      addTodoListFromLocal(curElem);
   });
}
showTodoList();


// Delete Button
const removeTodoList = (e) => {
   const Toremove = e.target;
   const ReturnRemove = Toremove.previousElementSibling.innerText;
   const parentElem = Toremove.parentElement;

   localTodoList = localTodoList.filter((curTodo) => {
      return curTodo !== ReturnRemove;
   });

   addTodoListAgain(localTodoList);
   parentElem.remove();

   console.log(localTodoList);
}

maintodoElem.addEventListener('click', (e) => {
   e.preventDefault();
   removeTodoList(e);
});

document.querySelector(".Btn").addEventListener('click', (e) => {
   AddTodoList(e)
});