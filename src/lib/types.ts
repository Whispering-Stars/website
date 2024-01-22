export type NavigationRoute = {
    name: string;
    path: string;
};

export type BlogArticle = {
    title: string;
    description: string;
    slug: string;
    date: string;
    tags: string[];
    cover: string;
    draft: boolean;
};

export type ProjectArticle = {
    title: string;
    description: string;
    slug: string;
    date: string;
    tags: string[];
    cover: string;
    draft: boolean;
};

export type TeamArticle = {
    name: string;
    position: string;
    slug: string;
    date: string;
    cover: string;
    draft: boolean;
};

export type Frontmatter = {
    title: string;
    name: string;
    description: string;
    position: string;
    slug: string;
    date: string;
    tags: string[];
    cover: string;
    draft: boolean;
}