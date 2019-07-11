<template>
	<div>
		<h4>Car name: Ford</h4>
		<h4>Car year: 2016</h4>
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
