package mappers

import (
	"app/app/models/entity"
	"database/sql"
	"fmt"

	_ "github.com/lib/pq"
)

//ProjectMapper ...
type ProjectMapper struct {
	db *sql.DB
}

//GetAllProject ...
func (m *ProjectMapper) GetAllProject() *[]entity.Project {
	connStr := "user=postgres password=123 dbname=taskManager sslmode=disable"
	db, erro := sql.Open("postgres", connStr)
	if erro != nil {
		fmt.Println("ошибка подключения", erro)
	}
	defer db.Close()

	rows, err := db.Query("select * from project")
	if err != nil {
		fmt.Println("ошибка запроса селект")
	}
	defer rows.Close()
	project := []entity.Project{}

	for rows.Next() {
		p := entity.Project{}
		err := rows.Scan(&p.Id, &p.Name, &p.Information)
		if err != nil {
			fmt.Println("ошибка чтения скана")
			continue
		}
		project = append(project, p)
	}

	return &project
}

//CreateProject ...
func (m *ProjectMapper) CreateProject(project *entity.Project) {
	connStr := "user=postgres password=123 dbname=taskManager sslmode=disable"
	db, erro := sql.Open("postgres", connStr)
	if erro != nil {
		fmt.Println("ошибка подключения", erro)
	}
	defer db.Close()

	data, err := db.Exec(`insert into project (name, information) values ( $1, $2)`, project.Name, project.Information)
	if err != nil {
		fmt.Println("ошибка ", err)
	}
	fmt.Println(data)
}

//UpdateProject ...
func (m *ProjectMapper) UpdateProject(project *entity.Project) {
	connStr := "user=postgres password=123 dbname=taskManager sslmode=disable"
	db, erro := sql.Open("postgres", connStr)
	if erro != nil {
		fmt.Println("ошибка подключения", erro)
	}
	defer db.Close()

	data, err := db.Exec(`update project set name=$1, information=$2  where id=$3`, project.Name, project.Information, project.Id)
	if err != nil {
		fmt.Println("ошибка ", err)
	}
	fmt.Println(data)
}

//DeleteProject ...
func (m *ProjectMapper) DeleteProject(index *int) {
	connStr := "user=postgres password=123 dbname=taskManager sslmode=disable"
	db, erro := sql.Open("postgres", connStr)
	if erro != nil {
		fmt.Println("ошибка подключения", erro)
	}
	defer db.Close()

	data, err := db.Exec(`delete from project where id=$1`, index)
	if err != nil {
		fmt.Println("ошибка ", err)
	}
	fmt.Println(data)
}
