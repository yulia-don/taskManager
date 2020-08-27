import { modlTask } from '../../models/taskM.js';
import { clasWT } from '../wind/winTask/winTasks.js';
import { modlStaf } from '../../models/stafM.js';

export class taskComp {
  constructor() {
    this.array = modlTask.getAllData();
  };

  //отрисовка контента задачи
  getView() {
    return {
      rows: [
        { id: "textTitle3", view: "label", label: "Задачи", value: "Задачи", readOnly: true, height: 40, align: "center" },
        {
          cols: [
            { id: "addBtn3", view: "button", value: "Добавить", inputWidth: 100, click: this._createTask, height: 50, align: "right" },
            { id: "updateBtn3", view: "button", value: "Редактировать", inputWidth: 150, click: this._updateTask, height: 50, align: "center" },
            { id: "deletBtn3", view: "button", value: "Удалить", inputWidth: 100, click: this._deleteTask, height: 50, align: "left" },
          ]
        },
        {
          cols: [
            {
              rows: [
                {
                  id: "tableT",
                  view: "datatable",
                  columns: [
                    { id: "Название", header: "Название", fillspace: true }
                  ],
                  data: "",
                  on: { onItemClick: this._getInfo },
                  scroll: "y",
                  select: "row"
                },
                {
                  cols: [
                    { id: "filtrFI", view: "select", label: "Сотрудник", options: [""], labelPosition: "top" },
                    { id: "filtrSos", view: "select", label: "Состояние", options: ["", "Новая", "Назначена", "В работе", "Завершена"], labelPosition: "top", width: 150 },
                    { id: "filtrSro", view: "select", label: "Срочность", options: ["", "Обычная", "Срочная", "Очень срочная"], labelPosition: "top", width: 150 },
                    { id: "found", view: "button", value: "Найти", inputWidth: 80, width: 90, click: this._filtration }
                  ]
                }
              ]
            },
            {
              id: "tmpFieldTas",
              rows: [
                { height: 100 },
                { view: "label", label: "Описание:", align: "center" },
                { id: "infTas", view: "textarea", value: "", readonly: true, maxHeight: 100 },
                { height: 20 },
                {
                  cols: [
                    { view: "label", label: "Срочность:", align: "center" },
                    { id: "urgen", view: "label", label: "", align: "left", css: {} }
                  ]
                },
                {
                  cols: [
                    { view: "label", label: "Состояние:", align: "center" },
                    { id: "statu", view: "label", label: "", align: "left" }
                  ]
                },
                {
                  cols: [
                    { view: "label", label: "Оценочное время:", align: "center" },
                    { id: "mTime", view: "label", label: "", align: "left" }
                  ]
                },
                {
                  cols: [
                    { view: "label", label: "Фактическое время:", align: "center" },
                    { id: "fTime", view: "label", label: "", align: "left" }
                  ]
                },
                {
                  cols: [
                    { view: "label", label: "Сотрудник:", align: "center" },
                    { id: "stA", view: "label", label: "", align: "left" }
                  ]
                },
                { height: 100 },
              ]
            }
          ]
        }
      ]
    }
  };

  //при нажатии на Добавить
  _createTask() { let tmp = webix.ui(clasWT.getView("create")); tmp.show(); };

  //при нажатии на Редактировать
  _updateTask() {
    let str = $$('tableT').getSelectedItem();
    if (str != null) {
      let tmp = webix.ui(clasWT.getView("update", str));
      tmp.show();
      clasWT.viewUpdate(str);
    }
  };

  //при нажатии на Удалить
  _deleteTask() {
    let str = $$('tableT').getSelectedItem();
    if (str != null) {
      let tmp = webix.ui(clasWT.getView("delete", str));
      tmp.show();
    }
  };

  //отрисовка информации о задаче в поле
  _getInfo() {
    let itm = $$('tableT').getSelectedItem();
    $$('infTas').define("value", itm.Описание);
    $$('infTas').refresh();
    $$('urgen').define("label", itm.Срочность);
    $$('urgen').refresh();
    $$('statu').define("label", itm.Состояние);
    $$('statu').refresh();
    if (itm["Оценочное время"] != 0) {
      $$('mTime').define("label", itm["Оценочное время"]);
      $$('mTime').refresh();
    }
    else {
      $$('mTime').define("label", "");
      $$('mTime').refresh();
    }
    if (itm["Фактическое время"] != 0) {
      $$('fTime').define("label", itm["Фактическое время"]);
      $$('fTime').refresh();
    }
    else {
      $$('fTime').define("label", "");
      $$('fTime').refresh();
    }
    if (itm.Сотрудник != 0 || itm.Сотрудник != "") {
      $$('stA').define("label", itm.Сотрудник);
      $$('stA').refresh();
    }
    else {
      $$('stA').define("label", "");
      $$('stA').refresh();
    }
  };

  //поиск по указанным значениям
 async _filtration() {
    let strFIO = $$('filtrFI').getValue();
    let strStatus = $$('filtrSos').getValue();
    let strSrochno = $$('filtrSro').getValue();
    let nameProj = $$('textTitle3').getValue();
    let arr = await modlTask.getAllData(Number(nameProj));//все задачи проекта
    let arrSta = await modlStaf.getAllData(); //все сотрудники
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arrSta.length; j++) {
        if (arrSta[j].Номер == arr[i].Сотрудник) {
          arr[i].Сотрудник = arrSta[j].Фамилия + " " + arrSta[j].Имя + " " + arrSta[j].Отчество;
          break;
        }
      }
    }
    //если все пустые
    if (strFIO == "" && strStatus == "" && strSrochno == "") {
      getViewData(Number(nameProj));
    }
    //если выбрано срочность
    if (strFIO == "" && strStatus == "" && strSrochno != "") {
      let tmp = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].Срочность == strSrochno) {
          tmp.push(arr[i]);
        }
      }
      $$('tableT').clearAll();
      $$('tableT').define("data", tmp);
      $$('tableT').refresh();
    }
    //если выбрано состояние
    if (strFIO == "" && strStatus != "" && strSrochno == "") {
      let tmp = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].Состояние == strStatus) {
          tmp.push(arr[i]);
        }
      }
      $$('tableT').clearAll();
      $$('tableT').define("data", tmp);
      $$('tableT').refresh();
    }
    //если выбрано состояние и срочность
    if (strFIO == "" && strStatus != "" && strSrochno != "") {
      let tmp = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].Состояние == strStatus && arr[i].Срочность == strSrochno) {
          tmp.push(arr[i]);
        }
      }
      $$('tableT').clearAll();
      $$('tableT').define("data", tmp);
      $$('tableT').refresh();
    }
    //если выбрано сотрудник
    if (strFIO != "" && strStatus == "" && strSrochno == "") {
      let tmp = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].Сотрудник == strFIO) {
          tmp.push(arr[i]);
        }
      }
      $$('tableT').clearAll();
      $$('tableT').define("data", tmp);
      $$('tableT').refresh();
    }
    //если выбрано сотрудник и срочность
    if (strFIO != "" && strStatus == "" && strSrochno != "") {
      let tmp = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].Сотрудник == strFIO && arr[i].Срочность == strSrochno) {
          tmp.push(arr[i]);
        }
      }
      $$('tableT').clearAll();
      $$('tableT').define("data", tmp);
      $$('tableT').refresh();
    }
    //если выбрано сотрудник и состояние
    if (strFIO != "" && strStatus != "" && strSrochno == "") {
      let tmp = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].Сотрудник == strFIO && arr[i].Состояние == strStatus) {
          tmp.push(arr[i]);
        }
      }
      $$('tableT').clearAll();
      $$('tableT').define("data", tmp);
      $$('tableT').refresh();
    }
    //если все выбрано
    if (strFIO != "" && strStatus != "" && strSrochno != "") {
      let tmp = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].Сотрудник == strFIO && arr[i].Состояние == strStatus && arr[i].Срочность == strSrochno) {
          tmp.push(arr[i]);
        }
      }
      $$('tableT').clearAll();
      $$('tableT').define("data", tmp);
      $$('tableT').refresh();
    }
    clearInfo();
  }
}
//доп ф-я для отрисовки задач выбранного проекта
export async function getViewData(item) {
  let arr = await modlTask.getAllData(Number(item));
  let arrSta = await modlStaf.getAllData();
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arrSta.length; j++) {
      if (arrSta[j].Номер == arr[i].Сотрудник) {
        arr[i].Сотрудник = arrSta[j].Фамилия + " " + arrSta[j].Имя + " " + arrSta[j].Отчество;
        break;
      }
    }
  }
  $$('tableT').clearAll();
  $$('tableT').define("data", arr);
  $$('tableT').refresh();
  $$('textTitle3').define("value", Number(item));
  $$('textTitle3').refresh();
  let staf = [];
  staf.push("");
  let stafPro = await modlStaf.getDataProj();
  let tmpIndex = [];
  for (let k = 0; k < stafPro.length; k++) {
    if (stafPro[k].IdProj == Number(item)) {
      tmpIndex.push(stafPro[k].IdStaff);
    }
  }
  for (let c = 0; c < tmpIndex.length; c++) {
    for (let s = 0; s < arrSta.length; s++) {
      if (arrSta[s].Номер == tmpIndex[c]) {
        staf.push(arrSta[s].Фамилия + " " + arrSta[s].Имя + " " + arrSta[s].Отчество);
        break;
      }
    }
  }
  $$('filtrFI').define("options", staf);
  $$('filtrFI').refresh();
};

//доп ф-я для стирания информации в поле и выбора строки
export function clearInfo() {
  $$('infTas').define("value", "");
  $$('infTas').refresh();
  $$('urgen').define("label", "");
  $$('urgen').refresh();
  $$('statu').define("label", "");
  $$('statu').refresh();
  $$('mTime').define("label", "");
  $$('mTime').refresh();
  $$('fTime').define("label", "");
  $$('fTime').refresh();
  $$('stA').define("label", "");
  $$('stA').refresh();
  $$('tableT').unselect();
};