export type Item = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image?: string;
};

export type NewItem = Omit<Item, "id">;

export type User = {
  id: number;
  name: string;
  password: string;
};

export type AppState = {
  items: Item[];
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
  handleLogin: (userData: User, token: string) => void;
  handleLogout: () => void;
  getItems: () => Promise<void>;
  addItem: (item: NewItem) => Promise<void>;
  updateItem: (item: Item) => Promise<void>;
  deleteItem: (id: number) => Promise<void>;
  login: (username: string, password: string) => Promise<boolean>;
};
