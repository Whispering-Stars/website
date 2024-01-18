import { json } from '@sveltejs/kit'
import type { BlogArticle } from '$lib/types'

export async function GET() {
    const articles = await getArticles()
    return json(articles)
}