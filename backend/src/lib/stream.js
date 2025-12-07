import {StreamChat} from "stream-chat";
import {ENV} from "./env.js";

const apiKey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SECRET;

if(!apiKey || !apiSecret) {
  console.error("Stream API key and secret must be set in environment variables");
}

export const chatClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async(userData)=>{
    try{
        await chatClient.upsertUser(userData)
        console.log("Stream User upserted Successfully",userData);
    } catch (error) {
        console.error("Error upserting Stream user:", error);
        
    }
};

export const deleteStreamUser = async(userId)=>{
    try{
        await chatClient.deleteUsers(userId)
        console.log("Stream User Deleted Successfully",userId);
    } catch (error) {
        console.error("Error upserting Stream user:", error);
        
    }
};

//todo:something to handle user tokens?