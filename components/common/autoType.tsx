import React, { useEffect, useState } from 'react'
import { chakra } from '@chakra-ui/react'

interface Iporps {
  className?: string,
  text: string,
  delay?: number
}

const AutoType = (props: Iporps) => {
  const {className, text, delay = 200} = props
  const [index, setIndex] = useState(0)
  const [typingText, setTypingText] = useState('')

  useEffect(() => {
     if(index < text.length) {
        setTimeout(() => {
          setTypingText(typingText + text[index])
           setIndex(index + 1)
        }, delay)
     }
  }, [index])

  return (
    <chakra.div className={className}>
        <chakra.span>{typingText}</chakra.span>
        <chakra.span animation={"0.1s infinite typeBlink"}>_</chakra.span>
    </chakra.div>
  )
}

export default AutoType