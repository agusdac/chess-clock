import { translate } from '../utils/localizable/localizable'

const AppFunctions = {
  getIncrementDescription: function(type) {
    switch (type) {
      case 'D':
        return 'Delay'
      case 'B':
        return 'Bronstein'
      default:
        return 'Fischer'
    }
  },
  getLocalizedTimeDescription: function(time) {
    let mins = time / (60 * 1000)
    if (mins >= 1) { //minutos
      let minutesString = translate('minutes')
      if (mins === 1) return '1 ' + minutesString.substring(0,minutesString.lastIndexOf('s'))
      else {
        if (mins * 60 % 60) {
          return Math.floor(mins) + ':' + (time / 1000 % 60) + ' ' + minutesString
        }
        return mins + ' ' + minutesString
      }
    } else { //segundos
      let secs = time / 1000
      let secondsString = translate('seconds')
      if (secs === 1) return '1 ' + secondsString.substring(0,secondsString.lastIndexOf('s'))
      else return secs + ' ' + secondsString
    }
  },
}


export default AppFunctions;
