export class ThemeManager {
  private static instance: ThemeManager;
  private currentTheme: string = 'dark';
  private containerElement: HTMLDivElement;
  private switchThemeButton: HTMLButtonElement;

  private constructor(
    currentTheme: string,
    htmlElement: HTMLDivElement,
    buttonElement: HTMLButtonElement,
  ) {
    this.currentTheme = currentTheme;
    this.containerElement = htmlElement;
    this.switchThemeButton = buttonElement;
    this.switchThemeButton.addEventListener(
      'click',
      this.switchTheme.bind(this),
    );
    this.containerElement.classList.add(`todo--${this.currentTheme}-theme`);
    ThemeManager.instance = this;
  }

  public static initTheme(
    currentTheme: string,
    htmlElement: HTMLDivElement,
    buttonElement: HTMLButtonElement,
  ): ThemeManager {
    if (this.instance) {
      return this.instance;
    } else {
      this.instance = new ThemeManager(
        currentTheme,
        htmlElement,
        buttonElement,
      );
      return this.instance;
    }
  }

  private switchTheme(): void {
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
