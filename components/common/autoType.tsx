import React, { useEffect, useState } from 'react'
import { chakra } from '@chakra-ui/react'

interface Iporps {
  className?: string,
  text: string,
  delay?: number
}

const AutoType = (props: Iporps) => {
  const {className, text, delay = 150} = props
  const [index, setIndex] = useState(0)
  const [typingText, setTypingText] = useState('')

  useEffect(() => {
    setTypingText('')
    setIndex(0)
  }, [text])

  useEffect(() => {
    let time
     if(index < text.length) {
        time = setTimeout(() => {
          setTypingText(typingText + text[index])
           setIndex(index + 1)
        }, delay)
     }
     return () => {
       window.clearTimeout(time)
     }
  }, [index])

  return (
    <chakra.div className={className}>
        <chakra.span>{typingText}</chakra.span>
        <chakra.span animation={"1s infinite typeBlink"}>_</chakra.span>
    </chakra.div>
  )
}

export default AutoType