export interface IUser {
  _id: string;
  username: string;
}

export interface IBook {
  _id: string;
  author: string;
  cover: string;
  createdAt: string;
  isbn: string;
  pages: number;
  published: number;
  status: "new" | "reading" | "finished";
  title: string;
  updatedAt: string;
}
