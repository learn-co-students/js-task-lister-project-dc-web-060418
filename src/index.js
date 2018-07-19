

document.addEventListener('DOMContentLoaded', () => {
  // your solution here
  // grab DOM elements
  const listDiv = document.getElementById("app-content");
  
  const TaskLister = new createTaskLister()
  const List = new createList()
  const Task = new createTask()

  const app = new TaskLister()
  setFormEventListeners()

  function newList(e) {
   
    e.preventDefault()
    const listTitleInput = document.querySelector("#new-list-title")
    newList = new List(listTitleInput.value)
    listTitleInput.value = ""
    app.addList(newList)
    if (!app.listInitialized) {
      showTaskForm()
      app.listInitialized = true
    }else{
      updateListSelector()
    }
    renderTaskList()
  }
  function setFormEventListeners() {
    const form = document.querySelector("#create-list-form")
    form.addEventListener("submit", newList)
  }
  function showTaskForm() {
    const newListForm = document.createElement("form")
    newListForm.id = "new-list-form"
    newListForm.innerHTML = `
          <label for="parent-list">Select List:</label>
          <select id="parent-list">
          </select>

          <label for="new-task-description">Task description:</label>
          <input required="" type="text" id="new-task-description" placeholder="description">

          <label for="new-task-priority">Priority level:</label>
          <input type="text" id="new-task-priority" placeholder="priority">
          <input type="submit" value="Create New Task">
        `
   
    listDiv.appendChild(newListForm)
    const listsDiv = document.createElement('div')
    listsDiv.id = "lists"
    listDiv.appendChild(listsDiv)
    updateListSelector()
    newListForm.addEventListener("submit", (e)=>{
      e.preventDefault()
      const listId = document.querySelector("select").value
      const list = app.lists.find((el) => (el.id == listId))
      const taskDescription = document.querySelector('#new-task-description')
      const taskPriority = document.querySelector('#new-task-priority')
      const newTask = new Task(taskDescription.value,taskPriority.value, list)
      taskDescription.value = ""
      taskPriority.value = ""
      
      list.addTask(newTask)
      renderList(list, document.querySelector(`#list-${list.id}`))
    })
  }

  function updateListSelector(){
    const selector = document.querySelector('select')
    //clear any past selectors
    while (selector.firstChild) {
      selector.removeChild(selector.firstChild);
    }
    // create and append new selector options
    app.lists.forEach((list)=>{
      let option = document.createElement("option")
      option.value = list.id
      option.innerText = list.title
      selector.appendChild(option)
    })
    
  }
  function renderTaskList() {
    const listsDiv = document.querySelector('#lists')
    while (listsDiv.firstChild) {
      listsDiv.removeChild(listsDiv.firstChild);
    }
    app.lists.forEach((list)=>{
      let listDiv = document.createElement("div")
      listDiv.id = `list-${list.id}`
      listsDiv.appendChild(listDiv)
      renderList(list,listDiv)
    })
  }

  function renderList(list, listDiv) {
    while (listDiv.firstChild) {
      listDiv.removeChild(listDiv.firstChild);
    }
    const listTitle = document.createElement("h2")
    listTitle.innerText = list.title
    listDiv.appendChild(listTitle)
    const deleteListButton = document.createElement('button')
    deleteListButton.innerText="x"
    listTitle.appendChild(deleteListButton)
    deleteListButton.addEventListener("click",(e)=>{
      e.stopPropagation()
      app.removeList(list)
      if (app.lists.length === 0) {
        document.querySelector("#new-list-form").remove()
        document.querySelector("#lists").remove()
        app.listsInitialized = false
      }else{
      renderTaskList()
      updateListSelector()
      }
    })
    const taskList = document.createElement('ul')
    listDiv.appendChild(taskList)
    list.tasks.forEach((task)=>{
      renderTask(task,taskList)
    })
  }

  function renderTask(task, taskList) {
    const taskListItem = document.createElement("li")
    taskListItem.appendChild(document.createTextNode(`Task: ${task.description}`))
    taskListItem.id=`task-${task.id}`
    const deleteTaskButton = document.createElement("button")
    deleteTaskButton.innerText = "x"
    deleteTaskButton.addEventListener("click",(e)=>{
      e.stopPropagation()
      let list = task.list
      list.removeTask(task)
      renderList(list, document.querySelector(`#list-${list.id}`))
    })
    
    taskListItem.appendChild(deleteTaskButton)
    taskListItem.appendChild(document.createElement("br"))
    taskListItem.appendChild(document.createTextNode(`Priority: ${task.priority}`))
    taskList.appendChild(taskListItem)

  }

});

