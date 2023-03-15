document.addEventListener("DOMContentLoaded", () => {
  let form = document.querySelector('form')
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    buildToDo(e.target.new_task_description.value, e.target.user.value)
    form.reset()
  })
});

let priorities = []
let sortedLiElements = priorities.sort((a, b) => {
  if (b.className === 'high_priority')  {
    return 1
  } else if (b.className === 'low_priority') {
    return -1
  } else if (a.className === 'medium_priority') {
    return 0
  }
})

function buildToDo(todo, user) {
  let li = document.createElement('li')
  let todoTextContainer = document.createElement('span')
  let userTextContainer = document.createElement('span')
  todoTextContainer.className = 'li_text'
  let deleteButton = document.createElement('button')
  let editButton = document.createElement('button')
  deleteButton.textContent = 'X'
  todoTextContainer.textContent = `${todo} --- `
  userTextContainer.textContent = `${user} `
    if (document.querySelector('#dropdown').value === "high_priority") {
      todoTextContainer.style.color = 'red'
      userTextContainer.style.color = 'red'
      li.className = 'high_priority'
      priorities.push(li)
    } else if (document.querySelector('#dropdown').value === "medium_priority") {
      todoTextContainer.style.color = 'orange'
      userTextContainer.style.color = 'orange'
      li.className = 'medium_priority'
      priorities.push(li)
    } else {
      todoTextContainer.style.color = 'green'
      userTextContainer.style.color = 'green'
      li.className = 'low_priority'
      priorities.push(li)
    }
    editButton.addEventListener('click', createNewInputField)
    deleteButton.addEventListener('click', handleDelete)
    editButton.textContent = 'Edit'
    li.appendChild(todoTextContainer)
    li.appendChild(userTextContainer)
    li.appendChild(editButton)
    li.appendChild(deleteButton)
  appendItems(sortedLiElements)
}

function appendItems (sortedLiElements) {
  let ul = document.querySelector('#tasks')
  for (node of sortedLiElements) {
      ul.appendChild(node)
  }
}

function handleDelete(e) {
  e.target.parentNode.remove()
  if (sortedLiElements.includes(e.target.parentNode)) {
    let index = sortedLiElements.indexOf(e.target.parentNode)
    sortedLiElements.splice(index, 1)
  }
}

function createNewInputField(e) {
  e.preventDefault()
  let newForm = document.createElement('form')
  let newItem = document.createElement('input')
  let newButton = document.createElement('input')
  newForm.className = 'new_form'
  newItem.type = 'text'
  newItem.id = 'new_todo'
  newItem.placeholder = `New Item`
  newButton.type = 'submit'
  newButton.value = 'NEW BUTTON'
  newButton.className = 'new_button'
  let li = e.target.parentNode
  li.appendChild(newForm)
  newForm.appendChild(newItem)
  newForm.appendChild(newButton)
  e.target.remove()
  newButton.addEventListener('click', handleEdit)

}

function handleEdit (e) {
  e.preventDefault()
  let todoTextContainer = e.target.parentNode.parentNode.childNodes[0]
  let newText = e.target.parentNode.new_todo.value
  todoTextContainer.textContent = `${newText} --- `
  e.target.parentNode.remove()
}

