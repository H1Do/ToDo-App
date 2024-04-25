import { Task } from './task';

export class TaskManager {
  private taskList: Task[];
  private filterValue: string = 'all';
  private renderCallback: () => void = () => {};

  constructor(taskList: Task[] = []) {
    this.taskList = taskList;
  }

  public addTask(taskDescription: string, isCompleted: boolean) {
    this.taskList.unshift(new Task(taskDescription, isCompleted));
    this.renderCallback();
  }

  public removeTask(task: Task) {
    this.taskList = this.taskList.filter((currentTask) => task !== currentTask);
    this.renderCallback();
  }

  public setFilter(filterValue: string) {
    this.filterValue = filterValue;
    this.renderCallback();
  }

  public clearComleted() {
    this.taskList = this.taskList.filter(
      (currentTask) => !currentTask.getStatus(),
    );
    this.renderCallback();
  }

  public getTaskList() {
    return this.taskList;
  }

  public setTaskList(taskList: Array<Task>) {
    this.taskList = taskList;
  }

  public getCount() {
    if (this.filterValue === 'all') {
      return this.taskList.length;
    } else {
      const completedCount = this.taskList.reduce((count, task) => {
        return count + Number(task.getStatus());
      }, 0);
      return this.filterValue === 'completed'
        ? completedCount
        : this.taskList.length - completedCount;
    }
  }

  public setRenderCallback(callback: () => void) {
    this.renderCallback = callback;
  }

  public getHTML(): DocumentFragment {
    const resultHTML = new DocumentFragment();

    this.taskList.forEach((currentValue) => {
      if (
        this.filterValue === 'all' ||
        (this.filterValue === 'completed' && currentValue.getStatus()) ||
        (this.filterValue === 'active' && !currentValue.getStatus())
      ) {
        const liElement = document.createElement('li');
        liElement.innerHTML = `
        <label class="tasks__input-checkbox checkbox">
          <input type="checkbox" class="checkbox__input visually-hidden" ${
            currentValue.getStatus() ? 'checked' : ''
          }>
          <span class="checkbox__emulator"></span>
          <span class="checkbox__label visually-hidden">Markup task</span>
        </label>
        <div class="task__description">
          ${currentValue.getDescription()}
        </div>
        <button class="task__delete-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
            <path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/>
          </svg>
        </button>
      `;
        liElement.className = 'tasks__item task';
        if (currentValue.getStatus()) {
          liElement.classList.add('task--completed');
        }
        liElement
          .querySelector('.checkbox__input')
          ?.addEventListener('change', () => {
            currentValue.changeStatus();
            liElement.classList.toggle('task--completed');
          });
        liElement
          .querySelector('.task__delete-button')
          ?.addEventListener('click', () => {
            this.removeTask(currentValue);
          });
        resultHTML.append(liElement);
      }
    });

    return resultHTML;
  }
}
