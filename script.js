const listsTry = {
    1: {name: 'shopping list',
        todos: [{text: 'dinosaur nuggets', completed: false},
                {text: 'chocolate', completed: false}, 
                {text: 'muffins', completed: false}]},
    2: {name: 'Honey do list',
        todos: [{text: 'clean bathrooms', completed: false},
                {text: 'clean bedroom', completed: false},
                {text: 'feed cats', completed: false},
                {text: 'finish blog', completed: false}]}
};
let currentList = [];
let lists = currentList;

function render() {
    // this will hold the html that will be displayed in the sidebar
    let listsHtml = '<ul class="list-group">';
    // iterate through the lists to get their names
    lists.forEach((list) => {
      listsHtml += `<li class="list-group-item">${list.name}</li>`;
    });
    listsHtml += '</ul>';
    // print out the lists
    document.getElementById('lists').innerHTML = listsHtml;
   
    // print out the name of the current list
    document.getElementById('current-list-name').innerText = currentList.name;
   
    // iterate over the todos in the current list
    let todosHtml = '<ul class="list-group-flush">';
    currentList.forEach((list) => {
      todosHtml += `<li class="list-group-item">${todo.text}</li>`;
    });
    // print out the todos
    document.getElementById('current-list-todos').innerHTML = todosHtml;
   }
   

   function addTodo() {
    // get the todo text from the todo input box
    const text = document.getElementById('todo-input-box').value;
    if(text) {
      currentList.push({
        text: text,
        completed: false
      })
      render();
    }
   };
   