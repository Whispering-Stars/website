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
    published: boolean;
};

export type ProjectArticle = {
    title: string;
    description: string;
    slug: string;
    date: string;
    tags: string[];
    cover: string;
    published: boolean;
};

export type ExperienceArticle = {
    name: string;
    position: string;
    slug: string;
    date: string;
    cover: string;
    published: boolean;
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
    published: boolean;
}