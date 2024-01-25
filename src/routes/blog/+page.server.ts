import { getArticles } from '$lib/articles';
import type { Article } from '$lib/types';

export async function load() {
    let articles: Article[] = await getArticles('blog')

    return { articles }
}