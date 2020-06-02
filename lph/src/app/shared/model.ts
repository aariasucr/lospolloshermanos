export interface Post {
  comments?: number;
  date?: string;
  likes?: number;
  link?: string;
  created?: number;
}

export interface NewAccount {
  followers: number;
  following: number;
  fullName: string;
  profilePhoto: string;
}
