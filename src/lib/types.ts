export type NavigationRoute = {
    name: string;
    path: string;
};

export type Article = {
    title: string;
    name: string;
    description: string;
    position: string;
    slug: string;
    date: string;
    tags: string[];
    cover: string;
    type: string;
    draft: boolean;
}