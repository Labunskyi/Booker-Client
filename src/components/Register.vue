<template>
    <div class="container pt-2">
		<div class="form-group row">
			
		<div class="col-md-3" >
			<router-link :to="'/'" class="btn btn-primary" role="button" aria-pressed="true">Home</router-link>
		</div>
		<div class="col-md-3" >			
			<div class="registration row" id="registration">
				<h4>Registration</h4>
				<form id="registrationForm" role="form" action="javascript:void(0);">
                
					<div>
						<label for="username">Username</label>
						<input type="text" class="form-control" v-model.trim="username">
					</div>
					
					<div class="form-group">
						<label for="password">Password</label>
						<input type="password" class="form-control" v-model="password">
					</div>
				
                <button type="submit" class="btn btn-primary" @click="register">Register</button>
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
	
	register() {

		const formData = {
			username: this.username,
			password: this.password
		}
		if (this.username && this.password){
		this.$http.post('http://rest-classwork.local/Server/api/users/users/', formData)
		.then(response => {
			
			this.$router.push('/login')
			return response.json()
		})
		.then(formData => {
			
			this.formData = formData
			if (formData.name) {
				return true
			} else { 
				alert("The name is already used!"); 
			}
			
		})
	} else {
		alert("A username and password must be present");
	}
	}
  }
}
</script>

<style scoped>
	

</style>


