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

