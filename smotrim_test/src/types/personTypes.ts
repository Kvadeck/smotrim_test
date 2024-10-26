export interface Person {
  id: number
  name: string
  description: string
  imageUrl: string
  type: string
  surname: string
  title: string
  origName: string | null
  origSurname: string | null
  picId: number
  url: string
}

export interface PersonById {
  anons: string
  body: string
  name: string
  surname: string
  mdPictureLink: string
}
