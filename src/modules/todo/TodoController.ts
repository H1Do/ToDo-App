import { Controller } from '../../types/controller';
import { Task } from '../../types/task';
import { TodoModel } from './TodoModel';

export class TodoController implements Controller {
  model: TodoModel;

  constructor(model: TodoModel) {
    this.model = model;
  }

  public handleDOMContentLoaded() {
    this.model.loadData();
  }

  public handleBeforeUnload() {
    this.model.saveData();
  }

  public handleTaskAddSubmit(
    taskInputElement: HTMLInputElement,
    taskInputCheckboxelement: HTMLInputElement,
    event: SubmitEvent,
  ) {
    event.preventDefault();
    if (!taskInputElement.value) {
      return;
    }
    this.model.addTask(
      taskInputElement.value,
      taskInputCheckboxelement.checked,
    );
    taskInputElement.value = '';
  }

  public handleClearButtonClick() {
    this.model.removeCompletedTasks();
  }

  public handleRemoveButtonClick(task: Task) {
    this.model.removeTask(task);
  }

  public getTasks() {
    return this.model.getTaskList();
  }

  public getFilter() {
    return this.model.getFilterValue();
  }
}
