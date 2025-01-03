import conf from '../conf/conf'
import { Client, ID, Databases, Query, Storage } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    // Create a Post
    async createPost({title, slug, content, featuredImage, status, userId}){
        try{
            return await this.databases.createDocument(
                conf.appwriteDatabaseId, conf.appwriteCollectionId, slug,
                {
                    title, content, featuredImage, status, userId,
                }
            )
        }catch(error){
            console.log("Error :: createPost", error)
        }
    }

    // Update the Post
    async updatePost(slug, {title, content, featuredImage, status}){
        try{
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, 
                {title, content, featuredImage, status,}
            )
        }
        catch(error){
            console.log("Error :: updatePost", error)
        }
    }

    // Delete the Post
    async deletePost(slug){
        try{
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId, conf.appwriteCollectionId, slug
            )
            return true
        }
        catch(error){
            console.log("Error :: deletePost", error)
        }
        return false
    }

    // Get Post 
    async getPost(slug){
        try{
            return await this.databases.getDocument(
                conf.appwriteDatabaseId, conf.appwriteCollectionId, slug
            )
        }
        catch(error){
            console.log("Error :: getPost", error)
        }
    }

    // Get all Active Post
    async getPosts(queries = [Query.equal("status", "active")]){
        try{
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId, conf.appwriteCollectionId, queries,
            )
        }
        catch(error){
            console.log("Error :: getPosts", error)
        }
    }

    // file upload service
    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                conf.appwriteBucketId, ID.unique(), file
            )
        }
        catch(error){
            console.log("Error :: uploadFile", error)
        }
    }

    // Delete File
    async deleteFile(fileId){
        try{
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        }
        catch(error){
            console.log("Error :: deleteFile", error)
        }
    }

    // File Preview
    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId, fileId
        )
    }
}

const service = new Service()

export default service