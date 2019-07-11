<template>
	<div>
		<h1>Car id {{ id }}</h1>
		<button @click="goBackToCars">Back</button>
		<router-link
		tag="button"
		:to="'/car/' + id + '/full'"
		>Full info</router-link>
		<hr>
		<router-view></router-view>
	</div>
</template>

<script>
export default {
 data() {
    return {
		id: this.$router.currentRoute.params['id']
	}
  },
  methods: {
	goBackToCars() {
		this.$router.push('/cars')
	}
	
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
