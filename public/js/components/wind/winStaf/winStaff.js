import { windMods } from "../winMods.js";
import { modlStaf } from "../../../models/stafM.js";

class winStaf {
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

  //окно создания сотрудника
  _getViewCreate() {
    return {
      view: "window", id: "adStaf", position: "center", modal: true, move: true,
      head: {
        view: "toolbar", elements: [
          { view: "label", label: "Добавление сотрудника" },
          {
            view: "icon", icon: "wxi-close", click: function () {
              $$("adStaf").hide();
            }
          }
        ]
      },
      body: {
        rows: [
          { id: "fN", view: "text", type: "text", attributes: { maxlength: 25, required: "true" }, label: "Фамилия:", value: "", labelWidth: 100 },
          { id: "n", view: "text", type: "text", attributes: { maxlength: 20, required: "true" }, label: "Имя:", value: "", labelWidth: 100 },
          { id: "sN", view: "text", type: "text", attributes: { maxlength: 25, required: "true" }, label: "Отчество:", value: "", labelWidth: 100 },
          { id: "ple", view: "text", type: "text", attributes: { maxlength: 40, required: "true" }, label: "Должность:", value: "", labelWidth: 100 },
          { id: "mail", view: "text", type: "email", attributes: { maxlength: 30, required: "true" }, label: "Email:", value: "", labelWidth: 100 },
          { view: "button", value: "Добавить", click: this._addPerson },
        ]
      }
    }
  }

  //окно редактирования сотрудника
  _getViewUpdate(item) {
    return {
      view: "window", id: "redStaf", position: "center", modal: true, move: true,
      head: {
        view: "toolbar", elements: [
          { view: "label", label: "Редактирование сотрудника" },
          {
            view: "icon", icon: "wxi-close", click: function () {
              $$("redStaf").hide();
            }
          }
        ]
      },
      body: {
        rows: [
          { id: "indexS", view: "text", label: "", value: item.Номер, labelWidth: 100, hidden: true },
          { id: "fNr", view: "text", label: "Фамилия:", value: item.Фамилия, labelWidth: 100 },
          { id: "nr", view: "text", label: "Имя:", value: item.Имя, labelWidth: 100 },
          { id: "sNr", view: "text", label: "Отчество:", value: item.Отчество, labelWidth: 100 },
          { id: "pler", view: "text", label: "Должность:", value: item.Должность, labelWidth: 100 },
          { id: "mailr", view: "text", label: "Email:", value: item.email, labelWidth: 100 },
          { view: "button", value: "Сохранить", click: this._upStaffy },
        ]
      }
    }
  }

  //окно удаления сотрудника
  _getViewDelete(item) {
    return {
      view: "window", id: "quest2", position: "center", modal: true, move: true,
      head: {
        view: "toolbar", elements: [
          { view: "label", label: "Внимание" },
          {
            view: "icon", icon: "wxi-close", click: function () {
              $$("quest2").hide();
            }
          }
        ]
      },
      body: {
        rows: [
          { view: "label", label: "Вы уверены, что", fillspace: true, align: "center" },
          { view: "label", label: "хотите удалить сотрудника?", fillspace: true, align: "center" },
          { id: "inDel", view: "label", label: "", value: item.Номер, fillspace: true, align: "center", hidden: true },
          {
            cols: [
              { view: "button", value: "Да", click: this._deletePers },
              { view: "button", value: "Нет", click: function () { $$("quest2").hide() } }
            ]
          },
        ]
      }
    }
  }

  //данные с полей добавления сохраняет и отправляет в модель
  _addPerson() {
    let person = {
      Fname: "",
      Name: "",
      Sname: "",
      Place: "",
      Email: "",
    };
    person.Fname = $$('fN').getValue();
    person.Name = $$('n').getValue();
    person.Sname = $$('sN').getValue();
    person.Place = $$('ple').getValue();
    person.Email = $$('mail').getValue();
    if (person.Fname == "" || person.Name == "" || person.Sname == "" || person.Place == "" || person.Email == "") {
      alert("Заполните все поля");
    }
    else {
      let boolF = validate(person.Fname);
      if (boolF == false) {
        alert("Фамилия должна содержать только русские буквы");
      }
      let boolI = validate(person.Name);
      if (boolI == false) {
        alert("Имя должно содержать только русские буквы");
      }
      let boolO = validate(person.Sname);
      if (boolO == false) {
        alert("Отчество должно содержать только русские буквы");
      }
      let boolD = validate(person.Place);
      if (boolD == false) {
        alert("Должность должна содержать только русские буквы");
      }
      let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      let boolE = reg.test(person.Email);
      if (boolE == false) {
        alert("Введите корректный email")
      }
      if (boolF == true && boolI == true && boolO == true && boolD == true && boolE == true) {
        modlStaf.create(person);
        let arr = modlStaf.getAllData();
        $$('tableS').clearAll();
        $$('tableS').define("data", arr);
        $$('tableS').refresh();
        $$("adStaf").hide();
      }
    }
    function validate(item) {
      let symbols = item.split("");
      let bool = true;
      for (let i = 0; i < symbols.length; i++) {
        if (/\W/.test(symbols[i])) {
        }
        else { bool = false; }
      }
      return bool;
    }
  }

  //данные с полей редактирования сохраняет и отправляет в модель
  _upStaffy() {
    let person = {
      Id:"",
      Fname: "",
      Name: "",
      Sname: "",
      Place: "",
      Email: "",
    };
    let index=$$('indexS').getValue();
    person.Id=Number(index);
    person.Fname = $$('fNr').getValue();
    person.Name = $$('nr').getValue();
    person.Sname = $$('sNr').getValue();
    person.Place = $$('pler').getValue();
    person.Email = $$('mailr').getValue();
    if (person.Fname == "" || person.Name == "" || person.Sname == "" || person.Place == "" || person.Email == "") {
      alert("Заполните все поля");
    }
    else {
      let boolF = validate(person.Fname);
      if (boolF == false) {
        alert("Фамилия должна содержать только русские буквы");
      }
      let boolI = validate(person.Name);
      if (boolI == false) {
        alert("Имя должно содержать только русские буквы");
      }
      let boolO = validate(person.Sname);
      if (boolO == false) {
        alert("Отчество должно содержать только русские буквы");
      }
      let boolD = validate(person.Place);
      if (boolD == false) {
        alert("Должность должна содержать только русские буквы");
      }
      let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      let boolE = reg.test(person.Email);
      if (boolE == false) {
        alert("Введите корректный email")
      }
      if (boolF == true && boolI == true && boolO == true && boolD == true && boolE == true) {
        modlStaf.update(person);
        let arr = modlStaf.getAllData();
        $$('tableS').clearAll();
        $$('tableS').define("data", arr);
        $$('tableS').refresh();
        $$("redStaf").hide();
      }
      function validate(item) {
        let symbols = item.split("");
        let bool = true;
        for (let i = 0; i < symbols.length; i++) {
          if (/\W/.test(symbols[i])) {
          }
          else { bool = false; }
        }
        return bool;
      }
    }
  }
    //удаление по номеру сотрудника
    _deletePers() {
      let index = $$('inDel').getValue();
      modlStaf.delete(Number(index));
      let arr = modlStaf.getAllData();
      $$('tableS').clearAll();
      $$('tableS').define("data", arr);
      $$('tableS').refresh();
      $$("quest2").hide();
    }
  }

export let clasWS = new winStaf();