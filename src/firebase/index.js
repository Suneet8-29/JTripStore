import firebase from 'firebase'
import 'firebase/storage'
import 'firebase/firestore';

 
const firebaseConfig = {
    apiKey: "AIzaSyCoWUXxuYJGVH17ItcaE_eXnaWMSQ-6zgA",
    authDomain: "tripimagestore-57c72.firebaseapp.com",
    databaseURL: "https://tripimagestore-57c72.firebaseio.com",
    projectId: "tripimagestore-57c72",
    storageBucket: "tripimagestore-57c72.appspot.com",
    messagingSenderId: "480783548206",
    appId: "1:480783548206:web:b8c7110c52de48519084bf"
};
  
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const firestore = firebase.firestore;

export {firestore,storage, firebase as default }; 