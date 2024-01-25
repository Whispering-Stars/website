import { getArticle } from '$lib/articles'
import { error } from '@sveltejs/kit'

export async function load({ params }) {
    console.log(params)
    try {
        return {
            article: await getArticle(params.slug),
        }
    } catch (e) {
        return error(404, 'Article not found')
    }
}