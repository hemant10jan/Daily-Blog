import conf from "../conf/conf";
import { Client,Account,ID } from "appwrite";

export class AuthServices {
    client=new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.account=new Account(this.client);
    }

    async createAccount({email,password,name}){
        try{
            const userAccount=await this.account.create(ID.unique(),email,password,name);
            if(userAccount){ 
                return this.login({email,password});
                // return userAccount
            }
            else{
                return userAccount;
            }
        }
        catch(err){
            console.log(err);
        }
    }

    async login({email,password}){
        try{
            return await this.account.createEmailPasswordSession(email,password);
        }
        catch(err){
            console.log(err);
        }
    }

    async getCurrentUser(){
        try{
            return await this.account.get();
        }
        catch(err){
            console.log(err);
        }

        return null;
    }

    async logout(){
        try{
            await this.account.deleteSessions();
        }
        catch(err){
            console.log(err);
        }
    }

}

const authService=new AuthServices();

export default authService;