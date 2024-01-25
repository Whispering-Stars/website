import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeFormat from 'rehype-format'
import rehypeCodeTitles from 'rehype-code-titles'
import rehypePrism from 'rehype-prism-plus'
import rehypeStringify from 'rehype-stringify'

import fs from 'fs/promises'
import matter from "gray-matter"
import path from "path"

import type { ProjectArticle, BlogArticle, TeamArticle, Frontmatter } from "./types"

async function parseMarkdownFiles(folder: string) {
    try {
        const articles: any[] = []
        const articlesPath = path.resolve(`articles/${folder}`)
        const folders = await fs.readdir(articlesPath)

        for (const e of folders) {
            const markdownFilePath = path.join(articlesPath, `${e}`)
            const markdownContent = await fs.readFile(markdownFilePath, 'utf-8')
            const { data } = matter(markdownContent)

            articles.push(data)
        }

        return articles
    } catch (e) {
        throw new Error(`Error parsing markdown files: ${e}`)
    }
}

async function markdownToHtml(markdown: string) {
    const { content, data } = matter(markdown)

    const result = await unified()
        .use(remarkParse)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeRaw)
        .use(rehypeFormat)
        .use(rehypeCodeTitles)
        .use(rehypePrism)
        .use(rehypeStringify).process(content)

    return {
        content: result.value as string,
        frontmatter: data as Frontmatter
    }
}

async function parseMarkdownFile(slug: string) {
    try {
        const articlePath = path.resolve(`articles/${slug}.md`)
        const markdownContent = await fs.readFile(articlePath, 'utf-8')
        return markdownToHtml(markdownContent)
    } catch (e) {
        throw new Error(`Error parsing markdown file: ${e}`)
    }
}

export async function getProjectsArticles() {
    let articles: ProjectArticle[] = await parseMarkdownFiles('projects')

    articles = articles
        .filter((article) => !article.draft)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return articles
}

export async function getBlogArticles() {
    let articles: BlogArticle[] = await parseMarkdownFiles('blog')

    articles = articles
        .filter((article) => !article.draft)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return articles
}

export async function getTeamArticles() {
    let articles: TeamArticle[] = await parseMarkdownFiles('team')

    articles = articles.filter((article) => !article.draft)
    articles = articles.sort((a, b) => a.name.localeCompare(b.name))

    return articles
}

export async function getBlogArticle(slug: string) {
    return parseMarkdownFile(path.join('blog', slug))
}