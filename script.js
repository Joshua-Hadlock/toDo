const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

const lists = JSON.parse(localStorage.getItem('lists'));
let currentList = JSON.parse(localStorage.getItem('currentList'));
for (let z = 0; z < lists.length; z++) {
  if (JSON.stringify(lists[z]) === JSON.stringify(currentList)) {
    var currentListIs = z;
    console.log('lets GO!!!');
  };
  console.log(z);
};


// const lists = [
//     {name: 'shopping list',
//         todos: [{text: 'dinosaur nuggets', completed: false},
//                 {text: 'chocolate', completed: false}, 
//                 {text: 'muffins', completed: false}]},
//     {name: 'Honey do list',
//         todos: [{text: 'clean bathrooms', completed: false},
//                 {text: 'clean bedroom', completed: false},
//                 {text: 'feed cats', completed: false},
//                 {text: 'finish blog', completed: false}]}
// ];
// let currentList = [];
// currentList = lists[0];

let listCounter = 0;
let itemCounter = 0;

function save() {
  localStorage.setItem('currentList', JSON.stringify(currentList)); 
  localStorage.setItem('lists', JSON.stringify(lists));
 }


function render() {
    listCounter = 0;
    itemCounter = 0;
    // this will hold the html that will be displayed in the sidebar
    let listsHtml = '<ul class="list-group">';
    // iterate through the lists to get their names
    if (lists.length === 0){
      
      document.getElementById('lists').innerHTML = '';
    document.getElementById('current-list-name').innerText = '';
    document.getElementById('current-list-todos').innerHTML = '';
   } else {
      lists.forEach((list) => {
        listsHtml += `<li class="list-items list-group-item list-color my-2 rounded text-center d-flex justify-content-between align-items-center flex-row" id="listItem"><div><i class="fa-solid fa-trash trash-hover" onclick="deleteList(${listCounter})"></i></div><h4 onclick="changeList(${listCounter})">${list.name}<h4><div></div></li>`;
        listCounter += 1;
      });
      listsHtml += '</ul>';
      // print out the lists
      document.getElementById('lists').innerHTML = listsHtml;
    
      // print out the name of the current list
      document.getElementById('current-list-name').innerText = currentList.name;
    
      // iterate over the todos in the current list
      let todosHtml = '<ul class="list-group-flush">';
      currentList['todos'].forEach((list) => {
        if (currentList['todos'][itemCounter].completed === true) {
          todosHtml += `<li class="list-group-item list-items d-flex justify-content-between"><div><input type='checkbox' class="checkBox" checked onclick="complete(${itemCounter})"> ${list.text}</div><i class="fa-solid fa-trash trash-hover" onclick="deleteToDo(${itemCounter})"></i></li>`;
        } else {
          todosHtml += `<li class="list-group-item list-items d-flex justify-content-between"><div><input type='checkbox' class="checkBox" onclick="complete(${itemCounter})"> ${list.text}</div><i class="fa-solid fa-trash trash-hover" onclick="deleteToDo(${itemCounter})"></i></li>`;
        }
        itemCounter += 1;
      });
      // print out the todos
      document.getElementById('current-list-todos').innerHTML = todosHtml;
      save();
   }};
   

   function addTodo() {
    // get the todo text from the todo input box
    const text = document.getElementById('todo-input-box').value;
    if(text) {
      lists[currentListIs]['todos'].push({
        text: text,
        completed: false
      })
      currentList = lists[currentListIs];
      render();
    }
   };
   
   function addList() {
    const text = document.getElementById('list-input-box').value;
    if(text) {
      lists.push({
        name: text,
        todos: []
      })
      currentList = lists[currentListIs];
      render();
    }
   };

   function changeList(currentListId) {
    currentList = lists[currentListId];
    currentListIs = currentListId;
    render();
   }

  function deleteList(currentListDelete) {
    if (currentList === lists[currentListDelete]) {
      if (lists[currentListDelete + 1]) {
        currentList = lists[currentListDelete + 1];
        console.log('add');
      } else {
        currentList = lists[currentListDelete - 1];
        console.log(currentList);
        console.log('minus');
      }
    }
    lists.splice(currentListDelete, 1);
    
    console.log(lists);
    render();
  }


  function deleteToDo(currentItem) {
    lists[currentListIs].todos.splice(currentItem, 1);
    render();
  }



  function complete(currentItem) {
    if (document.getElementsByClassName('checkBox')[currentItem].checked) {
      lists[currentListIs].todos[currentItem].completed = true;
    } else {
      lists[currentListIs].todos[currentItem].completed = false;
  }}

  function deleteAllToDos() {
    for (let i = 0; i < lists[currentListIs].todos.length; i++) {
      if (lists[currentListIs].todos[i].completed === true) {
        lists[currentListIs].todos.splice(i, 1);
        i -= 1;
      }
    }
    render();
  }

  function noAnimate() {
    document.getElementById('create').style.animationIterationCount = '0';
  }

   render();