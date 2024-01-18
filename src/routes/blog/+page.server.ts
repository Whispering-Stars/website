import { getBlogArticles } from '$lib/articles';
import type { BlogArticle } from '$lib/types';
import type { RequestEvent } from '@sveltejs/kit'

export async function load({ fetch }: RequestEvent) {
    const articles: BlogArticle[] = await getBlogArticles()

    return { articles }
}