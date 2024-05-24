var h=Object.defineProperty;var u=(r,t,e)=>t in r?h(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var i=(r,t,e)=>(u(r,typeof t!="symbol"?t+"":t,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function e(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(s){if(s.ep)return;s.ep=!0;const a=e(s);fetch(s.href,a)}})();class m{constructor(t){i(this,"model");this.model=t}handleDOMContentLoaded(){this.model.loadData()}handleBeforeUnload(){this.model.saveData()}handleTaskAddSubmit(t,e,n){n.preventDefault(),t.value&&(this.model.addTask(t.value,e.checked),t.value="")}handleClearButtonClick(){this.model.removeCompletedTasks()}handleRemoveButtonClick(t){this.model.removeTask(t)}getTasks(){return this.model.getTaskList()}getFilter(){return this.model.getFilterValue()}}class k{constructor(t,e,n){i(this,"currentTheme","dark");i(this,"containerElement");i(this,"switchThemeButton");this.currentTheme=t,this.containerElement=e,this.switchThemeButton=n}init(){this.switchThemeButton.addEventListener("click",this.switchTheme.bind(this)),this.containerElement.classList.add(`todo--${this.currentTheme}-theme`)}switchTheme(){this.currentTheme==="dark"?(this.currentTheme="light",this.containerElement.classList.remove("todo--dark-theme"),this.containerElement.classList.add("todo--light-theme")):(this.currentTheme="dark",this.containerElement.classList.remove("todo--light-theme"),this.containerElement.classList.add("todo--dark-theme"))}}class g{constructor(t){i(this,"name");this.name=t}getData(){return localStorage.getItem(this.name)?JSON.parse(localStorage.getItem(this.name)):null}setData(t){console.log(t),localStorage.setItem(this.name,JSON.stringify(t))}}class f{constructor(t,e){i(this,"filterElement");i(this,"switchCallback");i(this,"filterButtons");this.filterElement=t,this.switchCallback=e,this.filterButtons=t.querySelectorAll(".button")}initFilterSwitching(){this.filterElement.addEventListener("click",t=>{if(!(t.target instanceof HTMLButtonElement))return;const e=t.target;this.filterButtons.forEach(n=>{n.classList.remove("filter__button--selected")}),e.classList.add("filter__button--selected"),this.switchCallback(e.value)})}}class p{constructor(t,e){i(this,"switchPlaces");i(this,"taskListElement");i(this,"dragStartId",-1);this.switchPlaces=t,this.taskListElement=e}initDrag(){const t=s=>{s.target&&(this.dragStartId=Number(s.target.dataset.id),s.dataTransfer.effectAllowed="move",s.dataTransfer.setData("text/html",this.taskListElement.innerHTML))},e=s=>{s.preventDefault(),s.dataTransfer.dropEffect="move"},n=s=>{s.preventDefault();const a=s.target.closest(".task");if(!a)return;const l=Number(a.dataset.id);this.switchPlaces(l,this.dragStartId)};this.taskListElement.addEventListener("dragstart",t),this.taskListElement.addEventListener("dragover",e),this.taskListElement.addEventListener("drop",n)}}class c{constructor(t,e,n=Date.now()){i(this,"id");i(this,"description","");i(this,"isCompleted",!1);this.id=n,this.description=t,this.isCompleted=e}getDescription(){return this.description}getStatus(){return this.isCompleted}getId(){return this.id}changeStatus(){this.isCompleted=!this.isCompleted}}class _{constructor(t){i(this,"view");i(this,"taskList",[]);i(this,"filterValue","all");i(this,"storageManager");i(this,"filterManager");i(this,"dragNDropManager");i(this,"filterElement");i(this,"taskListElement");this.view=t,this.filterElement=document.querySelector(".filter"),this.taskListElement=document.querySelector(".tasks__list"),this.storageManager=new g("tasks"),this.filterManager=new f(this.filterElement,this.setFilter.bind(this)),this.filterManager.initFilterSwitching(),this.dragNDropManager=new p(this.switchPlaces.bind(this),this.taskListElement),this.dragNDropManager.initDrag()}loadData(){const t=this.storageManager.getData();t&&(t==null||t.forEach(e=>{this.taskList.push(new c(e.description,e.isCompleted,e.id))})),this.view.render()}saveData(){this.storageManager.setData(this.taskList.map(t=>({id:t.getId(),description:t.getDescription(),isCompleted:t.getStatus()})))}addTask(t,e){this.taskList.unshift(new c(t,e)),this.view.render()}removeTask(t){this.taskList=this.taskList.filter(e=>t!==e),this.view.render()}setFilter(t){this.filterValue=t,this.view.render()}removeCompletedTasks(){this.taskList=this.taskList.filter(t=>!t.getStatus()),this.view.render()}getTaskList(){return this.taskList}switchPlaces(t,e){if(t===e)return;const n=this.taskList.findIndex(l=>l.getId()===t),s=this.taskList.findIndex(l=>l.getId()===e),a=this.taskList[n];this.taskList[n]=this.taskList[s],this.taskList[s]=a,this.view.render()}getFilterValue(){return this.filterValue}}class v{constructor(t){i(this,"controller");i(this,"model");i(this,"themeButtonElement");i(this,"taskListElement");i(this,"taskInputForm");i(this,"taskInputElement");i(this,"taskInputCheckboxElement");i(this,"taskCounterElement");i(this,"taskClearButtonElement");i(this,"themeManager");this.model=new _(this),this.controller=new m(this.model),this.themeButtonElement=t.querySelector(".header__button"),this.taskListElement=t.querySelector(".tasks__list"),this.taskInputForm=t.querySelector(".tasks__input"),this.taskInputElement=t.querySelector(".tasks__input-field"),this.taskInputCheckboxElement=t.querySelector(".checkbox__input"),this.taskCounterElement=t.querySelector(".tasks__actions-count"),this.taskClearButtonElement=t.querySelector(".tasks__actions-cleanup"),this.themeManager=new k(window!=null&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light",t,this.themeButtonElement),this.themeManager.init(),this.bindListeners()}bindListeners(){document.addEventListener("DOMContentLoaded",this.controller.handleDOMContentLoaded.bind(this)),window.addEventListener("beforeunload",this.controller.handleBeforeUnload),this.taskInputForm.addEventListener("submit",this.controller.handleTaskAddSubmit.bind(null,this.taskInputElement,this.taskInputCheckboxElement)),this.taskClearButtonElement.addEventListener("click",this.controller.handleClearButtonClick.bind(this))}render(){const t=new DocumentFragment,e=this.controller.getTasks(),n=this.controller.getFilter();let s=0;if(e.forEach(a=>{var l,d;if(n==="all"||n==="completed"&&a.getStatus()||n==="active"&&!a.getStatus()){s++;const o=document.createElement("li");o.innerHTML=`
        <label class="tasks__input-checkbox checkbox">
          <input type="checkbox" class="checkbox__input visually-hidden" ${a.getStatus()?"checked":""}>
          <span class="checkbox__emulator"></span>
          <span class="checkbox__label visually-hidden">Markup task</span>
        </label>
        <div class="task__description">
          ${a.getDescription()}
        </div>
        <button class="task__delete-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
            <path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/>
          </svg>
        </button>
      `,o.className="tasks__item task",o.dataset.id=String(a.getId()),o.setAttribute("draggable","true"),a.getStatus()&&o.classList.add("task--completed"),(l=o.querySelector(".checkbox__input"))==null||l.addEventListener("change",()=>{a.changeStatus(),this.render()}),(d=o.querySelector(".task__delete-button"))==null||d.addEventListener("click",this.controller.handleRemoveButtonClick.bind(this,a)),t.append(o)}}),!s){const a=document.createElement("li");a.innerHTML=`
        <div class="task__description">
          No one task
        </div>
      `,a.className="tasks__item task",a.style.textAlign="center",a.style.fontSize="16px",t.append(a)}this.taskListElement.innerHTML="",this.taskListElement.append(t),this.taskCounterElement.textContent=`${s} items left`}}document.querySelector("#app").innerHTML=`
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
        <form class="tasks__input">
          <label class="tasks__input-checkbox checkbox">
            <input type="checkbox" class="checkbox__input visually-hidden">
            <span class="checkbox__emulator"></span>
            <span class="checkbox__label visually-hidden">Markup task</span>
          </label>
          <input type="text" class="tasks__input-field" placeholder="Create a new todo...">
        </form>
        <div class="tasks__body">
          <ul class="tasks__list">
            
          </ul>
          <div class="tasks__actions">
            <div class="tasks__actions-mobile">
              <div class="tasks__actions-count"></div>
              <button type="button" class="tasks__actions-cleanup button">Clear Completed</button>
            </div>
            <div class="tasks__actions-filter filter">
              <button type="button" value="all" class="filter__button button filter__button--selected">All</button>
              <button type="button" value="active" class="filter__button button">Active</button>
              <button type="button" value="completed" class="filter__button button">Completed</button>
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
`;const b=document.querySelector(".todo"),L=new v(b);L.render();
