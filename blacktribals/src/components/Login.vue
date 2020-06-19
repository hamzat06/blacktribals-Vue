<template lang="pug">
  #login
    section
      .col1
        h1 BlackTribals
        p Welcome to
            a(href="index.html" target="_blank") BlackTribals.
            |Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      .col2(:class="{ 'signupForm': !showLoginForm }")
        form(@submit.prevent, v-if="showLoginForm")
          h1 Welcome Back
          
          label(for="email1") Email
          input(v-model.trim="loginForm.email" type="text" placeholder="johndoe@domain.com" id="email")

          label(for="password") Password
          input(v-model.trim="loginForm.password" type="password" placeholder="password" id="password1")

          button.button(@click="login") Log In

          .extras
            a Forgot Password
            a Create an Account
        form(v-else @submit.prevent)
          h1 Get Started

          label(for="name") Name
          input(v-model.trim="signupForm.name" type="text" placeholder="John Doe" id="name")

          label(for="title") Title
          input(v-model="signupForm.title" type="text" placeholder="Blacktribals" id="title")

          label(for="email") Email
          input(v-model="signupForm.email" type="email" placeholder="johndoe@domain.com")

          label(for="password")
          input(v-model="signupForm.password" type="password" placeholder="password")

          button.button(@click="signup") Sign Up

          .extras
            a(@click="toggleForm") Back to Log In
</template>

<script>
const fb = require('../firebaseConfig.js')

export default {
	data() {
		return {
			loginForm: {
				email: '',
				password: ''
			},
			signupForm: {
				email: '',
				password: ''
			},
			showLoginForm: true
		}
	},
	methods: {
		toggleForm() {
			this.showLoginForm = !this.showLoginForm
		},
		signup() {
			fb.auth
				.createUserWithEmailAndPassword(
					this.signupForm.email,
					this.signupForm.password
				)
				.then(user => {
					this.$store.commit('setCurrentUser', user.user)

					// create user object
					fb.usersCollection
						.doc(user.uid)
						.set({
							name: this.signupForm.name,
							title: this.signupForm.title
						})
						.then(() => {
							this.$store.dispatch('fetchUserProfile')
							this.$router.push('/dashboard')
						})
						.catch(err => {
							console.log(err)
						})
				})
				.catch(err => {
					console.log(err)
				})
		},
		login() {
			fb.auth
				.signInWithEmailAndPassword(
					this.loginForm.email,
					this.loginForm.password
				)
				.then(user => {
					this.$store.commit('setCurrentUser', user.user)
					this.$store.dispatch('fetchUserProfile')
					this.$router.push('/dashboard')
				})
				.catch(err => {
					console.log(err)
				})
		}
	}
}
</script>
