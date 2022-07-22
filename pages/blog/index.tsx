import React from "react";
import { allBlogs } from 'contentlayer/generated'
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useColorMode,
  useDisclosure,
  StackDivider,
  Heading,
  Image,
  chakra
} from "@chakra-ui/react";
import NextLink from 'next/link'

const Blog = () => {
  const bg= useColorModeValue('white', 'gray.800')
  console.log(allBlogs)
  return (
    <Box
      maxWidth={{base: '540px', md: 1140}}
      mx="auto"
      boxShadow="0 12px 15px 0 rgb(0 0 0 / 24%), 0 17px 50px 0 rgb(0 0 0 / 19%)"
      position={'relative'}
      borderRadius="0.5rem"
      bg={bg}
    >
      <Flex>
        <Flex w={{ base: '100%', md: '82%' }} mx="auto">
          <Stack my='12' spacing='14' direction={"column"} w={'100%'} px={3}>
            {allBlogs.map((item) => (
              <Flex key={item._id} flexWrap="wrap">
                <NextLink href={item.url} passHref>
                  <Link _hover={{ textDecor: 'none' }} flex={{base: '0 0 100%', md: '0 0 33.33%'}} px={15}>
                    <Image
                      width={'100%'}
                      boxShadow={'0 5px 11px 0 rgb(0 0 0 / 18%), 0 4px 15px 0 rgb(0 0 0 / 15%)'}
                      height="10rem"
                      objectFit={'cover'}
                      src={item.img}
                      alt=""
                    />
                  </Link>
                </NextLink>
                <Box flex={1} padding={'8px 15px'}>
                  <NextLink href={item.url} passHref>
                    <Link _hover={{ textDecor: 'none' }}>
                      <Heading
                        fontWeight='medium'
                        size='lg'
                        _hover={{ color: 'accent' }}
                      >
                        {item.title}
                      </Heading>
                    </Link>
                  </NextLink>
                  <Text as={'div'}  my="0.5rem" overflow={'hidden'} color='gray.500' lineHeight={'1.4rem'} wordBreak="break-word"  height={'4.5rem'} >
                    {item.description}
                  </Text>
                  <Stack direction={'row'} fontSize='14px' color={'#718096'} spacing={4}>
                    <Box>
                      <chakra.i />
                      <chakra.time>{item.date}</chakra.time>
                    </Box>
                    <Box>
                      <chakra.i />
                      {/* <chakra.span>主题描述</chakra.span> */}
                    </Box>
                  </Stack>
                </Box>
              </Flex>
            ))}
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Blog;
