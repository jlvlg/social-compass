export interface User {
  id?: string;
  name?: string;
  username?: string;
  email?: string;
  birthdate?: string;
  image?: string;
  sex?: string;
  address?: string;
  phone?: string;
  occupation?: string;
  token?: string;
}

export interface Comment {
  id: string;
  content: string;
  postId: string;
  createdAt: string;
  updatedAt: string;
  author: {
    image?: string;
    name: string;
    id: string;
  };
}

export interface Post {
  id: string;
  text: string;
  location?: string;
  likes: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
  author: {
    image?: string;
    name: string;
    id: string;
  };
  comments: Comment[];
}
