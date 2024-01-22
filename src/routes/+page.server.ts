import { getBlogArticles, getTeamArticles, getProjectsArticles } from '$lib/articles';
import type { BlogArticle, TeamArticle, ProjectArticle } from '$lib/types';
import type { RequestEvent } from '@sveltejs/kit'

export async function load({ fetch }: RequestEvent) {
    const projectArticles: ProjectArticle[] = await getProjectsArticles()
    const blogArticles: BlogArticle[] = await getBlogArticles()
    const teamArticles: TeamArticle[] = await getTeamArticles()

    return { projectArticles, blogArticles, teamArticles }
}