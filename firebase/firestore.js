/**
 * Stores biometric inputs and AI outputs
 */

import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { app } from "./firebaseConfig.js";

const db = getFirestore(app);

export async function saveSessionData(data) {
  try {
    await addDoc(collection(db, "sessions"), {
      ...data,
      timestamp: new Date()
    });
  } catch (error) {
    console.error("Firestore error:", error);
  }
}