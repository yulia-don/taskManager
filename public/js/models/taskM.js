class modelTask {
  async create(item) {
    let response = await fetch('/task/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(item)
    });
  }
  async update(item) {
    let response = await fetch('/task/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(item)
    });
  }
  async delete(index) {
    let response = await fetch('/task/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(index)
    });
  }
  getAllData(idProj) {
    async function getJson() {
      let promise = await fetch('/task');
      let json;
      if (promise.ok) {
        json = await promise.json();
      } else {
        alert(promise.json());
      }
      let arr = [];
      for (let key in json) {
        if (idProj == json[key].IdProject) {
          let item = {
            Номер: "",
            Название: "",
            Описание: "",
            Срочность: "",
            Состояние: "",
            "Оценочное время": "",
            "Фактическое время": "",
            Проект: "",
            Сотрудник: ""
          }
          item.Номер = json[key].Id;
          item.Название = json[key].Name;
          item.Описание = json[key].Information;
          item.Срочность = json[key].Urgency;
          item.Состояние = json[key].Status;
          item["Оценочное время"] = json[key].Mtime;
          item["Фактическое время"] = json[key].Ftime;
          item.Проект = json[key].IdProject;
          item.Сотрудник = json[key].IdStaff;
          arr.push(item);
        }
      }
      return arr;
    }
    let tmp=getJson();
    return tmp;
  }
}
export let modlTask = new modelTask();
