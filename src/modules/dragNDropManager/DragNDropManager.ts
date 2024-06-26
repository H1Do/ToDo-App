class DragNDropManager {
  // eslint-disable-next-line
  private switchPlaces: (arg1: number, arg2: number) => void;
  private taskListElement: HTMLUListElement;
  private dragStartId: number = -1;

  constructor(
    // eslint-disable-next-line
    switchPlaces: (arg1: number, arg2: number) => void,
    taskListElement: HTMLUListElement,
  ) {
    this.switchPlaces = switchPlaces;
    this.taskListElement = taskListElement;
  }

  public initDrag() {
    const handleDragStart = (event: DragEvent) => {
      if (!event.target) {
        return;
      }
      this.dragStartId = Number((event.target as HTMLElement).dataset.id);

      event.dataTransfer!.effectAllowed = 'move';
      event.dataTransfer!.setData('text/html', this.taskListElement.innerHTML);
    };

    const handleDropOver = (event: DragEvent) => {
      event.preventDefault();
      event.dataTransfer!.dropEffect = 'move';
    };

    const handleDrop = (event: DragEvent) => {
      event.preventDefault();

      const dragEndElement = (event.target as HTMLElement).closest(
        '.task',
      ) as HTMLElement;
      if (!dragEndElement) {
        return;
      }

      const dragEndId = Number(dragEndElement.dataset.id);

      this.switchPlaces(dragEndId, this.dragStartId);
    };

    this.taskListElement.addEventListener('dragstart', handleDragStart);
    this.taskListElement.addEventListener('dragover', handleDropOver);
    this.taskListElement.addEventListener('drop', handleDrop);
  }
}

export default DragNDropManager;
