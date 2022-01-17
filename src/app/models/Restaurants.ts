export interface Pagination {
  current_page: number;
  next_page?: string;
  previous_page?: string;
  total_pages: number;
  total_entries: number;
  per_page: number;
}
