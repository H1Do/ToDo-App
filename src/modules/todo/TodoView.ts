import { TodoController } from './TodoController';
import { ThemeManager } from './../themeManager/ThemeManager';
import { Task } from '../../types/task';
import { TodoModel } from './TodoModel';

export class TodoView {
  controller: TodoController;
  model: TodoModel;

  private themeButtonElement: HTMLButtonElement;
  private taskListElement: HTMLUListElement;
  private taskInputForm: HTMLFormElement;
  private taskInputElement: HTMLInputElement;
  private taskInputCheckboxElement: HTMLInputElement;
  private taskCounterElement: HTMLDivElement;
  private taskClearButtonElement: HTMLButtonElement;

  private themeManager: ThemeManager;

  constructor(appElement: HTMLDivElement) {
    this.model = new TodoModel(this);
    this.controller = new TodoController(this.model);

    this.themeButtonElement = appElement.querySelector('.header__button')!;
    this.taskListElement = appElement.querySelector('.tasks__list')!;
    this.taskInputForm = appElement.querySelector('.tasks__input')!;
    this.taskInputElement = appElement.querySelector('.tasks__input-field')!;
    this.taskInputCheckboxElement =
      appElement.querySelector('.checkbox__input')!;
    this.taskCounterElement = appElement.querySelector(
      '.tasks__actions-count',
    )!;
    this.taskClearButtonElement = appElement.querySelector(
      '.tasks__actions-cleanup',
    )!;

    this.themeManager = new ThemeManager(
      window?.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light',
      appElement,
      this.themeButtonElement,
    );

    this.themeManager.init();

    this.bindListeners();
  }

  private bindListeners() {
    document.addEventListener(
      'DOMContentLoaded',
      this.controller.handleDOMContentLoaded.bind(this),
    );
    window.addEventListener(
      'beforeunload',
      this.controller.handleBeforeUnload.bind(this.controller),
    );
    this.taskInputForm.addEventListener(
      'submit',
      this.controller.handleTaskAddSubmit.bind(
        this.controller,
        this.taskInputElement,
        this.taskInputCheckboxElement,
      ),
    );
    this.taskClearButtonElement.addEventListener(
      'click',
      this.controller.handleClearButtonClick.bind(this),
    );
  }

  public render() {
    const resultHTML = new DocumentFragment();
    const taskList = this.controller.getTasks();
    const filterValue = this.controller.getFilter();

    let taskCount = 0;

    taskList.forEach((currentValue: Task) => {
      if (
        filterValue === 'all' ||
        (filterValue === 'completed' && currentValue.getStatus()) ||
        (filterValue === 'active' && !currentValue.getStatus())
      ) {
        taskCount++;
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
        liElement.dataset.id = String(currentValue.getId());
        liElement.setAttribute('draggable', 'true');
        if (currentValue.getStatus()) {
          liElement.classList.add('task--completed');
        }
        liElement
          .querySelector('.checkbox__input')
          ?.addEventListener('change', () => {
            currentValue.changeStatus();
            this.render();
          });
        liElement
          .querySelector('.task__delete-button')
          ?.addEventListener(
            'click',
            this.controller.handleRemoveButtonClick.bind(this, currentValue),
          );
        resultHTML.append(liElement);
      }
    });

    if (!taskCount) {
      const liElement = document.createElement('li');
      liElement.innerHTML = `
        <div class="task__description">
          No one task
        </div>
      `;
      liElement.className = 'tasks__item task';
      liElement.style.textAlign = 'center';
      liElement.style.fontSize = '16px';
      resultHTML.append(liElement);
    }

    this.taskListElement.innerHTML = '';
    this.taskListElement.append(resultHTML);
    this.taskCounterElement.textContent = `${taskCount} items left`;
  }
}
