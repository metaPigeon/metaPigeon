import { Box, BoxProps } from '@chakra-ui/react'
import React from 'react'

function CodeContainer(props: BoxProps) {
  return <Box padding='5' rounded='8px' my='8' bg='rgb(40, 42, 54)' {...props} />
}

export default CodeContainer
