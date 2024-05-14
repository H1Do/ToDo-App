import { Model } from './../../types/model';
import { TaskMinimized } from '../../types/taskMinimized';
import StorageManager from '../storageManager/StorageManager';
import FilterManager from '../filterManager/FilterManager';
import DragNDropManager from '../dragNDropManager/DragNDropManager';
import { Task } from '../../types/task';
import { TodoView } from './TodoView';

export class TodoModel implements Model {
  view: TodoView;

  private taskList: Task[] = [];
  private filterValue: string = 'all';

  private storageManager: StorageManager<Array<TaskMinimized>>;
  private filterManager: FilterManager;
  private dragNDropManager: DragNDropManager;

  private filterElement: HTMLDivElement;
  private taskListElement: HTMLUListElement;

  constructor(view: TodoView) {
    this.view = view;

    this.filterElement = document.querySelector('.filter')!;
    this.taskListElement = document.querySelector('.tasks__list')!;

    this.storageManager = new StorageManager<Array<TaskMinimized>>('tasks');
    this.filterManager = new FilterManager(
      this.filterElement,
      this.setFilter.bind(this),
    );
    this.filterManager.initFilterSwitching();
    this.dragNDropManager = new DragNDropManager(
      this.switchPlaces.bind(this),
      this.taskListElement,
    );
    this.dragNDropManager.initDrag();
  }

  public loadData() {
    const data = this.storageManager.getData();
    if (data) {
      data?.forEach((task) => {
        this.taskList.push(
          new Task(task.description, task.isCompleted, task.id),
        );
      });
    }

    this.view.render();
  }

  public saveData() {
    this.storageManager.setData(
      this.taskList.map((task) => ({
        id: task.getId(),
        description: task.getDescription(),
        isCompleted: task.getStatus(),
      })),
    );
  }

  public addTask(description: string, isCompleted: boolean) {
    this.taskList.unshift(new Task(description, isCompleted));
    this.view.render();
  }

  public removeTask(task: Task) {
    this.taskList = this.taskList.filter((currentTask) => task !== currentTask);
    this.view.render();
  }

  private setFilter(filterValue: string) {
    this.filterValue = filterValue;
    this.view.render();
  }

  public removeCompletedTasks() {
    this.taskList = this.taskList.filter(
      (currentTask) => !currentTask.getStatus(),
    );
    this.view.render();
  }

  public getTaskList() {
    return this.taskList;
  }

  public switchPlaces(firstId: number, secondId: number) {
    if (firstId === secondId) {
      return;
    }
    const firstIndex = this.taskList.findIndex(
      (task) => task.getId() === firstId,
    );
    const secondIndex = this.taskList.findIndex(
      (task) => task.getId() === secondId,
    );

    const temp = this.taskList[firstIndex];
    this.taskList[firstIndex] = this.taskList[secondIndex];
    this.taskList[secondIndex] = temp;
    this.view.render();
  }

  public getFilterValue() {
    return this.filterValue;
  }
}
