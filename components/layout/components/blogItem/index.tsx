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
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  MoonIcon,
  SunIcon,
} from "@chakra-ui/icons";
import React from "react";
import TableOfContent from "./table-of-content";

const BlogItem = ({
  children,
  frontMatter,
}: {
  children: React.ReactNode;
  frontMatter: any;
}) => {
  const bg= useColorModeValue('white', 'gray.800')
  if (!frontMatter) return null;
  const { headings = [] } = frontMatter;
  
  return (
    <Box
      maxWidth={1140}
      mx="auto"
      boxShadow="0 12px 15px 0 rgb(0 0 0 / 24%), 0 17px 50px 0 rgb(0 0 0 / 19%)"
      position={"relative"}
    >
      <Box id="content"  
       mx="auto" mb="20px" minH="76vh" 
       borderRadius="0.5rem"
       mt={'-50px'}
       pb={8}
       bg={bg}
       >
        <Flex>
          <Box
            minW="0"
            flex="auto"
            px={{ base: "4", sm: "6", xl: "8" }}
            pt="0"
          >
             {children}
          </Box>
          <TableOfContent
            visibility={headings.length === 0 ? "hidden" : "initial"}
            headings={headings}
          />
        </Flex>
      </Box>
     
    </Box>
  );
};

export default BlogItem;
