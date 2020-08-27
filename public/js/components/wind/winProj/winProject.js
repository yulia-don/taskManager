import { windMods } from "../winMods.js";
import { modlProj } from "../../../models/projM.js";
import { modlStaf } from "../../../models/stafM.js";
import { clearInfoP } from "../../proj/proj.js";

let arrIn = [];
let arrOut = [];

class winProj {
  //отображение нужного окна
  getView(mod, item = "") {
    let result;
    switch (mod) {
      case windMods.create: result = this._getViewCreate(); break;
      case windMods.update: result = this._getViewUpdate(item); break;
      case windMods.updateStaf: result = this._getViewUpdateStaf(item); break;
      case windMods.delete: result = this._getViewDelete(item); break;
      default: break;
    }
    return result;
  }

  //окно создания проекта
  _getViewCreate() {
    return {
      view: "window", id: "adProj", position: "center", modal: true, move: true,
      head: {
        view: "toolbar", elements: [
          {/* id: "pr", */view: "label", label: "Создание проекта" },
          {
            view: "icon", icon: "wxi-close", click: function () {
              $$("adProj").hide();
            }
          }
        ]
      },
      body: {
        rows: [
          { id: "namPr", view: "text", label: "Название:", value: "", labelWidth: 100 },
          { id: "infoPr", view: "textarea", label: "Описание:", value: "", labelWidth: 100 },
          { view: "button", value: "Создать", click: this._addProject },
        ]
      }
    }
  }

  //окно редактирования проекта
  _getViewUpdate(item) {
    return {
      view: "window", id: "redProj", position: "center", modal: true, move: true,
      head: {
        view: "toolbar", elements: [
          { view: "label", label: "Редактирование проекта" },
          {
            view: "icon", icon: "wxi-close", click: function () {
              $$("redProj").hide();
            }
          }
        ]
      },
      body: {
        rows: [
          { id: "indexP", view: "text", label: "", value: item.Номер, labelWidth: 100, hidden: true },
          { id: "namPrr", view: "text", label: "Название:", value: item.Название, labelWidth: 100 },
          { id: "infoPrr", view: "textarea", label: "Описание:", value: item.Описание, labelWidth: 100 },
          { view: "button", value: "Сохранить", click: this._updatePro },
        ]
      }
    }
  }


  //окно редактирования сотрудников в проекте
  _getViewUpdateStaf(item) {
    return {
      view: "window", id: "updStaffy", position: "center", modal: true, move: true,
      head: {
        view: "toolbar", elements: [
          { view: "label", label: "Сотрудники" },
          { id: "textName", view: "text", label: "", value: item, hidden: true },
          {
            view: "icon", icon: "wxi-close", click: function () {
              $$("updStaffy").hide(); arrIn = []; arrOut = [];
            }
          }
        ]
      },
      body: {
        cols: [
          {
            rows: [
              { view: "label", label: "Не в проекте:", align: "center" },
              {
                id: "tabInUpdAll", view: "datatable", columns: [
                  { id: "Фамилия", header: "Фамилия", width: 150 },
                  { id: "Имя", header: "Имя", width: 100 },
                  { id: "Отчество", header: "Отчество", width: 150 }
                ],
                data: "", scroll: "y", select: "row", width: 400
              }
            ]
          },
          {
            rows: [
              { height: 100, width: 80 },
              { view: "button", value: "→", click: this._staInPro, inputWidth: 50, align: "center" },
              { height: 10 },
              { view: "button", value: "←", click: this._staOutPro, inputWidth: 50, align: "center" },
              { height: 100 },
              { view: "button", value: "ОК", click: this._saveResult, inputWidth: 50, align: "center" },
              { height: 20 }
            ]
          },
          {
            rows: [
              { view: "label", label: "В проекте:", align: "center" },
              {
                id: "tabInUpd", view: "datatable", columns: [
                  { id: "Фамилия", header: "Фамилия", width: 150 },
                  { id: "Имя", header: "Имя", width: 100 },
                  { id: "Отчество", header: "Отчество", width: 150 }
                ],
                data: "", scroll: "y", select: "row", width: 400
              }
            ]
          }
        ]
      }
    }
  }

  //окно удаления проекта
  _getViewDelete(item) {
    return {
      view: "window", id: "quest1", position: "center", modal: true, move: true,
      head: {
        view: "toolbar", elements: [
          { view: "label", label: "Внимание" },
          {
            view: "icon", icon: "wxi-close", click: function () {
              $$("quest1").hide();
            }
          }
        ]
      },
      body: {
        rows: [
          { view: "label", label: "Вы уверены, что хотите удалить проект?", fillspace: true, align: "center" },
          { id: "indexDel", view: "label", label: "", value: item.Номер, hidden: true },
          {
            cols: [
              { view: "button", value: "Да", click: this._deleteProj },
              { view: "button", value: "Нет", click: function () { $$("quest1").hide() } }
            ]
          },
        ]
      }
    }
  }

  //данные с полей добавления сохраняет и отправляет в модель
  _addProject() {
    let project = {
      Name: "",
      Information: "",
    };
    project.Name = $$('namPr').getValue();
    project.Information = $$('infoPr').getValue();
    if (project.Name == "" || project.Information == "") {
      alert("Заполните все поля")
    }
    else {
      modlProj.create(project);
      let arr = modlProj.getAllData();
      $$('tableP').clearAll();
      $$('tableP').define("data", arr);
      $$('tableP').refresh();
      $$("adProj").hide();
    }
  }

  //данные с полей редактирования проекта сохраняет и отправляет в модель
  _updatePro() {
    let project = {
      Id:"",
      Name: "",
      Information: "",
    }
    let index = $$('indexP').getValue();
    project.Id = Number(index);
    project.Name = $$('namPrr').getValue();
    project.Information = $$('infoPrr').getValue();
    if (project.Name == "" || project.Information == "") {
      alert("Заполните все поля")
    }
    else {
      modlProj.update(project);
      let arr = modlProj.getAllData();
      $$('tableP').clearAll();
      $$('tableP').define("data", arr);
      $$('tableP').refresh();
      $$("redProj").hide();
      clearInfoP();
    }
  }

  //реализация кнопки В проект в окне редактирования сотрудника
  _staInPro() {
    let item = {
      Фамилия: "",
      Имя: "",
      Отчество: "",
      Номер: ""
    };
    let selectedItem = $$('tabInUpdAll').getSelectedItem();
    item.Фамилия = selectedItem.Фамилия;
    item.Имя = selectedItem.Имя;
    item.Отчество = selectedItem.Отчество;
    item.Номер= selectedItem.Номер;
    arrIn.push(item);
    let index;
    for (let l = 0; l < arrOut.length; l++) {
      if (item.Фамилия == arrOut[l].Фамилия && item.Имя == arrOut[l].Имя) {
        index = l;
        break;
      }
    }
    arrOut.splice(index, 1);
    $$('tabInUpdAll').clearAll();
    $$('tabInUpdAll').define("data", arrOut);
    $$('tabInUpdAll').refresh();
    $$('tabInUpd').clearAll();
    $$('tabInUpd').define("data", arrIn);
    $$('tabInUpd').refresh();
  }

  //реализация кнопки ИЗ проекта в окне редактирования сотрудника
  _staOutPro() {
    let item = {
      Фамилия: "",
      Имя: "",
      Отчество: "",
      Номер: ""
    };
    let selectedItem = $$('tabInUpd').getSelectedItem();
    item.Фамилия = selectedItem.Фамилия;
    item.Имя = selectedItem.Имя;
    item.Отчество = selectedItem.Отчество;
    item.Номер= selectedItem.Номер;
    arrOut.push(item);
    let index;
    for (let l = 0; l < arrIn.length; l++) {
      if (item.Фамилия == arrIn[l].Фамилия && item.Имя == arrIn[l].Имя) {
        index = l;
        break;
      }
    }
    arrIn.splice(index, 1);
    $$('tabInUpdAll').clearAll();
    $$('tabInUpdAll').define("data", arrOut);
    $$('tabInUpdAll').refresh();
    $$('tabInUpd').clearAll();
    $$('tabInUpd').define("data", arrIn);
    $$('tabInUpd').refresh();
  }

  //реализация кнопки ОК в окне редактирования сотрудников
  async _saveResult() {
    let nameProj = $$('tableP').getSelectedItem();
    let idPro=Number(nameProj.Номер);
    let arrAll=await modlStaf.getDataProj();
    let arrBefore=[];
    for (let i = 0; i < arrAll.length; i++) {
      if(arrAll[i].IdProj==idPro){
        arrBefore.push(arrAll[i]);
      }
    }
    for (let k = 0; k < arrBefore.length; k++) {
      let bol=false;
      for (let l = 0; l < arrIn.length; l++) {
        if(arrBefore[k].IdStaff==arrIn[l].Номер){
          bol=true;
          break;
        }
      }
      if(bol==false){
        modlStaf.deleteStafInPro(Number(arrBefore[k].Id));
      }
    }
    for (let k = 0; k < arrIn.length; k++) {
      let bol=false;
      for (let l = 0; l < arrBefore.length; l++) {
        if(arrBefore[l].IdStaff==arrIn[k].Номер){
          bol=true;
          break;
        }
      }
      if(bol==false){
        let item={
          Id:"",
          IdProj:"",
          IdStaff:"",
        }
        item.IdProj=Number(idPro);
        item.IdStaff=Number(arrIn[k].Номер);
        modlStaf.addStafInPro(item);
      }
    }
    arrIn = [];
    arrOut = [];
    $$("updStaffy").hide();
    clearInfoP();
  }

  //заполнение таблиц в окне редактирования сотрудников
  async gettingInfo(idPr) {
    let arrayAll =await modlStaf.getAllData();
    let arrayAllPro =await modlStaf.getDataProj(); 
    let arrayYes = [];
    let arrayNo = [];
    for (let i = 0; i < arrayAllPro.length; i++) {
      if (idPr == arrayAllPro[i].IdProj) {
        arrayYes.push(arrayAllPro[i]);
        arrIn.push(arrayAllPro[i]);
      }
    }
    for (let g = 0; g < arrayYes.length; g++) {
      for (let b = 0; b < arrayAll.length; b++) {
        if(arrayAll[b].Номер==arrayYes[g].IdStaff){
          arrayYes[g]=arrayAll[b];
          arrIn[g]=arrayAll[b];
          break;
        }
      }
    }
    let tmp = false;
    for (let l = 0; l < arrayAll.length; l++) {
      for (let k = 0; k < arrayYes.length; k++) {
        if (arrayAll[l].Фамилия == arrayYes[k].Фамилия && arrayAll[l].Имя == arrayYes[k].Имя) {
          tmp = true;
          break;
        }
      }
      if (tmp == false) {
        arrayNo.push(arrayAll[l]);
        arrOut.push(arrayAll[l]);
      }
      tmp = false;
    }
    $$('tabInUpdAll').clearAll();
    $$('tabInUpdAll').define("data", arrayNo);
    $$('tabInUpdAll').refresh();
    $$('tabInUpd').clearAll();
    $$('tabInUpd').define("data", arrayYes);
    $$('tabInUpd').refresh();
  }

  //удаление по номеру проекта 
  _deleteProj() {
    let index = $$('indexDel').getValue();
    modlProj.delete(Number(index));
    let arr = modlProj.getAllData();
    $$('tableP').clearAll();
    $$('tableP').define("data", arr);
    $$('tableP').refresh();
    clearInfoP();
    $$("quest1").hide();
  }
}

export let clasWP = new winProj();