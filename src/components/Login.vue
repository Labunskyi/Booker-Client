<template>
    <div class="container pt-2">
		<div class="form-group row">
			
		<div class="col-md-3" >
		
		</div>
		<div class="col-md-3" >			
			<div class="login" id="login">
					<h4>Login</h4>
					<form id="loginForm" role="form" action="javascript:void(0);">
					
					<div>
						<label for="username">Username</label>
						<input type="text" class="form-control" autocomplete="username" v-model.trim="username">
					</div>
					<div>
						<label for="username">Email</label>
						<input type="email" class="form-control" autocomplete="email" v-model.trim="email">
					</div>
					<div class="form-group">
						<label for="login-password">Password</label>
						<input type="password" class="form-control" autocomplete="password" v-model="password">
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
		password: '',
		email: ''
	}
  },
  methods: {
	
	login() {
		const data = {
			username: this.username,
			password: this.password,
			email: this.email
		
		}
		if (this.username != "" && this.password != "" && this.email != "") {
		this.$http.post('http://booker.local/Server/api/users/userslogin/', data)
		.then(function(response) {
			
			if (response.body) {
				localStorage.setItem("user", JSON.stringify(response.body));
				var user = JSON.parse(localStorage.getItem("user") || '[]');
				this.$router.push('/')
				return response.json()
			} else { 
			
				alert("Wrong email or password or username"); 
			}
		})
		.then(formData => {
			this.formData = formData

			
		})
		} else {
        alert("A username, email and password must be present");
      }
	}
  }
}
</script>

<style scoped>
	
</style>