import { json } from '@sveltejs/kit'
import type { ExperienceArticle } from '$lib/types'
import { parseMarkdownFiles } from '$lib/utils'

async function getArticles() {
    let articles: ExperienceArticle[] = await parseMarkdownFiles('experiences')

    articles = articles.filter((article) => article.published)
    articles = articles.sort((a, b) => a.name.localeCompare(b.name))

    return articles
}

export async function GET() {
    const articles = await getArticles()
    return json(articles)
}