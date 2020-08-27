package providers

import (
	//	"github.com/revel/revel"
	"app/app/models/entity"
	"app/app/models/mappers"

	"database/sql"
)

//ProjectProvider ...
type ProjectProvider struct {
	mapper *mappers.ProjectMapper
	db     *sql.DB
}

//GetAllProject ...
func (p *ProjectProvider) GetAllProject() *[]entity.Project {
	tmp := p.mapper.GetAllProject()
	return tmp
}

//CreateProject ...
func (p *ProjectProvider) CreateProject(project *entity.Project) {
	p.mapper.CreateProject(project)
}

//UpdateProject ...
func (p *ProjectProvider) UpdateProject(project *entity.Project) {
	p.mapper.UpdateProject(project)
}

//DeleteProject ...
func (p *ProjectProvider) DeleteProject(index *int) {
	p.mapper.DeleteProject(index)
}
