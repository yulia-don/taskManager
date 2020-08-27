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
                { id: "projectsBtn", view: "button", value: "Проекты", inputWidth: 100, click: this._proj, width: 90 },
                { height: 20 },
                { id: "staffBtn", view: "button", value: "Сотрудники", inputWidth: 100, click: this._staf, width: 110 },
                { height: 450 },//когда нижний откроется, то 400
                { id: "exitBtn", view: "button", value: "Выйти", inputWidth: 100, click: "", height: 50, hidden: true }
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
          ]
        }
      ]
    }
  }

  //открытие контента проекты
  _proj() { $$('content1').show(); $$('content2').hide(); $$('content3').hide(); clearInfoP(); }

  //открытие контента сотрудники
  _staf() { $$('content1').hide(); $$('content2').show(); $$('content3').hide(); }
}

let app = new Aplic();
webix.ui(app.getView());
