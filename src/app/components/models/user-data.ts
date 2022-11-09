export interface UserData { 
    user: {
        id: number,
        firstname: string,
        lastname: string,
        email: string,
        password: string,
        photoUrl: string
    }, 
    isAuth: boolean  
}