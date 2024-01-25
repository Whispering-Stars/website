import { getBlogArticle } from '$lib/articles'
import { error } from '@sveltejs/kit'

export async function load({ params }) {
    try {
        return {
            article: await getBlogArticle(params.slug),
        }
    } catch (e) {
        return error(404, 'Article not found')
    }
}