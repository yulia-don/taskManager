package controllers

import (
	"app/app/models/entity"
	"app/app/models/providers"

	"github.com/revel/revel"
)

// CTask is ...
type CTask struct {
	*revel.Controller
	provider providers.TaskProvider
}

//GetAllTask ...
func (c *CTask) GetAllTask() revel.Result {
	arr := c.provider.GetAllTask()

	return c.RenderJSON(arr)
}

//CreateTask ...
func (c *CTask) CreateTask() revel.Result {
	task := entity.Task{}
	c.Params.BindJSON(&task)
	c.provider.CreateTask(&task)
	return c.RenderJSON(task)
}

//UpdateTask ...
func (c *CTask) UpdateTask() revel.Result {
	task := entity.Task{}
	c.Params.BindJSON(&task)
	c.provider.UpdateTask(&task)
	return c.RenderJSON(&task)
}

//DeleteTask ...
func (c *CTask) DeleteTask() revel.Result {
	var index int
	c.Params.BindJSON(&index)
	c.provider.DeleteTask(&index)
	return c.RenderJSON(&index)
}
