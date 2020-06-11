export interface Post {
  comments?: number;
  date?: string;
  likes?: number;
  link?: string;
  created?: number;
}

export interface NewAccount {
  fullName: string;
  profilePhoto: string;
}

export interface Friend {
  id: string;
  name: string;
  photoUrl: string;
}

export interface Message {
  senderId: string;
  datetime: Date;
  timestamp: number;
  message: string;
}
