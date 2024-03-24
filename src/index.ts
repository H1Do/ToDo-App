import './styles/styles.scss';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="container todo">
    <div class="todo__inner">
      <header class="todo__header header">
        <h1 class="header__title">TODO</h1>
        <button class="header__button">
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26">
            <path fill="#FFF" fill-rule="evenodd" d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"/>
          </svg>
        </button>
      </header>
      <section class="todo__tasks tasks">
        <div class="tasks__input">
          <label class="tasks__input-checkbox checkbox">
            <input type="checkbox" class="checkbox__input visually-hidden">
            <span class="checkbox__emulator"></span>
            <span class="checkbox__label visually-hidden">Markup task</span>
          </label>
          <input type="text" class="tasks__input-field">
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
                asdfasdf
              </div>
              <button class="task__delete-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
                  <path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/>
                </svg>
              </button>
            </li>
          </ul>
        </div>
        <div class="tasks__actions">
          <div class="tasks__actions-count">5 items left</div>
          <div class="tasks__actions-filter filter">
            <button type="button" class="filter__button-all button">All</button>
            <button type="button" class="filter__button-active button">Active</button>
            <button type="button" class="filter__button-completed button">Completed</button>
          </div>
          <button type="button" class="tasks__actions-cleanup button">Clear Completed</button>
        </div>
      </section>
      <footer class="todo__footer">
        Drag and drop to reorder list
        <div class="attribution">
          Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. 
          Coded by <a href="#">Your Name Here</a>.
        </div>
      </footer>
    </div>
  </div>
`;
