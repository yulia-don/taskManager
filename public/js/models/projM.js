class modelProj {
  async create(item) {
    let response = await fetch('/project/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(item)
    });
  }
  async update(item) {
    let response = await fetch('/project/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(item)
    });
  }
  async delete(index) {
    let response = await fetch('/project/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(index)
    });
  }
  getAllData() { 
    async function all() {
      let promise = await fetch('/project');
      let json;
      if (promise.ok) {
        json = await promise.json();
      } else {
        alert(promise.json());
      }
      let arr = [];
      
      for (let key in json) {
        let item={
          Номер:"",
          Название:"",
          Описание:"",
        }
        item.Номер=json[key].Id;
        item.Название=json[key].Name;
        item.Описание=json[key].Information;
        arr.push(item);
      }
      return arr;
    }
    let tmp = all();
    return tmp;
   }
}

export let modlProj = new modelProj();
