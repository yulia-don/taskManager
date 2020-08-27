package providers

import (
	//	"github.com/revel/revel"
	"app/app/models/entity"
	"app/app/models/mappers"

	"database/sql"
)

//StaffProvider ...
type StaffProvider struct {
	mapper *mappers.StaffMapper
	db     *sql.DB
}

//GetAllStaff ...
func (p *StaffProvider) GetAllStaff() *[]entity.Staff {
	tmp := p.mapper.GetAllStaff()
	return tmp
}

//GetStaffInProject ...
func (p *StaffProvider) GetStaffInProject() *[]entity.StaffIn {
	tmp := p.mapper.GetStaffInProject()
	return tmp
}

//CreateStaff ...
func (p *StaffProvider) CreateStaff(staff *entity.Staff) {
	p.mapper.CreateStaff(staff)
}

//ProjectAddStaff ...
func (p *StaffProvider) ProjectAddStaff(staff *entity.StaffIn) {
	p.mapper.ProjectAddStaff(staff)
}

//UpdateStaff ...
func (p *StaffProvider) UpdateStaff(staff *entity.Staff) {
	p.mapper.UpdateStaff(staff)
}

//DeleteStaff ...
func (p *StaffProvider) DeleteStaff(index *int) {
	p.mapper.DeleteStaff(index)
}

//ProjectDelStaff ...
func (p *StaffProvider) ProjectDelStaff(index *int) {
	p.mapper.ProjectDelStaff(index)
}
