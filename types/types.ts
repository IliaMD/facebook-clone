import { StaticImageData } from "next/image";
import { Timestamp } from "firebase/firestore";

export type ProfilesType = {
  name: string;
  photo: StaticImageData;
};

export type StoriesType = {
  profile: StaticImageData;
  background: StaticImageData;
};

export type PostType = {
  id: string;
  userName: string;
  profileImg: string;
  caption: string;
  timestamp: Timestamp;
  isLoaded: boolean;
  haveMedia: boolean;
  image?: string;
  video?: string;
};

export type LikeType = {
  username: string;
  id: string;
};

export type CommentsType = {
  username: string;
  profileImg: string;
  comment: string;
  timestamp: Timestamp;
  id: string;
};
