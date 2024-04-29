import { FilterManager } from './filterManager';
import { TaskManager } from './taskManager';
import { ThemeManager } from './themeManager';
import StorageManager from './storageManager';
import DragNDropManager from './dragNDropManager';
import { Task } from './task';

type TaskMinimized = {
  id: number;
  description: string;
  isCompleted: boolean;
};

class App {
  private todoElement: HTMLDivElement;
  private themeButtonElement: HTMLButtonElement;
  private filterElement: HTMLDivElement;
  private taskListElement: HTMLUListElement;
  private taskInputForm: HTMLFormElement;
  private taskInputElement: HTMLInputElement;
  private taskInputCheckboxElement: HTMLInputElement;
  private taskCounterElement: HTMLDivElement;
  private taskClearButtonElement: HTMLButtonElement;

  private storageManager: StorageManager<Array<TaskMinimized>>;
  private taskManager: TaskManager;
  private filterManager: FilterManager;
  private dragNDropManager: DragNDropManager;

  constructor(appElement: HTMLDivElement) {
    this.todoElement = appElement.querySelector('.todo')!;
    this.themeButtonElement = appElement.querySelector('.header__button')!;
    this.filterElement = appElement.querySelector('.filter')!;
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

    this.taskManager = new TaskManager();
    this.storageManager = new StorageManager<Array<TaskMinimized>>('tasks');
    this.filterManager = new FilterManager(
      this.filterElement,
      this.taskManager.setFilter.bind(this.taskManager),
    );
    this.filterManager.initFilterSwitching();
    this.dragNDropManager = new DragNDropManager(
      this.taskManager,
      this.taskListElement,
    );
    this.dragNDropManager.initDrag();
  }

  public initApp() {
    ThemeManager.initTheme(
      window?.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light',
      this.todoElement,
      this.themeButtonElement,
    );

    const renderList = () => {
      this.taskListElement.innerHTML = '';
      this.taskListElement.append(this.taskManager.getHTML());
      this.taskCounterElement.textContent = `${this.taskManager.getCount()} items left`;
    };

    this.taskManager.setRenderCallback(renderList);

    document.addEventListener('DOMContentLoaded', () => {
      const data = this.storageManager.getData();
      if (data) {
        const taskList: Array<Task> = [];

        data?.forEach((task) => {
          taskList.push(new Task(task.description, task.isCompleted, task.id));
        });

        this.taskManager.setTaskList(taskList);
      }

      renderList();
    });

    window.addEventListener('beforeunload', () => {
      const data = this.taskManager.getTaskList();
      this.storageManager.setData(
        data.map((task) => ({
          id: task.getId(),
          description: task.getDescription(),
          isCompleted: task.getStatus(),
        })),
      );
    });

    this.taskInputForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!this.taskInputElement.value) {
        return;
      }
      this.taskManager.addTask(
        this.taskInputElement.value,
        this.taskInputCheckboxElement.checked,
      );
      this.taskInputElement.value = '';
    });

    this.taskClearButtonElement.addEventListener('click', () => {
      this.taskManager.clearComleted();
    });
  }
}

export default App;
