import { getBlogArticles } from '$lib/articles';
import type { BlogArticle } from '$lib/types';

export async function load() {
    const articles: BlogArticle[] = await getBlogArticles()

    return { articles }
}