import {ID, Account, Databases, Client, Storage} from 'appwrite';

const client = new Client();

client.setEndpoint('https://cloud.appwrite.io/v1');
client.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const storage = new Storage(client);
const account = new Account(client);
const database = new Databases(client);

export {client, storage, account, database, ID};