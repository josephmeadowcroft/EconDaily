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

  if (email) {
    const document = await getDocumentByEmail(email);

    if (document && "xp" in document) {
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

export async function getUserLatestXp() {
  const email = await getCurrentUserEmail();

  if (email) {
    const document = await getDocumentByEmail(email);

    if (document && "latestXp" in document) {
      return document.latestXp;
    } else {
      console.log("Latest XP attribute not found in the document.");
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

export async function checkQuizCompletion() {
  try {
    const user = await account.get();
    const userEmail = user.email;

    // Query the users collection for the document with the user's email
    const response = await databases.listDocuments(databaseId, collectionId, [
      Query.equal("email", userEmail),
    ]);

    if (response.documents.length > 0) {
      const lastCompleted = response.documents[0].lastCompleted;

      console.log(lastCompleted);

      if (lastCompleted) {
        const today = new Date().toISOString().split("T")[0];
        const lastCompletedDate = new Date(lastCompleted)
          .toISOString()
          .split("T")[0];
        console.log(today);
        return lastCompletedDate === today;
      }
    }

    return false;
  } catch (error) {
    console.error("Error checking quiz completion:", error);
    return false;
  }
}

export async function updateQuizCompletion() {
  const today = new Date().toISOString().split("T")[0];

  try {
    const user = await account.get();
    const userEmail = user.email;

    // Query the users collection for the document with the user's email
    const response = await databases.listDocuments(databaseId, collectionId, [
      Query.equal("email", userEmail),
    ]);

    if (response.documents.length > 0) {
      const userDoc = response.documents[0];

      // Update the lastCompleted field
      await databases.updateDocument(databaseId, collectionId, userDoc.$id, {
        lastCompleted: today,
      });
    } else {
      console.error("User document not found");
    }
  } catch (error) {
    console.error("Error updating quiz completion:", error);
  }
}
