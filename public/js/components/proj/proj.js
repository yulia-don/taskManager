import { clasWP } from '../wind/winProj/winProject.js';
import { modlProj } from '../../models/projM.js';
import { getViewData, clearInfo } from '../task/task.js';
import { modlStaf } from '../../models/stafM.js';

export class projectComp {
  constructor() {
    this.array = modlProj.getAllData();
  };

  //отрисовка контента проекты
  getView() {
    return {
      rows: [
        { id: "textTitle1", view: "label", label: "Проекты", value: "Проекты", readOnly: true, height: 40, align: "center" },
        {
          cols: [
            { id: "addBtn1", view: "button", value: "Добавить", inputWidth: 100, click: this._createProj, height: 50, align: "right" },
            { id: "updateBtn1", view: "button", value: "Редактировать", inputWidth: 150, click: this._updateProj, height: 50, align: "center" },
            { id: "deletBtn1", view: "button", value: "Удалить", inputWidth: 100, click: this._deleteProj, height: 50, align: "left" },
          ]
        },
        {
          cols: [
            {
              id: "tableP",
              view: "datatable",
              columns: [
                //{ id: "Номер", header: "№", width: 50 },
                { id: "Название", header: "Название", fillspace: true }
              ],
              data: this.array,
              on: { onItemClick: this._getInfo },
              scroll: "y",
              select: "row"
            },
            {
              id: "tmpField",
              rows: [
                { height: 20 },
                {
                  cols: [
                    { view: "label", label: "Название: ", align: "right" },
                    { id: "namePr", view: "label", label: "", align: "left" }
                  ]
                },
                { view: "label", label: "Описание:", align: "center" },
                { id: "infPro", view: "textarea", value: "", readonly: true, maxHeight: 100 },
                {
                  cols: [
                    { view: "label", label: "Сотрудники:", align: "right" },
                    { id: "staffy", view: "button", value: "Редактировать", inputWidth: 150, align: "center", width: 265, click: this._updateStafInProj }
                  ]
                },
                { id: "stafPro", view: "list", data: "" },
                { id: "openBtn", view: "button", value: "Открыть проект", inputWidth: 150, click: this._openProj, height: 50, align: "center" }
              ]
            }
          ]
        }
      ]
    }
  };

  //открытие контента задачи
  _openProj() {
    let item = $$('tableP').getSelectedItem();
    if (item != null) {
      $$('content1').hide();
      $$('content2').hide();
      getViewData(item.Номер);
      clearInfo();
      $$('content3').show();
      $$('content4').hide();
      $$('exitBtn').show();
    }
  };

  //при нажатии на Добавить
  _createProj() { let tmp = webix.ui(clasWP.getView("create")); tmp.show(); };

  //при нажатии на Редактировать
  _updateProj() {
    let str = $$('tableP').getSelectedItem();
    if (str != null) {
      let tmp = webix.ui(clasWP.getView("update", str));
      tmp.show();
    }
  };

  //при нажатии на Удалить
  _deleteProj() {
    let str = $$('tableP').getSelectedItem();
    if (str != null) {
      let tmp = webix.ui(clasWP.getView("delete", str));
      tmp.show();
    }
  };

  //при нажатии на Редактировать(сотрудники в проекте)
  _updateStafInProj() {
    let str = $$('tableP').getSelectedItem();
    if (str != null) {
      let tmp = webix.ui(clasWP.getView("updateStaf", str.Название));
      tmp.show();
      clasWP.gettingInfo(str.Номер);
    }
  };

  //отрисовка информации о проекте в поле
  _getInfo() {
    let item = $$('tableP').getSelectedItem();
    $$('namePr').define("label", item.Название);
    $$('namePr').refresh();
    $$('infPro').define("value", item.Описание);
    $$('infPro').refresh();
    
    async function addStaf() {
      let arrSta=await modlStaf.getAllData();
      let staf=[];
      let stafPro=await modlStaf.getDataProj(); 
      let tmpIndex=[];
      for (let k = 0; k < stafPro.length; k++) {
        if(stafPro[k].IdProj==Number(item.Номер)){
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
    $$('stafPro').clearAll();
    $$('stafPro').define("data", addStaf());
    $$('stafPro').refresh();
  };
}

//доп ф-я для стирания информации в поле и выбора строки
export function clearInfoP() {
  $$('namePr').define("label", "");
  $$('namePr').refresh();
  $$('infPro').define("value", "");
  $$('infPro').refresh();
  $$('stafPro').clearAll();
  $$('stafPro').refresh();
  $$('tableP').unselect();
};
