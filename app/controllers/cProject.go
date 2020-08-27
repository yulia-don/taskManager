package controllers

import (
	"app/app/models/entity"
	"app/app/models/providers"

	"github.com/revel/revel"
)

// CProject is ...
type CProject struct {
	*revel.Controller
	provider providers.ProjectProvider
}

//GetAllProject ...
func (c *CProject) GetAllProject() revel.Result {
	arr := c.provider.GetAllProject()

	return c.RenderJSON(arr)
}

//CreateProject ...
func (c *CProject) CreateProject() revel.Result {
	project := entity.Project{}
	c.Params.BindJSON(&project)
	c.provider.CreateProject(&project)
	return c.RenderJSON(1)
}

//UpdateProject ...
func (c *CProject) UpdateProject() revel.Result {
	project := entity.Project{}
	c.Params.BindJSON(&project)
	c.provider.UpdateProject(&project)
	return c.RenderJSON(&project)
}

//DeleteProject ...
func (c *CProject) DeleteProject() revel.Result {
	var index int
	c.Params.BindJSON(&index)
	c.provider.DeleteProject(&index)
	return c.RenderJSON(&index)
}
