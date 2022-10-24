const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

const lists = JSON.parse(localStorage.getItem('lists'));
let currentList = JSON.parse(localStorage.getItem('currentList'));

if (lists === false) {
  lists = [
    {name: 'WELCOME!',
    todos: [{text: 'to start, click the button below'}, completed: false]}
  ];
  currentListIs = 0;
  currentList = lists[0]
}

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
// var currentListIs = 0;


// let currentList = [];
// currentList = lists[0];

let listCounter = 0;
let itemCounter = 0;
let edit = 0;
let filteredList = [];
let currentListNotDeclared = true;

function save() {
  localStorage.setItem('currentList', JSON.stringify(currentList)); 
  localStorage.setItem('lists', JSON.stringify(lists));
 }


function render() {
  if (currentListNotDeclared) {
    currentList = lists[currentListIs];
  }
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
        listsHtml += `<li class="list-items list-group-item list-color my-2 rounded text-center d-flex justify-content-between align-items-center flex-row" id="listItem"><div><i class="fa-solid fa-trash trash-hover" onclick="deleteList(${listCounter})"></i></div><h4 onclick="changeList(${listCounter})" class="text-break">${list.name}<h4><div></div></li>`;
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
          todosHtml += `<li class="list-group-item item-todo list-items d-flex justify-content-between"><div><input type='checkbox' class="checkBox" checked onclick="complete(${itemCounter})"> ${list.text}</div><div class="d-flex between"><i class="fa-solid fa-pen-to-square trash-hover" onclick='editListNumber(${itemCounter})' data-bs-toggle="modal" data-bs-target="#editModal"></i><i class="fa-solid fa-trash trash-hover" onclick="deleteToDo(${itemCounter})"></i></div></li>`;
        } else {
          todosHtml += `<li class="list-group-item item-todo list-items d-flex justify-content-between"><div><input type='checkbox' class="checkBox" onclick="complete(${itemCounter})"> ${list.text}</div><div class="d-flex between"><i class="fa-solid fa-pen-to-square trash-hover" onclick='editListNumber(${itemCounter})' data-bs-toggle="modal" data-bs-target="#editModal"></i><i class="fa-solid fa-trash trash-hover" onclick="deleteToDo(${itemCounter})"></i></div></li>`;
        }
        itemCounter += 1;
      });
      // print out the todos
      document.getElementById('current-list-todos').innerHTML = todosHtml;
      save();
      currentListNotDeclared = true;
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
    currentListIs = currentListId;
    render();
   }

  function deleteList(currentListDelete) {
    console.log(currentListDelete);
    if (currentList === lists[currentListDelete]) {
      if (lists[currentListDelete + 1]) {
        currentList = lists[currentListDelete + 1];
        currentListIs = currentList += 1;
        console.log('add');
      } else {
        currentList = lists[currentListDelete - 1];
        currentListIs -= 1;
        console.log(currentList);
        console.log('minus');
      }
    }
    console.log(currentListDelete)
    document.getElementsByClassName('list-group-item')[currentListDelete + 1].classList.add('animate__animated');
    document.getElementsByClassName('list-group-item')[currentListDelete + 1].classList.add('animate__fadeOutRight');
    setTimeout(function(){
      lists.splice(currentListDelete, 1);
      render();
    }, 1000)
    
    
    
  }


  function deleteToDo(currentItem) {
    document.getElementsByClassName('item-todo')[currentItem].classList.add('animate__animated');
    document.getElementsByClassName('item-todo')[currentItem].classList.add('animate__fadeOutRight');
    setTimeout(function(){
      lists[currentListIs].todos.splice(currentItem, 1);
      render();
  }, 1000);
  }



  function complete(currentItem) {
    if (document.getElementsByClassName('checkBox')[currentItem].checked) {
      lists[currentListIs].todos[currentItem].completed = true;
      currentList.todos[currentItem].completed = true;
    } else {
      lists[currentListIs].todos[currentItem].completed = false;
      currentList.todos[currentItem].completed = false;
    }
  render();
}

  function deleteAllToDos() {
    for (let i = 0; i < lists[currentListIs].todos.length; i++) {
      if (lists[currentListIs].todos[i].completed === true) {
        document.getElementsByClassName('item-todo')[i].classList.add('animate__animated');
        document.getElementsByClassName('item-todo')[i].classList.add('animate__fadeOutRight');
      }}
    for (let i = 0; i < lists[currentListIs].todos.length; i++) {
      if (lists[currentListIs].todos[i].completed === true) {
        lists[currentListIs].todos.splice(i, 1);
        i -= 1;
      }
    }
    setTimeout(function(){
      render();
    }, 1000)
  }

  function noAnimate() {
    document.getElementById('create').style.animationIterationCount = '0';
  }



  function editListNumber(number) {
    edit = number;
  }
  function editList() {
    lists[currentListIs].todos[edit].text = document.getElementById('edit-input-box').value;
    render()
  }





  function compare(comparingValue) {
    filteredList = lists;
    if (comparingValue != '') {
      filteredList = [];
      for (let i = 0; i < lists.length; i++) {
        if (lists[i].name.includes(comparingValue)) {
          filteredList.push(lists[i]);
        }
    }}
    document.getElementById('deleteAllToDosIcon').classList.add('invisible');
    document.getElementById('create').classList.add('invisible');
    renderOnlyLists()
  }

  
  function renderOnlyLists() {
    listCounter = 0;
    // this will hold the html that will be displayed in the sidebar
    let listsHtml = '<ul class="list-group">';
    // iterate through the lists to get their names
    if (lists.length === 0){
      
      document.getElementById('lists').innerHTML = '';
    document.getElementById('current-list-name').innerText = '';
    document.getElementById('current-list-todos').innerHTML = '';
   } else {
      filteredList.forEach((list) => {
        listsHtml += `<li class="list-items list-group-item list-color my-2 rounded text-center d-flex justify-content-between align-items-center flex-row" id="listItem"><div></div><h4 onclick="filteredChangeList(${listCounter})" class="text-break">${list.name}<h4><div></div></li>`;
        listCounter += 1;
      });
      listsHtml += '</ul>';
      // print out the lists
      document.getElementById('lists').innerHTML = listsHtml;
    
      // print out the name of the current list
      document.getElementById('current-list-name').innerText = currentList.name;
  }
  document.getElementById('current-list-name').innerText = '';
  document.getElementById('current-list-todos').innerHTML = '';
}

  function filteredChangeList(number) {
    currentList = filteredList[number];
    currentListNotDeclared = false;
    document.getElementById('deleteAllToDosIcon').classList.remove('invisible');
    document.getElementById('create').classList.remove('invisible');
    render();
    for (let z = 0; z < lists.length; z++) {
      if (JSON.stringify(lists[z]) === JSON.stringify(currentList)) {
        currentListIs = z;
      };
  }};
   render();