function createList() {
  let ListId = 0
  return class {
    constructor(title){
      this.title = title
      this.id = ++ListId
      this.tasks = []
    }

    addTask(task){
      this.tasks.push(task)
    }


    removeTask(task){
      this.tasks = this.tasks.filter((e) => (e !== task))
    }
  }
}