export const MAIN_THEMES_PERSONS: { id: number } = {
  id: 2577,
}

export const PERSONS: { id: number } = {
  id: 2579,
}

export const CAROUSEL_BREAKPOINTS: {
  [key: number]: {
    itemsToShow?: number
    snapAlign?: string
    itemsToScroll?: string
  }
} = {
  320: {
    itemsToShow: 1,
    snapAlign: 'center',
    itemsToScroll: '1',
  },
  480: {
    itemsToShow: 2,
    snapAlign: 'center',
  },
  640: {
    itemsToShow: 3,
    snapAlign: 'center',
  },
  1020: {
    itemsToShow: 5,
    snapAlign: 'center',
  },
  1280: {
    itemsToShow: 6,
    snapAlign: 'start',
  },
  1600: {
    itemsToShow: 8,
    snapAlign: 'start',
  },
}
