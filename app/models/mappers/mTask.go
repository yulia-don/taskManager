package mappers

import (
	"app/app/models/entity"
	"database/sql"
	"fmt"

	_ "github.com/lib/pq"
)

//TaskMapper ...
type TaskMapper struct {
	db *sql.DB
}

//GetAllTask ...
func (m *TaskMapper) GetAllTask() *[]entity.Task {
	connStr := "user=postgres password=123 dbname=taskManager sslmode=disable"
	db, erro := sql.Open("postgres", connStr)
	if erro != nil {
		fmt.Println("ошибка подключения", erro)
	}
	defer db.Close()

	rows, err := db.Query("select * from task")
	if err != nil {
		fmt.Println("ошибка запроса селект")
	}
	defer rows.Close()
	task := []entity.Task{}

	for rows.Next() {
		p := entity.Task{}
		err := rows.Scan(&p.Id, &p.Information, &p.Mtime, &p.Ftime, &p.IdProject, &p.Name, &p.Status, &p.Urgency, &p.IdStaff)
		if err != nil {
			fmt.Println("ошибка чтения скана", err)
			continue
		}
		task = append(task, p)
	}

	return &task
}

//CreateTask ...
func (m *TaskMapper) CreateTask(task *entity.Task) {
	connStr := "user=postgres password=123 dbname=taskManager sslmode=disable"
	db, erro := sql.Open("postgres", connStr)
	if erro != nil {
		fmt.Println("ошибка подключения", erro)
	}
	defer db.Close()

	data, err := db.Exec(`insert into task (name, information, status, urgency, fk_id_project, mtime, ftime, fk_id_staff) values ( $1, $2, $3, $4, $5, $6, $7, $8)`, task.Name, task.Information, task.Status, task.Urgency, task.IdProject, 0, 0, 0)
	if err != nil {
		fmt.Println("ошибка ", err)
	}
	fmt.Println(data)
}

//UpdateTask ...
func (m *TaskMapper) UpdateTask(task *entity.Task) {
	connStr := "user=postgres password=123 dbname=taskManager sslmode=disable"
	db, erro := sql.Open("postgres", connStr)
	if erro != nil {
		fmt.Println("ошибка подключения", erro)
	}
	defer db.Close()

	data, err := db.Exec(`update task set name=$1, information=$2, status=$3, urgency=$4, fk_id_project=$5, mtime=$6, ftime=$7, fk_id_staff=$8  where id=$9`, task.Name, task.Information, task.Status, task.Urgency, task.IdProject, task.Mtime, task.Ftime, task.IdStaff, task.Id)
	if err != nil {
		fmt.Println("ошибка ", err)
	}
	fmt.Println(data)
}

//DeleteTask ...
func (m *TaskMapper) DeleteTask(index *int) {
	connStr := "user=postgres password=123 dbname=taskManager sslmode=disable"
	db, erro := sql.Open("postgres", connStr)
	if erro != nil {
		fmt.Println("ошибка подключения", erro)
	}
	defer db.Close()

	data, err := db.Exec(`delete from task where id=$1`, index)
	if err != nil {
		fmt.Println("ошибка ", err)
	}
	fmt.Println(data)
}
