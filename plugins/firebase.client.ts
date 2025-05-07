import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

export default defineNuxtPlugin(nuxtApp => {
  const config = useRuntimeConfig();

  const firebaseConfig = {
    apiKey: config.public.firebase.apiKey,
    authDomain: config.public.firebase.authDomain,
    projectId: config.public.firebase.projectId,
    storageBucket: config.public.firebase.storageBucket,
    messagingSenderId: config.public.firebase.messagingSenderId,
    appId: config.public.firebase.appId,
    measurementId: config.public.firebase.measurementId,
  };

  // Initialize Firebase
  let app: FirebaseApp;
  try {
    app = initializeApp(firebaseConfig);
  } catch (e) {
    console.error("Failed to initialize Firebase app:", e);
    // You might want to throw an error or handle this more gracefully
    // For now, we'll let it proceed, but auth/firestore will be undefined
    // @ts-ignore
    app = undefined;
  }
  

  let auth: Auth | undefined = undefined;
  let firestore: Firestore | undefined = undefined;

  if (app!) {
    try {
      auth = getAuth(app);
    } catch (e) {
      console.error("Failed to initialize Firebase Auth:", e);
    }

    try {
      firestore = getFirestore(app);
    } catch (e) {
      console.error("Failed to initialize Firebase Firestore:", e);
    }
  }


  // Provide the initialized app, auth, and firestore to the Nuxt app
  // So we can use them globally via useNuxtApp().$firebaseApp, etc.
  nuxtApp.provide('firebaseApp', app!);
  nuxtApp.provide('auth', auth);
  nuxtApp.provide('firestore', firestore);
}); 