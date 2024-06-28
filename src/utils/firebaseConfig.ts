// src/firebaseConfig.ts

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCwv2PQZgbswrRzXuk7-pY-feMUDCxdCRE',
  authDomain: 'real-estate-eb435.firebaseapp.com',
  projectId: 'real-estate-eb435',
  storageBucket: 'real-estate-eb435.appspot.com',
  messagingSenderId: '383390837465',
  appId: '1:383390837465:web:95609fb0e2d17184f0acc8',
  measurementId: 'G-S2QRCHW525'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app)

export { auth }
