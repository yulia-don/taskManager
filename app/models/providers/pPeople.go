package providers

import (
	//	"github.com/revel/revel"
	"app/app/models/entity"
	"app/app/models/mappers"

	"database/sql"
)

//PeopleProvider ...
type PeopleProvider struct {
	mapper *mappers.PeopleMapper
	db     *sql.DB
}

//GetOnePeople ...
func (p *PeopleProvider) GetOnePeople(login *string) *entity.People {
	tmp := p.mapper.GetOnePeople(login)
	return tmp
}

//CreatePeople ...
func (p *PeopleProvider) CreatePeople(people *entity.People) {
	p.mapper.CreatePeople(people)
}
