<template lang="pug">
	#dashboard
		section
			.col1
				.profile
					h5 {{ userProfile.name }}
					p {{ userProfile.title }}
					.create-post
						p create a post
						form(@submit.prevent)
							textarea(v-model.trim="post.content")
							button.button(@click="createPost" :disabled="post.content == ''") post

			.col2
				div
					p.no-results There are currently no posts
</template>

<script>
import { mapState } from 'vuex'
const fb = require('../firebaseConfig.js')

export default {
	data() {
		return {
			post: {
				content: ''
			}
		}
	},
	computed: {
		...mapState(['userProfile'])
	},
	methods: {
		createPost() {
			fb.postsCollection
				.add({
					createdOn: new Date(),
					content: this.post.content,
					userId: this.currentUser.uid,
					userName: this.userProfile.name,
					comments: 0,
					likes: 0
				})
				.then(() => {
					this.post.content = ''
				})
				.catch(err => {
					console.log(err)
				})
		}
	}
}
</script>
