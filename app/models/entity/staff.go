package entity

//Staff ...
type Staff struct {
	Id    int
	Fname string
	Name  string
	Sname string
	Place string
	Email string
}

//StaffIn ...
type StaffIn struct {
	Id      int
	IdProj  int
	IdStaff int
}
