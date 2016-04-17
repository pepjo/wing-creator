
import * as Colors from 'material-ui/lib/styles/colors'
import ColorManipulator from 'material-ui/lib/utils/color-manipulator'
import Spacing from 'material-ui/lib/styles/spacing'
import zIndex from 'material-ui/lib/styles/zIndex'

export default {
  spacing: Spacing,
  zIndex,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: '#ff7777',
    primary2Color: Colors.blueGrey800,
    primary3Color: Colors.blueGrey700,
    accent1Color: '#ff7777',
    accent2Color: Colors.blueGrey900,
    accent3Color: Colors.blueGrey500,
    textColor: Colors.darkBlack, // darkBlack
    alternateTextColor: Colors.white, // white
    canvasColor: Colors.white,
    borderColor: Colors.blueGrey900,
    disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.4),
    pickerHeaderColor: Colors.blueGrey600,
  },
}
