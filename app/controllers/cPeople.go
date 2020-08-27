package controllers

import (
	"app/app/models/entity"
	"app/app/models/providers"

	"github.com/revel/revel"
)

// CPeople is ...
type CPeople struct {
	*revel.Controller
	provider providers.PeopleProvider
}

//GetOnePeople ...
func (c *CPeople) GetOnePeople() revel.Result {
	var login string
	c.Params.BindJSON(&login)
	people := c.provider.GetOnePeople(&login)
	return c.RenderJSON(people)
}

//CreatePeople ...
func (c *CPeople) CreatePeople() revel.Result {
	people := entity.People{}
	c.Params.BindJSON(&people)
	c.provider.CreatePeople(&people)
	return c.RenderJSON(1)
}
