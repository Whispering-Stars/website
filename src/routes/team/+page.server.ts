import { getArticles } from '$lib/articles';
import type { Article } from '$lib/types';

export async function load() {
    const articles: Article[] = await getArticles('team')

    return { articles }
}