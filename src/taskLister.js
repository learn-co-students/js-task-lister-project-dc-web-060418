function createTaskLister() {
  
  return class {
    constructor(){
      this.lists = []
      this.listsinitialized = false
    }
    addList(list){
      this.lists.push(list)
    }
    removeList(list){
      this.lists = this.lists.filter((e)=>(e!=list))
      
    }
  }
}
