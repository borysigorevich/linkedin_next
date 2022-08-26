import {MongoClient, Db} from "mongodb";

let uri: string = process.env.MONGODB_URI!;

let cachedClient: MongoClient
let cachedDb: Db

if (!uri) {
    throw new Error(
        "Please define the MONGODB_URI environment variable inside .env.local"
    );
}

export const connectToDatabase = async () => {
    if (cachedClient && cachedDb) {
        return {client: cachedClient, db: cachedDb};
    }

    const client = await MongoClient.connect(uri!);

    const db = await client.db('linkedin');

    cachedClient = client;
    cachedDb = db;

    return {client, db};
}