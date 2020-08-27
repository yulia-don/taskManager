import { modlStaf } from '../../models/stafM.js';
import { clasWS } from '../wind/winStaf/winStaff.js';

export class staffComp {
  constructor() {
    this.array = modlStaf.getAllData();
  }

  //отрисовка контента сотрудники
  getView() {
    return {
      rows: [
        { id: "textTitle2", view: "label", label: "Сотрудники", value: "Сотрудники", readOnly: true, height: 40, align: "center" },
        {
          cols: [
            { id: "addBtn2", view: "button", value: "Добавить", inputWidth: 100, click: this._createStaf, height: 50, align: "right" },
            { id: "updateBtn2", view: "button", value: "Редактировать", inputWidth: 150, click: this._updateStaf, height: 50, align: "center" },
            { id: "deletBtn2", view: "button", value: "Удалить", inputWidth: 100, click: this._deleteStaf, height: 50, align: "left" },
          ]
        },
        {
          id: "tableS",
          view: "datatable",
          columns: [
            //{ id: "Номер", header: "№", width: 50 },
            { id: "Фамилия", header: "Фамилия", width: 250 },
            { id: "Имя", header: "Имя", width: 250 },
            { id: "Отчество", header: "Отчество", width: 250 },
            { id: "Должность", header: "Должность", fillspace: true },
            { id: "email", header: "Почта", width: 200 }
          ],
          data: this.array,
          scroll: "y",
          select: "row"
        }
      ]
    }
  };

  //при нажатии на Добавить
  _createStaf() { let tmp = webix.ui(clasWS.getView("create")); tmp.show(); };

  //при нажатии на Редактировать
  _updateStaf() {
    let str = $$('tableS').getSelectedItem();
    if (str != null) {
      let tmp = webix.ui(clasWS.getView("update", str));
      tmp.show();
    }
  };

  //при нажатии на Удалить
  _deleteStaf() {
    let str = $$('tableS').getSelectedItem();
    if (str != null) {
      let tmp = webix.ui(clasWS.getView("delete", str));
      tmp.show();
    }
  };
}
