import MarkdownIt from 'markdown-it'

const renderer = new MarkdownIt()

export function renderMarkdown(md: string) {
  return renderer.render(md)
}
