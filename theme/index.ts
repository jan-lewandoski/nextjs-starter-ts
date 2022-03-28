import { extendTheme } from '@chakra-ui/react'

import { colors } from './colors'
import { styles } from './styles'

const overrides = {
  styles,
  colors,
}

export default extendTheme(overrides)
