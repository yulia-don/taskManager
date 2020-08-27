package providers

import (
	//	"github.com/revel/revel"
	"app/app/models/entity"
	"app/app/models/mappers"

	"database/sql"
)

//TaskProvider ...
type TaskProvider struct {
	mapper *mappers.TaskMapper
	db     *sql.DB
}

//GetAllTask ...
func (p *TaskProvider) GetAllTask() *[]entity.Task {
	tmp := p.mapper.GetAllTask()
	return tmp
}

//CreateTask ...
func (p *TaskProvider) CreateTask(task *entity.Task) {
	p.mapper.CreateTask(task)
}

//UpdateTask ...
func (p *TaskProvider) UpdateTask(task *entity.Task) {
	p.mapper.UpdateTask(task)
}

//DeleteTask ...
func (p *TaskProvider) DeleteTask(index *int) {
	p.mapper.DeleteTask(index)
}
