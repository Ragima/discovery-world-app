export interface Post {
   id:number,
   userId:number,
   dateOfCreate?: string,
   likes?: string[],
   comments?: string[],
   photo: string,
   cityName: string,
   description: string,
   photoUrl: string,
   tags: string
}