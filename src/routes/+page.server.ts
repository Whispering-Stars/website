import { getArticles } from '$lib/articles';
import type { Article } from '$lib/types';

export async function load() {
    const articles: Article[] = await getArticles()

    return {
        projectsArticles: articles.filter((article) => article.type === 'projects'),
        blogArticles: articles.filter((article) => article.type === 'blog'),
        teamArticles: articles.filter((article) => article.type === 'team'),
    }
}