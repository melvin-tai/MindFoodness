/**
 * Handles Firebase Authentication
 */

import {
  getAuth,
  signInAnonymously
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { app } from "./firebaseConfig.js";

const auth = getAuth(app);

export async function signInUser() {
  try {
    const result = await signInAnonymously(auth);
    console.log("User signed in:", result.user.uid);
    return result.user.uid;
  } catch (error) {
    console.error("Authentication error:", error);
  }
}