import Firebase from 'firebase';
let config = {
    apiKey: "AIzaSyDjtVishNAmMqCl2HdfghOUkebRwaqjBME",
    authDomain: "ecommerce-8726b.firebaseapp.com",
    databaseURL: "https://ecommerce-8726b.firebaseio.com",
    projectId: "ecommerce-8726b",
    storageBucket: "ecommerce-8726b.appspot.com",
    messagingSenderId: "387167767867"
};
let app = Firebase.initializeApp(config);
export const db = app.database();