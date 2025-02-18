let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: 'Timed event',
    start: todayStr + 'T12:00:00'
  },
  {
    id: createEventId(),
    title: 'Timed event 2',
    start: todayStr + 'T12:15:00'
  },
  {
    id: createEventId(),
    title: 'Timed event 2',
    start: todayStr + 'T12:25:00'
  },

]

export function createEventId() {
  return String(eventGuid++)
}
