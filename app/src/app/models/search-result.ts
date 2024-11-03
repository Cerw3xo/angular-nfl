export interface ClipsResult {
   displayName: string;
   subtitle: string;
   date: string;
   duration: number;
   link: {
      web: string;
   }
   image: {
      default: string;
   }
}

export interface PlayerResult {
    displayName: string;
    subtitle: string;
    description: string;
    type: string;
    link: {
      web: string;
    }
    image: {
      defaultDark: string;
    }
}

export interface ArticleResult {
   type: string;
   displayName: string;
   byline: string;
   date: string;
   link: {
      web: string;
   }
}

export interface TypeResult<T> {
   type: string;
   totalFound: number;
   contents: T[];

}


export interface SearchResult {
   results: TypeResult<PlayerResult | ArticleResult | ClipsResult>[]
}