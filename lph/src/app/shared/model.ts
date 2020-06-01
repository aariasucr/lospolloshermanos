export interface Post {
  comments?: number;
  date?: string;
  likes?: number;
  link?: string;
  key: string;
}

export interface NewAccount {
  followers: number;
  following: number;
  fullName: string;
  profilePhoto: string;
  posts: Array<Post>;
}
