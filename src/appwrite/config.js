import conf from "../conf/conf";
import { Client,Databases,Storage,Query,ID } from "appwrite";

export class Service{
    client =new Client();
    database;
    storage;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.database=new Databases(this.client);
        this.storage=new Storage(this.client);
    }

    async createPost({title,content,featuredImage,status,slug,userId}){
        try{
            await this.database.createDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,
                slug,{
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
            return true;
        }
        catch(err){
            console.log(err);
            return true;
        }
    }

    async updatePost(slug,{title,content,featuredImage,status}){
        try{
            return await this.database.updateDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,
                slug,{
                    title,
                    content,
                    featuredImage,
                    status,
                    
                }
            )
        }
        catch(err){
            console.log(err);
        }
    }

    

    async deletePost(slug){
        try{
            await this.database.deleteDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,
                slug
            )
            return true;
        }
        catch(err){
            console.log(err);
            return false;
        }
    }

    async getPost(slug){
        try{
            return await this.database.getDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,
                slug
            )
        }
        catch(err){
            console.log(err);
            return false;
        }
    }

   

    async getPosts(){
        try{
            return await this.database.listDocuments(conf.appwriteDatabaseId,conf.appwriteCollectionId,
                [Query.equal("status","active")]
            )
        }
        catch(err){
            console.log(err);
            return false;
        }
    }

    // File Services

    async deleteFile(fileId){
        try {
            await this.storage.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    async uploadFile(file){
        try{
            return await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
        }
        catch(err){
            console.log(err);
            return false;
        }
    }

    getFilePreview(fileId){
        return this.storage.getFilePreview(conf.appwriteBucketId,fileId)
    }

}

const service=new Service();
export default service;

