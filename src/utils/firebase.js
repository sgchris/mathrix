const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const requiredConfigKeys = Object.entries(firebaseConfig)
  .filter(([, value]) => !value)
  .map(([key]) => key)

export const isFirebaseConfigured = requiredConfigKeys.length === 0

let authPersistencePromise = null
let firebaseServicesPromise = null

async function getFirebaseServices() {
  if (!isFirebaseConfigured) {
    throw new Error(getFirebaseConfigError() || 'Firebase is unavailable.')
  }

  if (!firebaseServicesPromise) {
    firebaseServicesPromise = Promise.all([
      import('firebase/app'),
      import('firebase/auth'),
      import('firebase/firestore'),
    ]).then(([appModule, authModule, firestoreModule]) => {
      const app = appModule.initializeApp(firebaseConfig)
      const auth = authModule.getAuth(app)
      const db = firestoreModule.getFirestore(app)
      const googleProvider = new authModule.GoogleAuthProvider()

      googleProvider.addScope('profile')
      googleProvider.addScope('email')

      return {
        auth,
        authModule,
        db,
        firestoreModule,
        googleProvider,
      }
    })
  }

  return firebaseServicesPromise
}

export function getFirebaseConfigError() {
  if (isFirebaseConfigured) return null

  return `Missing Firebase environment variables: ${requiredConfigKeys.join(', ')}`
}

export function getFirebaseAuth() {
  return getFirebaseServices().then(({ auth }) => auth)
}

export async function ensureFirebaseAuthPersistence() {
  const { auth, authModule } = await getFirebaseServices()

  if (!authPersistencePromise) {
    authPersistencePromise = authModule.setPersistence(auth, authModule.browserLocalPersistence)
  }

  await authPersistencePromise
}

export async function subscribeToFirebaseAuth(callback) {
  const { auth, authModule } = await getFirebaseServices()
  return authModule.onIdTokenChanged(auth, callback)
}

async function ensureSignedInUserToken(auth) {
  const currentUser = auth.currentUser

  if (!currentUser) {
    throw new Error('Firebase authentication is not ready yet.')
  }

  await currentUser.getIdToken()
  return currentUser
}

export async function signInWithGooglePopup() {
  const { auth, authModule, googleProvider } = await getFirebaseServices()

  await ensureFirebaseAuthPersistence()
  return authModule.signInWithPopup(auth, googleProvider)
}

export async function signOutFromFirebase() {
  const { auth, authModule } = await getFirebaseServices()
  await authModule.signOut(auth)
}

export async function loadRemoteProgress(uid) {
  const { auth, db, firestoreModule } = await getFirebaseServices()
  const currentUser = await ensureSignedInUserToken(auth)

  if (currentUser.uid !== uid) {
    throw new Error('Signed-in Firebase user does not match the requested progress document.')
  }

  const progressRef = firestoreModule.doc(db, 'userProgress', uid)
  const snapshot = await firestoreModule.getDoc(progressRef)

  if (!snapshot.exists()) {
    return null
  }

  const data = snapshot.data()

  return {
    state: data.state,
    clientUpdatedAt: data.clientUpdatedAt || 0,
    lastSyncedAt: data.updatedAt?.toMillis?.() || null,
  }
}

export async function saveRemoteProgress(uid, state) {
  const { auth, db, firestoreModule } = await getFirebaseServices()
  const currentUser = await ensureSignedInUserToken(auth)

  if (currentUser.uid !== uid) {
    throw new Error('Signed-in Firebase user does not match the requested progress document.')
  }

  const progressRef = firestoreModule.doc(db, 'userProgress', uid)
  await firestoreModule.setDoc(progressRef, {
    schemaVersion: 1,
    clientUpdatedAt: state.lastModifiedAt || Date.now(),
    state,
    updatedAt: firestoreModule.serverTimestamp(),
  })
}