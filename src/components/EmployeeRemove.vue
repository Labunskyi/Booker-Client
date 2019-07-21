<template>

</template>
<script>
import {serverUrl} from '../config/config'
export default {
  data() {
	return {
		id: this.$router.currentRoute.params['id'],

	}
  },
  created(){
	this.remove();
  },
  methods: {
	remove() {
		const data = {
			id: this.id,
		},
		formatdata = JSON.stringify(data)
		if (confirm('Confirm removing this employee')) {
			this.$http.put(serverUrl + 'users/userremove/', formatdata)
			.then(function(response) {
			this.$router.push('/employee/list')
			return response.json();
			})
			.then(formData => {
				this.formData = formData
				
			}) 
		} else {
			this.$router.push('/employee/list')
			return
		}
	},
  
  }

  }
</script>

</style>