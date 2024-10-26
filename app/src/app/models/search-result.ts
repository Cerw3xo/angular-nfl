export interface PlayerResult {
    displayName: string;
    subtitle: string;
}

export interface TypeResult {
   type: string;
   totalFound: number;
   contents: PlayerResult[];
}


export interface SearchResult {
   results: TypeResult[]
}