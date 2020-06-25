<template lang="pug">
	div(id="app")
		Navigation(v-if="currentUser")
		<router-view />
</template>
<script>
import { mapState } from 'vuex'
import Navigation from './components/Navigation.vue'

export default {
	components: { Navigation },
	computed: {
		...mapState(['currentUser'])
	}
}
</script>
