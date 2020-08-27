class modelStaf {
  async create(item) {
    let response = await fetch('/staff/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(item)
    });
  }
  async update(item) {
    let response = await fetch('/staff/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(item)
    });
  }
  
  async delete(index) {
    let response = await fetch('/staff/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(index)
    });
  }
  
  async addStafInPro(item){
    let response = await fetch('/projectAddStaff', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(item)
    });
  }

  async deleteStafInPro(index){
    let response = await fetch('/projectDelStaff', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(index)
    });
  }

  getAllData() {
    async function all() {
      let promise = await fetch('/staff');
      let json;
      if (promise.ok) {
        json = await promise.json();
      } else {
        alert(promise.json());
      }
      let arr = [];

      for (let key in json) {
        let item = {
          Номер: "",
          Фамилия: "",
          Имя: "",
          Отчество: "",
          Должность: "",
          email: "",
        }
        item.Номер = json[key].Id;
        item.Фамилия = json[key].Fname;
        item.Имя = json[key].Name;
        item.Отчество = json[key].Sname;
        item.Должность = json[key].Place;
        item.email = json[key].Email;
        arr.push(item);
      }
      return arr;
    }
    let tmp = all();
    return tmp;
  }
  getDataProj() { 
    async function all() {
      let promise = await fetch('/staffInProject');
      let json;
      if (promise.ok) {
        json = await promise.json();
      } else {
        alert(promise.json());
      }
      
      return json;
    }
    let tmp = all();
    return tmp;
  }
}

export let modlStaf = new modelStaf();

