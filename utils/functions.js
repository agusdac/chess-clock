import { translate } from '../utils/localizable/localizable'

const MIN_IN_MILISECONDS = 60 * 1000
const SEC_IN_MILISECONDS = 1000
const SEC_20_IN_MILISECONDS = 20 * 1000

const AppFunctions = {
  getIncrementDescription: function (type) {
    switch (type) {
      case 'D':
        return 'Delay'
      case 'B':
        return 'Bronstein'
      default:
        return 'Fischer'
    }
  },
  getLocalizedTimeDescription: function (time) {
    let mins = time / (60 * 1000)
    if (mins >= 1) { //minutos
      let minutesString = translate('minutes')
      if (mins === 1) return '1 ' + minutesString.substring(0, minutesString.lastIndexOf('s'))
      else {
        if (mins * 60 % 60) {
          return Math.floor(mins) + ':' + ((time / 1000 % 60) < 10 ? '0' : '') + (time / 1000 % 60) + ' ' + minutesString
        }
        return mins + ' ' + minutesString
      }
    } else { //segundos
      let secs = time / 1000
      let secondsString = translate('seconds')
      if (secs === 1) return '1 ' + secondsString.substring(0, secondsString.lastIndexOf('s'))
      else return secs + ' ' + secondsString
    }
  },
  formatTime: function (time) {
    let min = (Math.floor(time / MIN_IN_MILISECONDS) % 60)
    let sec = Math.floor(time / SEC_IN_MILISECONDS) % 60
    if (sec < 10) sec = `0${sec}`
    if (time < SEC_20_IN_MILISECONDS) sec += `.${Math.floor(time / 100) % 10}`
    return `${min}:${sec}`
  }
}


export default AppFunctions;
