export interface SearchHomeProps {
  searchTerm: string;
  error: string;
  onSearchTermChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}