import { TaskManager } from './taskManager';

class DragNDropManager {
  private taskManager: TaskManager;
  private taskListElement: HTMLUListElement;
  private dragStartIndex: number = -1;

  constructor(taskManager: TaskManager, taskListElement: HTMLUListElement) {
    this.taskManager = taskManager;
    this.taskListElement = taskListElement;
  }

  public initDrag() {
    const handleDragStart = (event: DragEvent) => {
      if (!event.target) {
        return;
      }
      this.dragStartIndex = Array.from(this.taskListElement.children).indexOf(
        event.target as HTMLElement,
      );

      event.dataTransfer!.effectAllowed = 'move';
      event.dataTransfer!.setData('text/html', this.taskListElement.innerHTML);
    };

    const handleDropOver = (event: DragEvent) => {
      event.preventDefault();
      event.dataTransfer!.dropEffect = 'move';
    };

    const handleDrop = (event: DragEvent) => {
      event.preventDefault();

      const dragEndElement = (event.target as HTMLElement).closest('.task');
      if (!dragEndElement) {
        return;
      }

      const dragEndIndex = Array.from(this.taskListElement.children).indexOf(
        dragEndElement,
      );

      this.taskManager.switchPlaces(dragEndIndex, this.dragStartIndex);
    };

    this.taskListElement.addEventListener('dragstart', handleDragStart);
    this.taskListElement.addEventListener('dragover', handleDropOver);
    this.taskListElement.addEventListener('drop', handleDrop);
  }
}

export default DragNDropManager;
