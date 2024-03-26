import { Task } from './task';

export class TaskManager {
  private taskList: Task[];
  private filterValue: string = 'All';

  constructor(taskList: Task[] = []) {
    this.taskList = taskList;
  }

  public addTask(taskDescription: string, isCompleted: boolean) {
    this.taskList.unshift(new Task(taskDescription, isCompleted));
  }

  public removeTask(index: number) {
    this.taskList = this.taskList.filter(
      (_, currentIndex) => index !== currentIndex,
    );
  }

  public setFilter(filterValue: string) {
    this.filterValue = filterValue;
  }

  public getHTML(): DocumentFragment {
    const resultHTML = new DocumentFragment();

    this.taskList.forEach((currentValue, _, thisArray) => {
      if (
        this.filterValue === 'All' ||
        (this.filterValue === 'Completed' && currentValue.getStatus()) ||
        (this.filterValue === 'Active' && currentValue.getStatus())
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
            liElement.remove();
            thisArray = thisArray.filter((value) => currentValue !== value);
          });
        resultHTML.append(liElement);
      }
    });

    return resultHTML;
  }
}
