class FilterManager {
  private filterElement: HTMLDivElement;
  // eslint-disable-next-line
  private switchCallback: (_: string) => void;
  private filterButtons: NodeListOf<HTMLButtonElement>;

  constructor(
    filterElement: HTMLDivElement,
    // eslint-disable-next-line
    switchCallback: (_: string) => void,
  ) {
    this.filterElement = filterElement;
    this.switchCallback = switchCallback;
    this.filterButtons = filterElement.querySelectorAll('.button');
  }

  public initFilterSwitching() {
    this.filterElement.addEventListener('click', (event) => {
      if (!(event.target instanceof HTMLButtonElement)) {
        return;
      }
      const target = event.target as HTMLButtonElement;

      this.filterButtons.forEach((currentElement) => {
        currentElement.classList.remove('filter__button--selected');
      });
      target.classList.add('filter__button--selected');
      this.switchCallback(target.value);
    });
  }
}

export default FilterManager;
