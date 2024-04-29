var h=Object.defineProperty;var u=(l,t,e)=>t in l?h(l,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):l[t]=e;var i=(l,t,e)=>(u(l,typeof t!="symbol"?t+"":t,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function e(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(a){if(a.ep)return;a.ep=!0;const n=e(a);fetch(a.href,n)}})();class m{constructor(t,e){i(this,"filterElement");i(this,"switchCallback");i(this,"filterButtons");this.filterElement=t,this.switchCallback=e,this.filterButtons=t.querySelectorAll(".button")}initFilterSwitching(){this.filterElement.addEventListener("click",t=>{if(!(t.target instanceof HTMLButtonElement))return;const e=t.target;this.filterButtons.forEach(s=>{s.classList.remove("filter__button--selected")}),e.classList.add("filter__button--selected"),this.switchCallback(e.value)})}}class d{constructor(t,e,s=Date.now()){i(this,"id");i(this,"description","");i(this,"isCompleted",!1);this.id=s,this.description=t,this.isCompleted=e}getDescription(){return this.description}getStatus(){return this.isCompleted}getId(){return this.id}changeStatus(){this.isCompleted=!this.isCompleted}}class k{constructor(t=[]){i(this,"taskList");i(this,"filterValue","all");i(this,"renderCallback",()=>{});this.taskList=t}addTask(t,e){this.taskList.unshift(new d(t,e)),this.renderCallback()}removeTask(t){this.taskList=this.taskList.filter(e=>t!==e),this.renderCallback()}setFilter(t){this.filterValue=t,this.renderCallback()}clearComleted(){this.taskList=this.taskList.filter(t=>!t.getStatus()),this.renderCallback()}getTaskList(){return this.taskList}setTaskList(t){this.taskList=t}switchPlaces(t,e){if(t===e)return;const s=this.taskList.findIndex(r=>r.getId()===t),a=this.taskList.findIndex(r=>r.getId()===e),n=this.taskList[s];this.taskList[s]=this.taskList[a],this.taskList[a]=n,this.renderCallback()}getCount(){if(this.filterValue==="all")return this.taskList.length;{const t=this.taskList.reduce((e,s)=>e+Number(s.getStatus()),0);return this.filterValue==="completed"?t:this.taskList.length-t}}setRenderCallback(t){this.renderCallback=t}getHTML(){const t=new DocumentFragment;let e=0;if(this.taskList.forEach(s=>{var a,n;if(this.filterValue==="all"||this.filterValue==="completed"&&s.getStatus()||this.filterValue==="active"&&!s.getStatus()){e++;const r=document.createElement("li");r.innerHTML=`
        <label class="tasks__input-checkbox checkbox">
          <input type="checkbox" class="checkbox__input visually-hidden" ${s.getStatus()?"checked":""}>
          <span class="checkbox__emulator"></span>
          <span class="checkbox__label visually-hidden">Markup task</span>
        </label>
        <div class="task__description">
          ${s.getDescription()}
        </div>
        <button class="task__delete-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
            <path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/>
          </svg>
        </button>
      `,r.className="tasks__item task",r.dataset.id=String(s.getId()),r.setAttribute("draggable","true"),s.getStatus()&&r.classList.add("task--completed"),(a=r.querySelector(".checkbox__input"))==null||a.addEventListener("change",()=>{s.changeStatus(),this.renderCallback()}),(n=r.querySelector(".task__delete-button"))==null||n.addEventListener("click",()=>{this.removeTask(s)}),t.append(r)}}),!e){const s=document.createElement("li");return s.innerHTML=`
        <div class="task__description">
          No one task
        </div>
      `,s.className="tasks__item task",s.style.textAlign="center",s.style.fontSize="16px",t.append(s),t}return t}}const o=class o{constructor(t,e,s){i(this,"currentTheme","dark");i(this,"containerElement");i(this,"switchThemeButton");this.currentTheme=t,this.containerElement=e,this.switchThemeButton=s,this.switchThemeButton.addEventListener("click",this.switchTheme.bind(this)),this.containerElement.classList.add(`todo--${this.currentTheme}-theme`),o.instance=this}static initTheme(t,e,s){return this.instance?this.instance:(this.instance=new o(t,e,s),this.instance)}switchTheme(){this.currentTheme==="dark"?(this.currentTheme="light",this.containerElement.classList.remove("todo--dark-theme"),this.containerElement.classList.add("todo--light-theme")):(this.currentTheme="dark",this.containerElement.classList.remove("todo--light-theme"),this.containerElement.classList.add("todo--dark-theme"))}};i(o,"instance");let c=o;class g{constructor(t){i(this,"name");this.name=t}getData(){return localStorage.getItem(this.name)?JSON.parse(localStorage.getItem(this.name)):null}setData(t){console.log(t),localStorage.setItem(this.name,JSON.stringify(t))}}class p{constructor(t,e){i(this,"taskManager");i(this,"taskListElement");i(this,"dragStartId",-1);this.taskManager=t,this.taskListElement=e}initDrag(){const t=a=>{a.target&&(this.dragStartId=Number(a.target.dataset.id),a.dataTransfer.effectAllowed="move",a.dataTransfer.setData("text/html",this.taskListElement.innerHTML))},e=a=>{a.preventDefault(),a.dataTransfer.dropEffect="move"},s=a=>{a.preventDefault();const n=a.target.closest(".task");if(!n)return;const r=Number(n.dataset.id);this.taskManager.switchPlaces(r,this.dragStartId)};this.taskListElement.addEventListener("dragstart",t),this.taskListElement.addEventListener("dragover",e),this.taskListElement.addEventListener("drop",s)}}class f{constructor(t){i(this,"todoElement");i(this,"themeButtonElement");i(this,"filterElement");i(this,"taskListElement");i(this,"taskInputForm");i(this,"taskInputElement");i(this,"taskInputCheckboxElement");i(this,"taskCounterElement");i(this,"taskClearButtonElement");i(this,"storageManager");i(this,"taskManager");i(this,"filterManager");i(this,"dragNDropManager");this.todoElement=t.querySelector(".todo"),this.themeButtonElement=t.querySelector(".header__button"),this.filterElement=t.querySelector(".filter"),this.taskListElement=t.querySelector(".tasks__list"),this.taskInputForm=t.querySelector(".tasks__input"),this.taskInputElement=t.querySelector(".tasks__input-field"),this.taskInputCheckboxElement=t.querySelector(".checkbox__input"),this.taskCounterElement=t.querySelector(".tasks__actions-count"),this.taskClearButtonElement=t.querySelector(".tasks__actions-cleanup"),this.taskManager=new k,this.storageManager=new g("tasks"),this.filterManager=new m(this.filterElement,this.taskManager.setFilter.bind(this.taskManager)),this.filterManager.initFilterSwitching(),this.dragNDropManager=new p(this.taskManager,this.taskListElement),this.dragNDropManager.initDrag()}initApp(){c.initTheme(window!=null&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light",this.todoElement,this.themeButtonElement);const t=()=>{this.taskListElement.innerHTML="",this.taskListElement.append(this.taskManager.getHTML()),this.taskCounterElement.textContent=`${this.taskManager.getCount()} items left`};this.taskManager.setRenderCallback(t),document.addEventListener("DOMContentLoaded",()=>{const e=this.storageManager.getData();if(e){const s=[];e==null||e.forEach(a=>{s.push(new d(a.description,a.isCompleted,a.id))}),this.taskManager.setTaskList(s)}t()}),window.addEventListener("beforeunload",()=>{const e=this.taskManager.getTaskList();this.storageManager.setData(e.map(s=>({id:s.getId(),description:s.getDescription(),isCompleted:s.getStatus()})))}),this.taskInputForm.addEventListener("submit",e=>{e.preventDefault(),this.taskInputElement.value&&(this.taskManager.addTask(this.taskInputElement.value,this.taskInputCheckboxElement.checked),this.taskInputElement.value="")}),this.taskClearButtonElement.addEventListener("click",()=>{this.taskManager.clearComleted()})}}document.querySelector("#app").innerHTML=`
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
`;const b=new f(document.querySelector("#app"));b.initApp();
