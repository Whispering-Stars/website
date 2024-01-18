import { getBlogArticle } from '$lib/articles'
import { error } from '@sveltejs/kit'

export async function load({ params }) {
    console.log(params)
    try {
        return {
            article: await getBlogArticle(params.slug),
        }
    } catch (e) {
        console.error(e)
        return error(404, 'Article not found')
    }
}