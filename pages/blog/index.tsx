import React from "react";
import { allBlogs } from "contentlayer/generated";
import {
  Box,
  Flex,
  Text,
  Stack,
  Link,
  useColorModeValue,
  Heading,
  Image,
  chakra,
} from "@chakra-ui/react";
import NextLink from "next/link";
import {
  Paginator,
  Container,
  Previous,
  usePaginator,
  Next,
  PageGroup,
} from "chakra-paginator";
import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";

const Blog = () => {
  const bg= useColorModeValue('white', 'gray.800')
 const allBlogs1 = allBlogs.sort((a,b) => {
  if(a.date > b.date) {
    return -1
  } else {
    return 1
  }
})
  const handlePageChange = (nextPage: number) => {
    setCurrentPage(nextPage);
  };
  const {
    pagesQuantity,
    currentPage,
    setCurrentPage,
    pageSize,
  } = usePaginator({
    total: allBlogs.length,
    initialState: {
      pageSize: 10,
      currentPage: 1,
      isDisabled: false,
    },
  });

  const filterBlogs = allBlogs.slice(
    pageSize * (currentPage - 1),
    pageSize * currentPage
  );
  return (
    <Box
      maxWidth={{ base: "540px", md: 1140 }}
      mx="auto"
      boxShadow="0 12px 15px 0 rgb(0 0 0 / 24%), 0 17px 50px 0 rgb(0 0 0 / 19%)"
      position={"relative"}
      borderRadius="0.5rem"
      bg={bg}
      mb={8}
    >
      <Flex>
        <Flex w={{ base: "100%", md: "82%" }} mx="auto">
          <Stack my="12" spacing="14" direction={"column"} w={"100%"} px={3}>
            {filterBlogs.map((item) => (
              <Flex key={item._id} flexWrap="wrap">
                <NextLink href={item.url} passHref>
                  <Link
                    _hover={{ textDecor: "none" }}
                    flex={{ base: "0 0 100%", md: "0 0 33.33%" }}
                    px={15}
                  >
                    <Image
                      width={"100%"}
                      boxShadow={
                        "0 5px 11px 0 rgb(0 0 0 / 18%), 0 4px 15px 0 rgb(0 0 0 / 15%)"
                      }
                      height="10rem"
                      objectFit={"cover"}
                      src={item.img}
                      alt=""
                    />
                  </Link>
                </NextLink>
                <Box flex={1} padding={"8px 15px"}>
                  <NextLink href={item.url} passHref>
                    <Link _hover={{ textDecor: "none" }}>
                      <Heading
                        fontWeight="medium"
                        size="lg"
                        _hover={{ color: "accent" }}
                      >
                        {item.title}
                      </Heading>
                    </Link>
                  </NextLink>
                  <Text
                    as={"div"}
                    my="0.5rem"
                    overflow={"hidden"}
                    color="gray.500"
                    lineHeight={"1.4rem"}
                    wordBreak="break-word"
                    height={"4.5rem"}
                  >
                    {item.description}
                  </Text>
                  <Stack
                    direction={"row"}
                    fontSize="14px"
                    color={"#718096"}
                    spacing={4}
                  >
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
      <Flex justifyContent={'center'} pb={6}>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <Paginator
          currentPage={currentPage}
          pagesQuantity={pagesQuantity}
          onPageChange={handlePageChange}
          normalStyles={{
            bg: "transparent",
            _hover: {
              color: "purple.300",
            },
          }}
          activeStyles={{
            bg: "transparent",
            color: "purple.300",
            _hover: {
              color: "purple.300",
            },
          }}
        >
          <Container>
            <Previous variant="ghost" colorScheme="purple">
              <ChevronLeftIcon></ChevronLeftIcon>
              {/* Or an icon from `react-icons` */}
            </Previous>
            <PageGroup align="center" />
            <Next
              variant="ghost"
              colorScheme="purple"
              background={"transparent"}
              _hover={{
                background: "transparent",
              }}
            >
              <ChevronRightIcon />
              {/* Or an icon from `react-icons` */}
            </Next>
          </Container>
        </Paginator>
      </Flex>
    </Box>
  );
};

export default Blog;

export const getStaticProps = async (ctx: any) => {
  // const params = Array.isArray(ctx.params.slug)
  //   ? ctx.params.slug
  //   : [ctx.params.slug]
  // const blog = allBlogs.find((blog) => blog._id.includes(params.join('/')))
  // const authorData = getMember(blog!.frontMatter.author)
  // blog!.frontMatter.authorData = authorData

  return { props: { title: "博客" } };
};
