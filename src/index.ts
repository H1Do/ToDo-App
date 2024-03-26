import './styles/styles.scss';
import { ThemeManager } from './modules/theme';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="container todo">
    <div class="todo__inner">
      <header class="todo__header header">
        <h1 class="header__title">TODO</h1>
        <button class="header__button">
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" class="moon-svg">
            <path fill="#FFF" fill-rule="evenodd" d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"/>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" class="sun-svg">
            <path fill="#FFF" fill-rule="evenodd" d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"/>
          </svg>
          <span class="visually-hidden">Change theme</span>
        </button>
      </header>
      <section class="todo__tasks tasks">
        <div class="tasks__input">
          <label class="tasks__input-checkbox checkbox">
            <input type="checkbox" class="checkbox__input visually-hidden">
            <span class="checkbox__emulator"></span>
            <span class="checkbox__label visually-hidden">Markup task</span>
          </label>
          <input type="text" class="tasks__input-field" placeholder="Create a new todo...">
        </div>
        <div class="tasks__body">
          <ul class="tasks__list">
            <li class="tasks__item task">
              <label class="tasks__input-checkbox checkbox">
                <input type="checkbox" class="checkbox__input visually-hidden">
                <span class="checkbox__emulator"></span>
                <span class="checkbox__label visually-hidden">Markup task</span>
              </label>
              <div class="task__description">
                Complete online JavaScript course
              </div>
              <button class="task__delete-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
                  <path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/>
                </svg>
              </button>
            </li>
            <li class="tasks__item task task--completed">
              <label class="tasks__input-checkbox checkbox">
                <input type="checkbox" class="checkbox__input visually-hidden">
                <span class="checkbox__emulator"></span>
                <span class="checkbox__label visually-hidden">Markup task</span>
              </label>
              <div class="task__description">
                Complete online JavaScript course
              </div>
              <button class="task__delete-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
                  <path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/>
                </svg>
              </button>
            </li>
          </ul>
          <div class="tasks__actions">
            <div class="tasks__actions-mobile">
              <div class="tasks__actions-count">5 items left</div>
              <button type="button" class="tasks__actions-cleanup button">Clear Completed</button>
            </div>
            <div class="tasks__actions-filter filter">
              <button type="button" class="filter__button button filter__button--selected">All</button>
              <button type="button" class="filter__button button">Active</button>
              <button type="button" class="filter__button button">Completed</button>
            </div>
          </div>
        </div>
      </section>
      <footer class="todo__footer">
        Drag and drop to reorder list
        <div class="attribution">
          Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. 
          Coded by <a href="https://github.com/H1Do">Hido</a>.
        </div>
      </footer>
    </div>
  </div>
`;

ThemeManager.initTheme(
  window?.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
  document.querySelector('.todo') as HTMLDivElement,
  document.querySelector('.header__button') as HTMLButtonElement,
);
