import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

export const formatUTC = (date: string) => dayjs(date).format('MMM DD HH:mm')
export const isValidDate = (date: string) =>
  dayjs(date, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]').isValid()
