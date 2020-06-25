<template lang="pug">
	#login
		transition(name="fade")
			div.loading(v-if="performingRequest")
				p Loading...
		section
			.col1
				h1 BlackTribals
				p Welcome to 
					a(href="index.html" target="_blank") BlackTribals
					|.  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
			.col2(:class="{ 'signup-Form': !showLoginForm && !showForgotPassword }")
				form(@submit.prevent, v-if="showLoginForm")
					h1 Welcome Back
		
					label(for="email1") Email
					input(v-model.trim="loginForm.email" type="text" placeholder="johndoe@domain.com" id="email")

					label(for="password") Password
					input(v-model.trim="loginForm.password" type="password" placeholder="password" id="password1")

					button.button(@click="login") Log In

					.extras
						a(@click="togglePasswordReset") Forgot Password
						a(@click="toggleForm") Create an Account

				form(v-if="!showLoginForm && !showForgotPassword" @submit.prevent)
					h1 Get Started
				
					label(for="name") Name
					input(v-model.trim="signupForm.name" type="text" placeholder="John Doe" id="name")

					label(for="title") Title
					input(v-model="signupForm.title" type="text" placeholder="Blacktribals" id="title")

					label(for="email") Email
					input(v-model="signupForm.email" type="email" placeholder="johndoe@domain.com" id="email2")

					label(for="password")
					input(v-model="signupForm.password" type="password" placeholder="password" id="password2")

					button.button(@click="signup") Sign Up

					.extras
						a(@click="toggleForm") Back to Log In

				form(v-if="showForgotPassword" class="password-reset"  @submit.prevent)
					div(v-if="!passwordResetSuccess")
						h1 Reset password
						p We will send you an email to reset your password

						label(for='email3') Email
						input(v-model.trim="passwordForm.email" type="email" placeholder="johndoe@domain.com" id="email3")

						button(@click="resetPassword" class="button") submit
						.extras
							a(@click="togglePasswordReset" class) Back to Login
					div(v-else)
						h1 Email Sent
						p Check your email for a link to reset your password
						button(@click="togglePasswordReset" class="button") Back to Login

				transition(name="fade")
					.error-msg(v-if="errorMsg !== ''")
						p {{ errorMsg }}
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
				name: '',
				title: '',
				email: '',
				password: ''
			},
			passwordForm: {
				email: ''
			},
			showLoginForm: true,
			showForgotPassword: false,
			passwordResetSuccess: false,
			performingRequest: false,
			errorMsg: ''
		}
	},
	methods: {
		toggleForm() {
			this.errorMsg = ''
			this.showLoginForm = !this.showLoginForm
		},
		togglePasswordReset() {
			if (this.showForgotPassword) {
				this.showLoginForm = true
				this.showForgotPassword = false
				this.passwordResetSuccess = false
			} else {
				this.showLoginForm = false
				this.showForgotPassword = true
			}
		},
		signup() {
			this.performingRequest = true

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
							this.performingRequest = false
							this.$router.push('/dashboard')
						})
						.catch(err => {
							console.log(err)
							this.performingRequest = false
						})
				})
				.catch(err => {
					console.log(err)
				})
		},
		login() {
			this.performingRequest = true

			fb.auth
				.signInWithEmailAndPassword(
					this.loginForm.email,
					this.loginForm.password
				)
				.then(user => {
					this.$store.commit('setCurrentUser', user.user)
					this.$store.dispatch('fetchUserProfile')
					this.performingRequest = false
					this.$router.push('/dashboard')
				})
				.catch(err => {
					console.log(err)
					this.performingRequest = false
					this.errorMsg = err.message
				})
		},
		resetPassword() {
			this.performingRequest = true

			fb.auth
				.sendPasswordResetEmail(this.passwordForm.email)
				.then(() => {
					this.performingRequest = false
					this.passwordResetSuccess = true
					this.passwordForm.email = ''
				})
				.catch(err => {
					console.log(err)
					this.performingRequest = false
					this.errorMsg = err.message
				})
		}
	}
}
</script>
