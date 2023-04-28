export interface ILink{
    _id:string
    link:string
    idCreator:string
    fingerprintCreator:string
}
export interface IUSer{
    _id:string
    data:{
        name:string,
        surname:string,
        userLink:number;
    }
}
export interface IRegUser{
    _id:string
    fingerprint:string
    password:string
    isActivated:boolean
    refreshToken:string | null
}