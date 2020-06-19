import firebase from 'firebase'
import 'firebase/firestore'

// firebase init goes here
const firebaseConfig = {
	apiKey: 'AIzaSyB_OOnlndLMBv99ACWUXrWhoXErxKuP6gs',
	authDomain: 'black-tribals.firebaseapp.com',
	databaseURL: 'https://black-tribals.firebaseio.com',
	projectId: 'black-tribals',
	storageBucket: 'black-tribals.appspot.com',
	messagingSenderId: '244744954734',
	appId: '1:244744954734:web:f48ddf867a5f94bd8e577f',
	measurementId: 'G-TMQDXG9G1F'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics()

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

//firebase collections
const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

export {
	db,
	auth,
	currentUser,
	usersCollection,
	postsCollection,
	commentsCollection,
	likesCollection
}
