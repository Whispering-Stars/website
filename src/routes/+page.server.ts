import { getProjectsArticles, getBlogArticles, getTeamArticles } from '$lib/articles';
import type { ProjectArticle, BlogArticle, TeamArticle } from '$lib/types';

export async function load() {
    const projectArticles: ProjectArticle[] = await getProjectsArticles()
    const blogArticles: BlogArticle[] = await getBlogArticles()
    const teamArticles: TeamArticle[] = await getTeamArticles()

    return { projectArticles, blogArticles, teamArticles }
}