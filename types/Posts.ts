export interface PostT {
    data?: PostsAttributesT[] | PostsAttributesT
}

export interface PostsAttributesT {
    __typename: string
    attributes: {
        Title: string
        Slug: string
        FeaturedImage: featuredImageT
        Authors: AuthorT[] | AuthorT | AuthorAttributes | AuthorAttributes[]
        Content: string
    }
}

export interface featuredImageT {
    data: {
        attributes: {
            url: string
        }
    }
}

export interface AuthorT {
    data: AuthorAttributes[] | AuthorAttributes
}

export interface AuthorAttributes {
    __typename?: string
    attributes: {
        first_name: string | null
        last_name: string | null
    }
}