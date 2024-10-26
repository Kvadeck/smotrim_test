import cdnApiInstance from '@/utils/apiInstance'
import { MAIN_THEMES_PERSONS, PERSONS, PICTURE_SIZES } from '@/constants'
import type { Person, PersonById } from '@/types/personTypes'
import _ from 'lodash'

type apiService = {
  getPersons: () => Promise<Person[]>
  getPersonById: <T extends number | null>(id: T) => Promise<PersonById>
}

const apiService: apiService = {
  async getPersons() {
    const rootData = await cdnApiInstance.get('/api/v1/boxes/vesti2')
    const mainThemesPersonsData = _.find(rootData.data.data.content, function <
      T extends { id: number },
    >(item: T) {
      return item.id === MAIN_THEMES_PERSONS.id
    })
    const personsThemeData = _.find(mainThemesPersonsData.content, function <
      T extends { id: number },
    >(item: T) {
      return item.id === PERSONS.id
    })
    return personsThemeData.content
  },
  async getPersonById(id) {
    const rootData = await cdnApiInstance.get(`/api/v1/persons/${id}`)
    const data = rootData.data.data

    const mdPicture = _.find(data.pictures[0].sizes, function <
      T extends { preset: string },
    >(item: T) {
      return item.preset === PICTURE_SIZES.md
    })

    return {
      anons: data.anons,
      body: data.body,
      name: data.name,
      surname: data.surname,
      mdPictureLink: mdPicture.url,
    }
  },
}

export default apiService
