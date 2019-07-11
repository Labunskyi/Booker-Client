<template>
    <div class="container pt-2">
		<div class="form-group row">
			
		<div class="col-md-3" >
			<router-link :to="'/'" class="btn btn-primary" role="button" aria-pressed="true">Home</router-link>
		</div>
		<div class="col-md-3" >			
			<div class="login" id="login">
					<h4>Login</h4>
					<form id="loginForm" role="form" action="javascript:void(0);">
					
					<div>
						<label for="username">Username</label>
						<input type="text" class="form-control" v-model.trim="username">
					</div>
					<div class="form-group">
						<label for="login-password">Password</label>
						<input type="password" class="form-control" v-model="password">
					</div>
					<button type="submit" class="btn btn-primary" @click="login">Login</button>
					
				</form>		
			</div>
		</div>
		<div class="col-md-3" >
		</div>
		</div>
    </div>
</template>

<script>
	export default {
  data() {
	return {
		username: '',
		password: ''
	}
  },
  methods: {
	
	login() {

		const formData = {
			username: this.username,
			password: this.password
		
		}
		
		this.$http.post('http://rest-classwork.local/Server/api/users/userslogin/', formData)
		.then(response => {
			console.log(response)
			return response.json()
		})
		.then(formData => {
			console.log(formData)
			this.formData = formData
			console.log(formData)
		})
	}
  }
}
</script>

<style scoped>
	

</style>

