import type { NavigationRoute } from "$lib/types";

export const navigationRoutes: Array<NavigationRoute> = [
    {
        name: 'Projects',
        path: '/projects'
    },
    {
        name: 'Blog',
        path: '/blog'
    },
    {
        name: 'Experience',
        path: '/experience'
    }
];

export function formatDate(date: string) {
    return new Date(date).toLocaleDateString('default', { year: 'numeric', month: 'long', day: 'numeric' })
}