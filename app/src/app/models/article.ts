export interface Article {
    headline: string;
    type: string;
    description: string;
    byline: string;
    dataSourceIdentifier: string;
    
    links: {
        web: {
            href: string;
        }
    }
}