export interface Post {
  author: string;
  created: number;
  date: string;
  img: string;
  isLiked: boolean;
  numberComm: number;
  numberLikes: number;
}

export interface CommentPost {
  author: string;
  comment: string;
  created: number;
  date: string;
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
  sender: string;
  datetime: string;
  timestamp: number;
  message: string;
}

export interface PreviewMessage {
  idChat: string;
  name: string;
  date: string;
  photo: string;
  lastMessage: string;
}
export interface UserData {
  name: string;
  photoUrl: string;
}

