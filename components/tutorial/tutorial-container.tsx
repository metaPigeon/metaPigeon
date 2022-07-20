import {
  Box,
  chakra,
  Stack,
  HStack,
  Flex,
  Button,
  Center,
  VStack,
  Heading,
  Text,
} from '@chakra-ui/react'
import { SkipNavContent, SkipNavLink } from '@chakra-ui/skip-nav'
import {
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from '@codesandbox/sandpack-react'
import { useRouter } from 'next/router'
import * as React from 'react'
import EditPageLink from 'components/edit-page-button'
// import SEO from 'components/seo'
import mainPackageJson from 'package.json'
import { t } from 'components/utils/i18n'
import { ErrorBoundary } from 'react-error-boundary'

function useHeadingFocusOnRouteChange() {
  const router = useRouter()

  React.useEffect(() => {
    const onRouteChange = () => {
      const [heading] = Array.from(document.getElementsByTagName('h1'))
      heading?.focus()
    }
    router.events.on('routeChangeComplete', onRouteChange)
    return () => {
      router.events.off('routeChangeComplete', onRouteChange)
    }
  }, [router.events])
}

export interface Heading {
  level: 'h2' | 'h3'
  text: string
  id: string
}

export interface Frontmatter {
  slug?: string
  title: string
  description?: string
  editUrl?: string
  version?: string
  headings?: Heading[]
  publishedDate: Date
  authorData: any
}

interface PageContainerProps {
  frontmatter: Frontmatter
  children: React.ReactNode
  sidebar?: React.ReactElement
  pagination?: React.ReactElement
  files: {
    [x: string]: string
  }
}

function TutorialContainer({
  frontmatter,
  children,
  pagination,
  sidebar,
  files,
}: PageContainerProps) {
  useHeadingFocusOnRouteChange()

  if (!frontmatter) return <></>

  const { title, description, editUrl } = frontmatter

  const dependenciesNames = [
    '@chakra-ui/react',
    'typescript',
    '@emotion/react',
    '@emotion/styled',
    'framer-motion',
  ]

  const dependencies = dependenciesNames.reduce((prev, cur) => {
    return { ...prev, [cur]: mainPackageJson.dependencies[cur] }
  }, {})

  return (
    <Box minH='100vh'>
      <SkipNavLink zIndex={20}>
        {t('component.page-container.skip-to-content')}
      </SkipNavLink>
    </Box>
  )
}

export default TutorialContainer
