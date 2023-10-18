import { makeAutoObservable } from "mobx";
class TaskStore {
  list = [
    {
      id: 1,
      name: "react",
      isDone: false,
    },
    {
      id: 2,
      name: "mobx",
      isDone: false,
    },
  ];
  constructor() {
    makeAutoObservable(this);
  }
  // 单选操作
  singleCheck(id, check) {
    // 查找 find findIndex
    const item = this.list.find((item) => item.id === id);
    item.isDone = check;
  }
  // 全选操作
  allCheck(check) {
    this.list.forEach((item) => {
      item.isDone = check;
    });
  }
  // 是否全选
  get isAll() {
    return this.list.every((item) => item.isDone);
  }
  // 删除任务
  delTask = (id) => {
    this.list = this.list.filter((item) => item.id !== id);
  };
  // 增加任务
  addTask = (task) => {
    this.list.push(task);
  };
  isFinishedLength() {
    return this.list.filter((item) => item.isDone).length;
  }
}
export default TaskStore;
