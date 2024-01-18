import { getBlogArticles, getExperiencesArticles, getProjectsArticles } from '$lib/articles';
import type { BlogArticle, ExperienceArticle, ProjectArticle } from '$lib/types';
import type { RequestEvent } from '@sveltejs/kit'

export async function load({ fetch }: RequestEvent) {
    const projectArticles: ProjectArticle[] = await getProjectsArticles()
    const blogArticles: BlogArticle[] = await getBlogArticles()
    const experienceArticles: ExperienceArticle[] = await getExperiencesArticles()

    return { projectArticles, blogArticles, experienceArticles }
}