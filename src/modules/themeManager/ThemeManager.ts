export class ThemeManager {
  private currentTheme: string = 'dark';
  private containerElement: HTMLDivElement;
  private switchThemeButton: HTMLButtonElement;

  constructor(
    currentTheme: string,
    containerElement: HTMLDivElement,
    buttonElement: HTMLButtonElement,
  ) {
    this.currentTheme = currentTheme;
    this.containerElement = containerElement;
    this.switchThemeButton = buttonElement;
  }

  public init() {
    this.switchThemeButton.addEventListener(
      'click',
      this.switchTheme.bind(this),
    );
    this.containerElement.classList.add(`todo--${this.currentTheme}-theme`);
  }

  private switchTheme() {
    if (this.currentTheme === 'dark') {
      this.currentTheme = 'light';
      this.containerElement.classList.remove('todo--dark-theme');
      this.containerElement.classList.add('todo--light-theme');
    } else {
      this.currentTheme = 'dark';
      this.containerElement.classList.remove('todo--light-theme');
      this.containerElement.classList.add('todo--dark-theme');
    }
  }
}
