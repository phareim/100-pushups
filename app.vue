<template>
  <div>
    <NuxtRouteAnnouncer />
    <h1>Push-up Power! 💪</h1>

    <div v-if="!pendingAuthState">
      <div v-if="currentUser">
        <p>Welcome, {{ currentUser.displayName || 'Friend' }}!</p>
        <p>Email: {{ currentUser.email }}</p>
        <img v-if="currentUser.photoURL" :src="currentUser.photoURL" alt="User Photo" width="50" height="50" style="border-radius: 50%;">
        <button @click="signOutUser">Sign Out</button>
      </div>
      <div v-else>
        <p>Please sign in to track your push-ups!</p>
        <button @click="signInWithGoogle">Login with Google</button>
      </div>
    </div>
    <div v-else>
      <p>Loading authentication state...</p>
    </div>

    <NuxtWelcome />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { User, Auth } from 'firebase/auth';
import { 
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

const nuxtApp = useNuxtApp();
// Ensure $auth is of type Auth | undefined initially
const $auth = nuxtApp.$auth as Auth | undefined;

const currentUser = ref<User | null>(null);
const pendingAuthState = ref(true); // To handle initial auth state loading

const signInWithGoogle = async () => {
  if (!$auth) {
    console.error('Firebase Auth not initialized or available.');
    alert('Login service is not available right now. Please try again later.');
    return;
  }
  const provider = new GoogleAuthProvider();
  try {
    // $auth is now guaranteed to be an Auth instance here
    const result = await signInWithPopup($auth, provider);
    currentUser.value = result.user;
    console.log('User signed in: ', result.user);
  } catch (error) {
    console.error('Error during Google sign-in:', error);
    alert('Failed to sign in with Google. Please check the console for details.');
  }
};

const signOutUser = async () => {
  if (!$auth) {
    console.error('Firebase Auth not initialized or available.');
    return;
  }
  try {
    // $auth is now guaranteed to be an Auth instance here
    await signOut($auth);
    currentUser.value = null;
    console.log('User signed out');
  } catch (error) {
    console.error('Error signing out:', error);
  }
};

// Listen for auth state changes
onMounted(() => {
  if (!$auth) {
    console.error('Firebase Auth not initialized. Cannot listen for auth state changes.');
    pendingAuthState.value = false;
    return;
  }
  // $auth is now guaranteed to be an Auth instance here
  onAuthStateChanged($auth, (user) => {
    currentUser.value = user;
    pendingAuthState.value = false;
    console.log('Auth state changed, user: ', user);
  });
});
</script>

<style scoped>
button {
  margin: 5px;
  padding: 10px 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

img {
  margin-top: 10px;
}
</style>
