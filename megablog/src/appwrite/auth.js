import conf from '../conf'
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    // Create an Account
    async createAccount({email, password, name}){
        try{

            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if(userAccount){
                // call another method
                return this.login(email, password)
            }
            else{
                return userAccount
            }

        }catch(error){
            throw error;
        }
    }

    // User Login
    async login({ email, password}){
        try{
            return await this.account.createEmailPasswordSession(email , password);
        }
        catch(error){
            throw error;
        }
    }
}

const authService = new AuthService()

export default authService