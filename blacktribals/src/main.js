import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store.js'
const fb = require('./firebaseConfig.js')
import './assets/scss/app.scss'

Vue.config.productionTip = false

// handles page reload
let app
fb.auth.onAuthStateChanged(user => {
	if (!app) {
		new Vue({
			router,
			store,
			render: h => h(App)
		})
	}
})

/*
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/7.15.1/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/7.15.1/firebase-analytics.js"></script>

<script>
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyB_OOnlndLMBv99ACWUXrWhoXErxKuP6gs",
    authDomain: "black-tribals.firebaseapp.com",
    databaseURL: "https://black-tribals.firebaseio.com",
    projectId: "black-tribals",
    storageBucket: "black-tribals.appspot.com",
    messagingSenderId: "244744954734",
    appId: "1:244744954734:web:f48ddf867a5f94bd8e577f",
    measurementId: "G-TMQDXG9G1F"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
</script> */
