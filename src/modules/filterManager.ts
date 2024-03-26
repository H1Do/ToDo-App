export class FilterManager {
  private filterElement: HTMLDivElement;
  private switchCallback: (arg: string) => void;
  private filterButtons: NodeListOf<HTMLButtonElement>;

  constructor(
    filterElement: HTMLDivElement,
    switchCallback: (arg: string) => void,
  ) {
    this.filterElement = filterElement;
    this.switchCallback = switchCallback;
    this.filterButtons = filterElement.querySelectorAll('.button');
  }

  public initFilterSwitching() {
    this.filterElement.addEventListener('click', (event) => {
      const target = event.target as HTMLButtonElement;
      this.filterButtons.forEach((currentElement) => {
        currentElement.classList.remove('filter__button--selected');
      });
      target.classList.add('filter__button--selected');
      this.switchCallback(target.value);
    });
  }
}
