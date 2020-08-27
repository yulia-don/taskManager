package mappers

import (
	"app/app/models/entity"
	"database/sql"
	"fmt"

	_ "github.com/lib/pq"
)

//PeopleMapper ...
type PeopleMapper struct {
	db *sql.DB
}

//GetOnePeople ...
func (m *PeopleMapper) GetOnePeople(login *string) *entity.People {
	connStr := "user=postgres password=123 dbname=taskManager sslmode=disable"
	db, erro := sql.Open("postgres", connStr)
	if erro != nil {
		fmt.Println("ошибка подключения", erro)
	}
	defer db.Close()

	rows, err := db.Query(`select * from people where login=$1`, login)
	if err != nil {
		fmt.Println("ошибка запроса селект")
	}
	defer rows.Close()
	people := entity.People{}

	for rows.Next() {
		err := rows.Scan(&people.Id, &people.Login, &people.Password)
		if err != nil {
			fmt.Println("ошибка чтения скана")
			continue
		}
	}

	return &people
}

//CreatePeople ...
func (m *PeopleMapper) CreatePeople(people *entity.People) {
	connStr := "user=postgres password=123 dbname=taskManager sslmode=disable"
	db, erro := sql.Open("postgres", connStr)
	if erro != nil {
		fmt.Println("ошибка подключения", erro)
	}
	defer db.Close()

	data, err := db.Exec(`insert into people (login, password) values ( $1, $2)`, people.Login, people.Password)
	if err != nil {
		fmt.Println("ошибка ", err)
	}
	fmt.Println(data)
}
