import { windMods } from "../winMods.js";
import { modlTask } from "../../../models/taskM.js";
import { getViewData, clearInfo } from "../../task/task.js";
import { modlStaf } from "../../../models/stafM.js";

class winTask {
  //отображение нужного окна
  getView(mod, item = "") {
    let result;
    switch (mod) {
      case windMods.create: result = this._getViewCreate(); break;
      case windMods.update: result = this._getViewUpdate(item); break;
      case windMods.delete: result = this._getViewDelete(item); break;
      default: break;
    }
    return result;
  }

  //окно создания задачи
  _getViewCreate() {
    return {
      view: "window", id: "adTask", position: "center", modal: true, move: true,
      head: {
        view: "toolbar", elements: [
          { view: "label", label: "Добавление задачи" },
          {
            view: "icon", icon: "wxi-close", click: function () {
              $$("adTask").hide();
            }
          }
        ]
      },
      body: {
        rows: [
          { id: "namT", view: "text", label: "Название:", value: "", labelWidth: 100 },
          { id: "infaT", view: "textarea", label: "Описание:", value: "", labelWidth: 100 },
          { id: "ur", view: "select", label: "Срочность:", options: ["Обычная","Срочная","Очень срочная"], labelWidth: 100 },
          { view: "button", value: "Добавить", click: this._addTask },
        ]
      }
    }
  }

  //окно редактирования задачи
  _getViewUpdate(item) {
    return {
      view: "window", id: "redTask", position: "center", modal: true, move: true,
      head: {
        view: "toolbar", elements: [
          { view: "label", label: "Редактирование задачи" },
          {
            view: "icon", icon: "wxi-close", click: function () {
              $$("redTask").hide();
            }
          }
        ]
      },
      body: {
        rows: [
          { id: "indexT", view: "text", label: "", value: item.Номер, labelWidth: 100, hidden: true },
          { id: "ipT", view: "text", label: "", value: item.Проект, labelWidth: 100, hidden: true },
          { id: "namTr", view: "text", label: "Название:", value: item.Название, labelWidth: 100 },
          { id: "infaTr", view: "textarea", label: "Описание:", value: item.Описание, labelWidth: 100 },
          { id: "urr", view: "select", label: "Срочность:", options: ["Обычная","Срочная","Очень срочная"], labelWidth: 100 },
          { id: "statsr", view: "select", label: "Состояние:", options: [], labelWidth: 100 },
          { id: "timer", view: "text", label: "Оценочное время:", value: item["Оценочное время"], labelWidth: 150, hidden: true },
          { id: "ftimer", view: "text", label: "Фактическое время:", value: item["Фактическое время"], labelWidth: 150, hidden: true },
          { id: "stSelr", view: "select", label: "Сотрудник:", options: [], labelWidth: 100, hidden: true },
          { id: "btnAddTar", view: "button", value: "Сохранить", click: this._updateTask },
        ]
      }
    }
  }

  //окно удаления задачи
  _getViewDelete(item) {
    return {
      view: "window", id: "quest3", position: "center", modal: true, move: true,
      head: {
        view: "toolbar", elements: [
          { id: "que3", view: "label", label: "Внимание" },
          {
            view: "icon", icon: "wxi-close", click: function () {
              $$("quest3").hide();
            }
          }
        ]
      },
      body: {
        rows: [
          { view: "label", label: "Вы уверены, что хотите удалить задачу?", fillspace: true, align: "center" },
          { id: "indeDel", view: "label", label: "", value: item.Номер, hidden: true },
          { id: "inpT", view: "text", label: "", value: item.Проект, labelWidth: 100, hidden: true },
          {
            cols: [
              { id: "yes3", view: "button", value: "Да", click: this._deleteTask },
              { id: "no3", view: "button", value: "Нет", click: function () { $$("quest3").hide() } }
            ]
          },
        ]
      }
    }
  }

  //данные с полей добавления сохраняет и отправляет в модель
  _addTask() {
    let task = {
      Name: "",
      Information: "",
      Urgency: "",
      Status: "",
      Mtime: "",
      Ftime: "",
      IdProject: "",
      IdStaff:""
    };
    task.Name = $$('namT').getValue();
    task.Information = $$('infaT').getValue();
    task.Urgency = $$('ur').getValue();
    task.Status = "Новая";
    let index=$$('textTitle3').getValue();
    task.IdProject = Number(index);
    if (task.Name == "" || task.Information == "") {
      alert("Заполните все поля");
    }
    else {
      modlTask.create(task);
      getViewData(task.IdProject);
      $$("adTask").hide();
    }
  }

  //отображение полей в редакторе в зависимости от состояния задачи
  async viewUpdate(name) {
    let status = name.Состояние;
    
    async function addStaf() {
      let arrSta=await modlStaf.getAllData();
      let staf=[];
      staf.push("");
      let stafPro=await modlStaf.getDataProj(); 
      let tmpIndex=[];
      let index=$$('textTitle3').getValue();
      for (let k = 0; k < stafPro.length; k++) {
        if(stafPro[k].IdProj==Number(index)){
          tmpIndex.push(stafPro[k].IdStaff);
        }
      }
      for (let c = 0; c < tmpIndex.length; c++) {
        for (let s = 0; s < arrSta.length; s++) {
          if(arrSta[s].Номер==tmpIndex[c]){
            staf.push(arrSta[s].Фамилия+" "+arrSta[s].Имя+" "+arrSta[s].Отчество); 
            break; 
          }
        }
      }
      return staf;
    }
    let arr = await addStaf();
    switch (status) {
      case "Новая": {
        $$('stSelr').show();
        $$('stSelr').define("options", arr);
        $$('stSelr').refresh();
        $$('timer').hide();
        $$('ftimer').hide();
        $$('statsr').define("options", ["Новая", "Назначена"]);
        $$('statsr').refresh();
        break;
      };
      case "Назначена": {
        $$('stSelr').hide();
        $$('timer').show();
        $$('ftimer').hide();
        $$('statsr').define("options", ["Назначена", "В работе"]);
        $$('statsr').refresh();
        break;
      };
      case "В работе": {
        $$('stSelr').hide();
        $$('timer').hide();
        $$('ftimer').show();
        $$('statsr').define("options", ["В работе", "Завершена"]);
        $$('statsr').refresh();
        break;
      };
      case "Завершена": {
        $$('stSelr').hide();
        $$('timer').hide();
        $$('ftimer').hide();
        $$('statsr').define("options", ["Завершена"]);
        $$('statsr').refresh();
        break;
      };
      default: break;
    }
  }

  //данные с полей редактирования сохраняет и отправляет в модель
  async _updateTask() {
    let task = {
      Id:"",
      Name: "",
      Information: "",
      Urgency: "",
      Status: "",
      Mtime: "0",
      Ftime: "0",
      IdProject: "",
      IdStaff:""
    }
    let tmpIndex=$$('indexT').getValue();
    task.Id=Number(tmpIndex);
    let index=$$('textTitle3').getValue();
    task.IdProject=Number(index);
    let tmpItem = $$('tableT').getSelectedItem();
    let status=tmpItem.Состояние;
    let bool = true;
    
    switch (status) {
      case "Новая": {
        task.Name = $$('namTr').getValue();
        task.Information = $$('infaTr').getValue();
        task.Urgency = $$('urr').getValue();;
        if (task.Name == "" || task.Information == "") {
          alert("Заполните все поля")
          bool = false;
        }
        else {
          bool = true;
          let staf = $$('stSelr').getValue();
          if (staf != "") {
            let arrSta=await modlStaf.getAllData();
            let arrFIO = staf.split(' ');
            for (let i = 0; i < arrSta.length; i++) {
              if(arrSta[i].Фамилия==arrFIO[0] && arrSta[i].Имя==arrFIO[1]){
                staf=arrSta[i].Номер;
                break;
              }
            }
            task.IdStaff = staf;
            task.Status = "Назначена";
          }
          else { 
            task.Status = "Новая"; 
          }
          break;
        }
      };
      case "Назначена": {
        task.Name = $$('namTr').getValue();
        task.Information = $$('infaTr').getValue();
        task.Urgency = $$('urr').getValue();
        if (task.Name == "" || task.Information == "") {
          alert("Заполните все поля")
          bool = false;
        }
        else {
          bool = true;
          let staf = tmpItem.Сотрудник;
            let arrSta=await modlStaf.getAllData();
            let arrFIO = staf.split(' ');
            for (let i = 0; i < arrSta.length; i++) {
              if(arrSta[i].Фамилия==arrFIO[0] && arrSta[i].Имя==arrFIO[1]){
                staf=arrSta[i].Номер;
                break;
              }
            }
          task.IdStaff=staf;
          let tmp=$$('timer').getValue();
          if(tmp!=""&&tmp!=0){
            task.Mtime = tmp;
            task.Status="В работе";
            task.Ftime="0";
          }
          else{
            task.Status="Назначена";
            task.Mtime="0";
            task.Ftime="0";
          }
        }
        break;
      };
      case "В работе": {
        task.Name = $$('namTr').getValue();
        task.Information = $$('infaTr').getValue();
        task.Urgency = $$('urr').getValue();
        if (task.Name == "" || task.Information == "") {
          alert("Заполните все поля")
          bool = false;
        }
        else {
          bool = true;
          let staf = tmpItem.Сотрудник;
            let arrSta=await modlStaf.getAllData();
            let arrFIO = staf.split(' ');
            for (let i = 0; i < arrSta.length; i++) {
              if(arrSta[i].Фамилия==arrFIO[0] && arrSta[i].Имя==arrFIO[1]){
                staf=arrSta[i].Номер;
                break;
              }
            }
          task.IdStaff=staf;
          let tmp=$$('ftimer').getValue();
          if(tmp!=""&&tmp!=0){
            task.Ftime=tmp;
            task.Status="Завершена";
            task.Mtime=tmpItem["Оценочное время"];
          }
          else{
            task.Status="В работе";
            task.Ftime="0";
            task.Mtime=tmpItem["Оценочное время"];
          }
        }
        break;
      };
      case "Завершена": {
        task.Name = $$('namTr').getValue();
        task.Information = $$('infaTr').getValue();
        task.Urgency = $$('urr').getValue();
        if (task.Name == "" || task.Information == "") {
          alert("Заполните все поля")
          bool = false;
        }
        else {
          bool = true;
          let staf = tmpItem.Сотрудник;
            let arrSta=await modlStaf.getAllData();
            let arrFIO = staf.split(' ');
            for (let i = 0; i < arrSta.length; i++) {
              if(arrSta[i].Фамилия==arrFIO[0] && arrSta[i].Имя==arrFIO[1]){
                staf=arrSta[i].Номер;
                break;
              }
            }
          task.IdStaff=staf;
          task.Status="Завершена";
          task.Ftime=tmpItem["Фактическое время"];
          task.Mtime=tmpItem["Оценочное время"];
        }
        break;
      };
      default: break;
    }
    if (bool == true) {
      modlTask.update(task);
      let index=$$('textTitle3').getValue();
      getViewData(Number(index));
      $$("redTask").hide();
      clearInfo();
    }
  }

  //удаление по номеру задачи
  _deleteTask() {
    let index = $$('indeDel').getValue();
    modlTask.delete(Number(index));
    let iindex=$$('textTitle3').getValue();
    getViewData(Number(iindex));
    $$("quest3").hide();
    clearInfo();
  }
}


export let clasWT = new winTask();
