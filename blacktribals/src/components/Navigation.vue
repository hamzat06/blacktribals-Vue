<template lang="pug">
	header
		section
			.col1
				router-link(to="/dashboard")
					h3 BlackTribals
				ul.inline
					li
						router-link(to="/dashboard") Dashboard
					li
						router-link(to="/settings") Settings
					li
						a(@click="logout") Logout
</template>

<script>
const fb = require('../firebaseConfig.js')

export default {
	methods: {
		logout() {
			fb.auth
				.signOut()
				.then(() => {
					this.$store.dispatch('clearData')
					this.$router.push('/login')
				})
				.catch(err => {
					console.log(err)
				})
		}
	}
}
</script>
