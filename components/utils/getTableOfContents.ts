import slugger from 'github-slugger'

export function getTableOfContents(mdxContent) {
  const regexp = new RegExp(/^(### |## )(.*)((\r\n)|\n)/, 'gm')
  const headings = [...mdxContent.matchAll(regexp)]
  let tableOfContents = [] as any[]

  if (headings.length) {
    tableOfContents = headings.map((heading) => {
      const headingText = heading[2].trim()
      const headingType = heading[1].trim() === '##' ? 'h2' : 'h3'
      const headingLink = slugger.slug(headingText, false)

      return {
        text: headingText,
        id: headingLink,
        level: headingType,
      }
    })
  }
  return tableOfContents
}
