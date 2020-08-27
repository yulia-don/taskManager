package controllers

import (
	"app/app/models/entity"
	"app/app/models/providers"

	"github.com/revel/revel"
)

// CStaff is ...
type CStaff struct {
	*revel.Controller
	provider providers.StaffProvider
}

//GetAllStaff ...
func (c *CStaff) GetAllStaff() revel.Result {
	arSta := c.provider.GetAllStaff()

	return c.RenderJSON(arSta)
}

//GetStaffInProject ...
func (c *CStaff) GetStaffInProject() revel.Result {
	arSta := c.provider.GetStaffInProject()

	return c.RenderJSON(arSta)
}

//CreateStaff ...
func (c *CStaff) CreateStaff() revel.Result {
	staff := entity.Staff{}
	c.Params.BindJSON(&staff)
	c.provider.CreateStaff(&staff)
	return c.RenderJSON(staff)
}

//ProjectAddStaff ...
func (c *CStaff) ProjectAddStaff() revel.Result {
	staff := entity.StaffIn{}
	c.Params.BindJSON(&staff)
	c.provider.ProjectAddStaff(&staff)
	return c.RenderJSON(staff)
}

//UpdateStaff ...
func (c *CStaff) UpdateStaff() revel.Result {
	staff := entity.Staff{}
	c.Params.BindJSON(&staff)
	c.provider.UpdateStaff(&staff)
	return c.RenderJSON(&staff)
}

//DeleteStaff ...
func (c *CStaff) DeleteStaff() revel.Result {
	var index int
	c.Params.BindJSON(&index)
	c.provider.DeleteStaff(&index)
	return c.RenderJSON(&index)
}

//ProjectDelStaff ...
func (c *CStaff) ProjectDelStaff() revel.Result {
	var index int
	c.Params.BindJSON(&index)
	c.provider.ProjectDelStaff(&index)
	return c.RenderJSON(&index)
}
