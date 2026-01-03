export interface BookResult {
  id: string;
  title: string;
  sourceTitle: string;
  url: string;
  description?: string;
}

export interface SearchState {
  query: string;
  isLoading: boolean;
  results: BookResult[];
  error: string | null;
  hasSearched: boolean;
}