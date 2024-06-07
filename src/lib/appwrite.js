import { Client, Databases, Account, Query, Avatars } from "appwrite";

const client = new Client();
const projectId = import.meta.env.VITE_PROJECT_ID;
const databaseId = import.meta.env.VITE_DATABASE_ID;
const collectionId = import.meta.env.VITE_COLLECTION_ID;
client.setEndpoint("https://cloud.appwrite.io/v1").setProject(projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const avatars = new Avatars(client);

export async function getCurrentUserEmail() {
  try {
    const user = await account.get();
    return user.email;
  } catch (error) {
    console.log("Error retrieving user:", error);
    throw error;
  }
}

export async function getInitials() {
  try {
    const result = avatars.getInitials();
    return result;
  } catch (error) {
    throw new Error("Error getting initials");
  }
}

export async function getDocumentIdByEmail(email) {
  try {
    const response = await databases.listDocuments(databaseId, collectionId, [
      Query.equal("email", email),
    ]);

    if (response.total > 0) {
      return response.documents[0].$id;
    } else {
      throw new Error("No document found for the provided email");
    }
  } catch (error) {
    console.log("Error fetching document:", error);
    throw error;
  }
}

export async function getDocumentByEmail(email) {
  try {
    const result = await databases.listDocuments(databaseId, collectionId, [
      Query.equal("email", email),
    ]);

    if (result.documents.length > 0) {
      return result.documents[0];
    } else {
      console.log("No document found for this email.");
      return null;
    }
  } catch (error) {
    console.error("Error querying document:", error);
    return null;
  }
}

export async function getUserXp() {
  const email = await getCurrentUserEmail();
  console.log("Getting XP...");

  if (email) {
    const document = await getDocumentByEmail(email);
    console.log(document);

    if (document && "xp" in document) {
      console.log(document.xp);
      return document.xp;
    } else {
      console.log("XP attribute not found in the document.");
      return null;
    }
  } else {
    console.log("User email not found.");
    return null;
  }
}

export async function updateDocument(documentId, data) {
  try {
    await databases.updateDocument(databaseId, collectionId, documentId, data);
    console.log("Document updated successfully");
  } catch (error) {
    console.log("Error updating document:", error);
    throw error;
  }
}
