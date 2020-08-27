package mappers

import (
	"app/app/models/entity"
	"database/sql"
	"fmt"

	_ "github.com/lib/pq"
)

//StaffMapper ...
type StaffMapper struct {
	db *sql.DB
}

//GetAllStaff ...
func (m *StaffMapper) GetAllStaff() *[]entity.Staff {
	connStr := "user=postgres password=123 dbname=taskManager sslmode=disable"
	db, erro := sql.Open("postgres", connStr)
	if erro != nil {
		fmt.Println("ошибка подключения", erro)
	}
	defer db.Close()

	rows, err := db.Query("select * from staff")
	if err != nil {
		fmt.Println("ошибка запроса селект")
	}
	defer rows.Close()
	staff := []entity.Staff{}

	for rows.Next() {
		p := entity.Staff{}
		err := rows.Scan(&p.Id, &p.Fname, &p.Name, &p.Sname, &p.Place, &p.Email)
		if err != nil {
			fmt.Println("ошибка чтения скана")
			continue
		}
		staff = append(staff, p)
	}

	return &staff
}

//GetStaffInProject ...
func (m *StaffMapper) GetStaffInProject() *[]entity.StaffIn {
	connStr := "user=postgres password=123 dbname=taskManager sslmode=disable"
	db, erro := sql.Open("postgres", connStr)
	if erro != nil {
		fmt.Println("ошибка подключения", erro)
	}
	defer db.Close()

	rows, err := db.Query("select * from staff_proj")
	if err != nil {
		fmt.Println("ошибка запроса селект", err)
	}
	defer rows.Close()
	staff := []entity.StaffIn{}

	for rows.Next() {
		p := entity.StaffIn{}
		err := rows.Scan(&p.Id, &p.IdProj, &p.IdStaff)
		if err != nil {
			fmt.Println("ошибка чтения скана")
			continue
		}
		staff = append(staff, p)
	}

	return &staff
}

//CreateStaff ...
func (m *StaffMapper) CreateStaff(staff *entity.Staff) {
	connStr := "user=postgres password=123 dbname=taskManager sslmode=disable"
	db, erro := sql.Open("postgres", connStr)
	if erro != nil {
		fmt.Println("ошибка подключения", erro)
	}
	defer db.Close()

	data, err := db.Exec(`insert into staff (fname, name, sname, place, email) values ( $1, $2, $3, $4, $5)`, staff.Fname, staff.Name, staff.Sname, staff.Place, staff.Email)
	if err != nil {
		fmt.Println("ошибка ", err)
	}
	fmt.Println(data)
}

//ProjectAddStaff ...
func (m *StaffMapper) ProjectAddStaff(staff *entity.StaffIn) {
	connStr := "user=postgres password=123 dbname=taskManager sslmode=disable"
	db, erro := sql.Open("postgres", connStr)
	if erro != nil {
		fmt.Println("ошибка подключения", erro)
	}
	defer db.Close()

	data, err := db.Exec(`insert into staff_proj (fk_id_proj, fk_id_staff) values ( $1, $2)`, staff.IdProj, staff.IdStaff)
	if err != nil {
		fmt.Println("ошибка ", err)
	}
	fmt.Println(data)
}

//UpdateStaff ...
func (m *StaffMapper) UpdateStaff(staff *entity.Staff) {
	connStr := "user=postgres password=123 dbname=taskManager sslmode=disable"
	db, erro := sql.Open("postgres", connStr)
	if erro != nil {
		fmt.Println("ошибка подключения", erro)
	}
	defer db.Close()

	data, err := db.Exec(`update staff set fname=$1, name=$2, sname=$3, place=$4, email=$5 where id=$6`, staff.Fname, staff.Name, staff.Sname, staff.Place, staff.Email, staff.Id)
	if err != nil {
		fmt.Println("ошибка ", err)
	}
	fmt.Println(data)
}

//DeleteStaff ...
func (m *StaffMapper) DeleteStaff(index *int) {
	connStr := "user=postgres password=123 dbname=taskManager sslmode=disable"
	db, erro := sql.Open("postgres", connStr)
	if erro != nil {
		fmt.Println("ошибка подключения", erro)
	}
	defer db.Close()

	data, err := db.Exec(`delete from staff where id=$1`, index)
	if err != nil {
		fmt.Println("ошибка ", err)
	}
	fmt.Println(data)
}

//ProjectDelStaff ...
func (m *StaffMapper) ProjectDelStaff(index *int) {
	connStr := "user=postgres password=123 dbname=taskManager sslmode=disable"
	db, erro := sql.Open("postgres", connStr)
	if erro != nil {
		fmt.Println("ошибка подключения", erro)
	}
	defer db.Close()

	data, err := db.Exec(`delete from staff_proj where id=$1`, index)
	if err != nil {
		fmt.Println("ошибка ", err)
	}
	fmt.Println(data)
}
