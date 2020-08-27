import { projectComp, clearInfoP } from './components/proj/proj.js';
import { staffComp } from './components/staf/staf.js';
import { taskComp } from './components/task/task.js';

class Aplic {
  constructor() {
    this.projComp = new projectComp();
    this.stafComp = new staffComp();
    this.taskComp = new taskComp();
  }
  //отрисовка основной страницы
  getView() {
    return {
      rows: [
        { type: "header", template: "Менеджер задач" },
        {
          cols: [
            {
              rows: [
                { height: 50 },
                { id: "projectsBtn", view: "button", value: "Проекты", inputWidth: 100, click: this._proj, width: 90, hidden: true },
                { height: 20, width: 110 },
                { id: "staffBtn", view: "button", value: "Сотрудники", inputWidth: 100, click: this._staf, width: 110, hidden: true },
                { height: 400 },
                { id: "exitBtn", view: "button", value: "Выйти", inputWidth: 100, click: this._outSystem, height: 50, hidden: true }
              ]
            },
            {
              id: "content1",
              body: this.projComp.getView(), hidden: true,
            },
            {
              id: "content2",
              body: this.stafComp.getView(), hidden: true,
            },
            {
              id: "content3",
              body: this.taskComp.getView(), hidden: true,
            },
            {
              id: "content4",
              cols: [
                { width: 400 },
                {
                  rows: [
                    { height: 250 },
                    { id: "logIn", view: "text", type: "text", attributes: { maxlength: 20, required: "true" }, label: "Логин:", value: "", labelWidth: 100 },
                    { id: "passIn", view: "text", type: "password", attributes: { maxlength: 20, required: "true" }, label: "Пароль:", value: "", labelWidth: 100 },
                    {
                      cols: [
                        { view: "button", value: "Вход", click: this._inSystem, inputWidth: 50 },
                        { view: "button", value: "Регистрация", click: this._registration, inputWidth: 150 },
                      ]
                    },
                    { height: 500 },
                  ]
                },
                { width: 400 },
              ]
            }
          ]
        }
      ]
    }
  }

  //открытие контента проекты
  _proj() {
    $$('content1').show();
    $$('content2').hide();
    $$('content3').hide();
    $$('content4').hide();
    $$('exitBtn').show();
    clearInfoP();
  }

  //открытие контента сотрудники
  _staf() {
    $$('content1').hide();
    $$('content2').show();
    $$('content3').hide();
    $$('content4').hide();
    $$('exitBtn').show();
  }

  //открытие контента выхода из системы
  _outSystem() {
    $$('content1').hide();
    $$('content2').hide();
    $$('content3').hide();
    $$('content4').show();
    $$('exitBtn').hide();
    $$('projectsBtn').hide();
    $$('staffBtn').hide();
  }

  //открытие контента входа в систему
  async _inSystem() {
    let item = {
      Login: "",
      Password: ""
    };
    item.Login = $$('logIn').getValue();
    item.Password = $$('passIn').getValue();
    let response = await fetch('/people', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(item.Login)
    });
    let json;
    if (response.ok) {
      json = await response.json();
    } else {
      alert(response.json());
    }
    if (json.Login == item.Login && json.Password == item.Password) {
      $$('content1').hide();
      $$('content2').hide();
      $$('content3').hide();
      $$('content4').hide();
      $$('exitBtn').show();
      $$('projectsBtn').show();
      $$('staffBtn').show();
      $$('logIn').define("value","");
      $$('logIn').refresh();
      $$('passIn').define("value","");
      $$('passIn').refresh();
    }
    else if(item.Login !="" && item.Password != ""){
      alert("Неправильно введены логин или пароль")
    }
    else{
      alert("Заполните все поля")
    }
  };

  //открытие окна регистрации пользователя
  _registration() {
    let tmp = webix.ui(window()); tmp.show();
  }

  //добавление логина и пароля в бд
  async savePeople() {
    let item = {
      Login: "",
      Password: ""
    };
    item.Login = $$('login').getValue();
    item.Password = $$('password').getValue();
    if (item.Login == "" || item.Password == "") {
      alert("Заполните все поля");
    } else {
      let response = await fetch('/people/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(item)
      });
      $$('login').define("value","");
      $$('login').refresh();
      $$('password').define("value","");
      $$('password').refresh();
      $$("adPeople").hide();
    }
  }
}

let app = new Aplic();
webix.ui(app.getView());

function window() {
  return {
    view: "window", id: "adPeople", position: "center", modal: true, move: true,
    head: {
      view: "toolbar", elements: [
        { view: "label", label: "Регистрация" },
        {
          view: "icon", icon: "wxi-close", click: function () {
            $$("adPeople").hide();
          }
        }
      ]
    },

    body: {
      rows: [
        { id: "login", view: "text", type: "text", attributes: { maxlength: 20, required: "true" }, label: "Логин:", value: "", labelWidth: 100 },
        { id: "password", view: "text", type: "password", attributes: { maxlength: 20, required: "true" }, label: "Пароль:", value: "", labelWidth: 100 },
        { view: "button", value: "ОК", click: app.savePeople },
      ]
    }
  }
}