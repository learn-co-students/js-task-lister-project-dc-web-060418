function createTask() {
  let taskId = 0
  return class {
    constructor(description, priority, list) {
      this.description = description
      this.list = list
      this.priority = priority
      this.id = ++taskId
    }
  }
  
}