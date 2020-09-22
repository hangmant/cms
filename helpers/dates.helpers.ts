import moment from 'moment'

export const parseMessageDate = (date: number | string | Date, message) => {
  const momentDate = moment(date)
  let messageDate: string
  const daysAgo = moment.duration(moment(moment.now()).diff(momentDate)).asDays()
  if (daysAgo >= 0.1) {
    //? eso es un dia
    messageDate = momentDate.format('D/M/Y')
  } else {
    messageDate = momentDate.fromNow()
  }
  // console.log('Dante: daysAgo', daysAgo, message)
  return {
    messageDate,
    fullDate: momentDate.format('dddd, MMMM Do YYYY, h:mm:ss a'),
  }
}
