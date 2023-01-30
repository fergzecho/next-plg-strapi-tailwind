import { gql } from "@apollo/client"

export const GET_ALL_POSTS = gql`
    query getAllPosts {
        posts {
            data {
            attributes {    
                Slug
            }
            }
        }
    }
`;

export const GET_SINGLE_POST = gql`
    query getPostBySlug($slug: String!) {
        posts(filters: { Slug: { eq: $slug} }) {
            data {
            attributes {
                Title
                Slug
                Content
                FeaturedImage {
                    data {
                        attributes {
                        url
                        }
                    }
                }
                Authors {
                    data {
                        attributes {
                            first_name
                            last_name
                        }
                    }
                }
            }
            }
        }   
    }
`;

export const FILTERED_POSTS = gql`
    query getAllPosts {
        posts {
            data {
            attributes {
                Title
                Slug
                FeaturedImage {
                data {
                    attributes {
                    url
                    }
                }
                }
                Authors {
                data {
                    attributes {
                    first_name
                    last_name
                    }
                }
                }
            }
            }
        }
    }
`;


