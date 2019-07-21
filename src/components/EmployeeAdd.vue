<template>
    <div class="container pt-5">
		<div class="form-group row">
			
		<div class="col-md-2" >
			<router-link :to="'/employee/list'" class="btn btn-primary" role="button" aria-pressed="true">Back</router-link>
		</div>
		<div class="col-md-8" >			
			
				<form id="registrationForm" role="form" action="javascript:void(0);">
					  <div class="row">
						<div class="col">
						  <label for="username">Enter new employee name (required)</label>
						  <input type="text" class="form-control" placeholder="Username" v-model.trim="username">
						</div>
						<div class="col">
						  <label for="email">Enter new employee email (required)</label>
						  <input type="email" id="exampleInputEmail1" aria-describedby="emailHelp" class="form-control" placeholder="Email" v-model.trim="email">
						</div>
						<div class="col">
						  <label for="password">Enter new employee password (required)</label>
						  <input type="text" class="form-control" placeholder="Password" v-model.trim="password">
						</div>

						  <input type="hidden" class="form-control" v-model.trim="is_admin">
						  <input type="hidden" class="form-control" v-model.trim="is_active">

					  </div>
					  <div class="form-group" style="padding-top: 20px;">
							<button type="submit" class="btn btn-primary" @click="register">Add</button>
						</div>
				</form>

		</div>
		<div class="col-md-2" >
		</div>
		</div>
    </div>
</template>

<script>
import {serverUrl} from '../config/config'
export default {
  data() {
	return {
		username: '',
		email: '',
		password: '',
		is_admin: '0',
		is_active: '1',
	}
  },
    
  methods: {
		register() {
		const formData = {
			username: this.username,
			email: this.email,
			password: this.password,
			is_admin: this.is_admin,
			is_active: this.is_active,
		}
		if (this.username && this.email && this.password){
		this.$http.post(serverUrl + 'users/user/', formData)
		.then(response => {
		return response.json()
		})
		.then(formData => {
			
			this.formData = formData
			if (formData.name) {
				alert("The new employee is created!");
				this.username = ''
				this.email = ''
				this.password = ''
				this.$router.push('/employee/list')
				return true
			} else { 
				alert("The email is already exists in database!");
				this.email = ''				
			}
			
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