import { Likes } from './likes';
export interface Post {
   id:number,
   userId:number,
   dateOfCreate: string,
   dateOfUpdate: string,
   likes: Likes[],
   comments: Comment[],
   geoLocation: {latitude: string, longitude: string},
   photo: string,
   cityName: string,
   description: string,
   photoUrl?: string,
   tags: string
}