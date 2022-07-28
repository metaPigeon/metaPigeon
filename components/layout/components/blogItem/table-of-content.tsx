import {
  Box,
  BoxProps,
  ListItem,
  OrderedList,
  Text,
  chakra,
  useColorModeValue,
} from '@chakra-ui/react'
import * as React from 'react'
// import { Heading } from 'components/page-container'
import { useScrollSpy } from 'components/hooks/use-scrollspy'
import { t } from 'components/utils/i18n'
export interface Heading {
  level: 'h2' | 'h3'
  text: string
  id: string
}
interface TableOfContentProps extends BoxProps {
  headings: Heading[]
}

function TableOfContent(props: TableOfContentProps) {
  const { headings, ...rest } = props
  const activeId = useScrollSpy(
    headings.map(({ id }) => `[id="${id}"]`),
    {
      rootMargin: '0% 0% -80% 0%',
    },
  )
  const linkColor = useColorModeValue('gray.600', 'gray.400')
  const linkHoverColor = useColorModeValue('gray.900', 'gray.600')
  return (
    <Box
      as='nav'
      aria-labelledby='toc-title'
      maxW='16rem'
      minW="13rem"
      flexShrink={0}
      display={{ base: 'none', xl: 'block' }}
      position='sticky'
      py='10'
      pr='4'
      top='6rem'
      right='0'
      fontSize='sm'
      alignSelf='start'
      maxHeight='calc(100vh - 8rem)'
      overflowY='auto'
      sx={{ overscrollBehavior: 'contain' }}
      ml="15px"
      {...rest}
    >
      <Text
        as='h2'
        id='toc-title'
        textTransform='uppercase'
        fontWeight='bold'
        fontSize='xs'
        color='gray.700'
        _dark={{ color: 'gray.400' }}
        letterSpacing='wide'
      >
        {t('component.table-of-content.on-this-page')}
      </Text>
      <OrderedList spacing={1} ml='0' mt='4' styleType='none'>
        {headings.map(({ id, text, level }) => (
          <ListItem key={id} title={text} ml={level === 'h3' ? '4' : undefined}>
            <chakra.a
              py='1'
              display='block'
              fontWeight={id === activeId ? 'bold' : 'medium'}
              href={`#${id}`}
              aria-current={id === activeId ? 'location' : undefined}
              color={linkColor}
              _hover={{
                color: linkHoverColor,
              }}
            >
              {text}
            </chakra.a>
          </ListItem>
        ))}
      </OrderedList>
    </Box>
  )
}

export default TableOfContent
