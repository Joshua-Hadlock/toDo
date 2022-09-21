const lists = [
    {name: 'shopping list',
        todos: [{text: 'dinosaur nuggets', completed: false},
                {text: 'chocolate', completed: false}, 
                {text: 'muffins', completed: false}]},
    {name: 'Honey do list',
        todos: [{text: 'clean bathrooms', completed: false},
                {text: 'clean bedroom', completed: false},
                {text: 'feed cats', completed: false},
                {text: 'finish blog', completed: false}]}
];
let currentList = [];
currentList = lists[0];

let listCounter = 0;
let currentListIs = 0;

function render() {
    listCounter = 0;
    // this will hold the html that will be displayed in the sidebar
    let listsHtml = '<ul class="list-group">';
    // iterate through the lists to get their names
    lists.forEach((list) => {
      listsHtml += `<li class="list-group-item bg-secondary my-2 rounded text-center d-flex justify-content-between align-items-center" onclick="changeList(${listCounter})"><i class="fa-solid fa-trash trash-hover" onclick="deleteList(${listCounter})"></i><h4>${list.name}<h4></li>`;
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
      todosHtml += `<li class="list-group-item"><input type='checkbox' class="checkBox"> ${list.text}</li>`;
    });
    // print out the todos
    document.getElementById('current-list-todos').innerHTML = todosHtml;
   }
   

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
    if (lists[currentListDelete] === currentList) {
      if (lists[currentListDelete + 1] <= lists.length) {
        currentList = lists[currentListDelete + 1];
      } else if (lists[currentListDelete - 1] < lists.length) {
        currentList = lists[currentListDelete - 1];
      } else {
        alert('You must have at least one list');
      }
    }
    if (currentListDelete === 0) {
      lists.shift();
    } else {
      lists.splice(currentListDelete);
    }
    render();
  }



   render();