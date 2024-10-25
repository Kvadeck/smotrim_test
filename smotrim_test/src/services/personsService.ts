import cdnApiInstance from '@/utils/apiInstance'
import { MAIN_THEMES_PERSONS, PERSONS } from '@/constants'
import _ from 'lodash'

const apiService = {
  async getPersons() {
    const rootData = await cdnApiInstance.get('/api/v1/boxes/vesti2')
    const mainThemesPersonsData = _.find(
      rootData.data.data.content,
      function (item) {
        return item.id === MAIN_THEMES_PERSONS.id
      },
    )
    return _.find(mainThemesPersonsData.content, function (item) {
      return item.id === PERSONS.id
    })
  },
  async getPersonById<T extends null | number>(id:T) {
    const rootData = await cdnApiInstance.get(`/api/v1/persons/${id}`)
    return rootData.data
  },
}

export default apiService
