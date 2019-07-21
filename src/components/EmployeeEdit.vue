<template>
<div class="container pt-5">
	<div class="form-group row">			
		<div class="col-md-3" >
			<router-link :to="'/employee/list'" class="btn btn-primary" role="button" aria-pressed="true">Back</router-link>
		</div>
		
		<div class="col-md-6" >
			<form role="form" action="javascript:void(0);">
					  <div class="row">
						<div class="col">
						  <label for="username">Edit employee name (required)</label>
						  <input type="text" class="form-control" placeholder="Username" autocomplete="username" v-model="employee.username">
						</div>
						<div class="col">
						  <label for="email">Edit employee email (required)</label>
						  <input type="email" class="form-control" placeholder="Email" autocomplete="email" v-model="employee.email">
						</div>
						<div class="col">
						  <label for="password">Edit employee password (required)</label>
						  <input type="text" class="form-control" placeholder="Password" autocomplete="password" v-model="employee.password">
						</div>
					  </div>
					  <div class="form-group" style="padding-top: 20px;">
							<button type="submit" class="btn btn-secondary" @click="update">Update</button>
					  </div>
			</form>
		</div>

		<div class="col-md-3" >
			
		</div>
    </div>  
</div>
</template>
<script>
import {serverUrl} from '../config/config'

export default {
  data() {
	return {
		id: this.$router.currentRoute.params['id'],
		employee: [],
		
	}
  },
  created(){
	this.getEmployeeById(this.id);
  },
  methods: {
	update() {
		const data = {
			id: this.employee.id,
			username: this.employee.username,
			email: this.employee.email,
			password: this.employee.password,
		},
		formatdata = JSON.stringify(data)
		this.$http.put(serverUrl + 'users/useredit/', formatdata)
		.then(function(response) {
        alert('The employee was updated.');
		this.$router.push('/employee/list')
		return response.json();
		})
		.then(formData => {
			this.formData = formData
			
		})
	},
	
	getEmployeeById(id){
		this.$http.get(serverUrl + 'users/userbyid/' + this.id)
				.then(function(response) {
				return response.json()
				})
				.then(employee => {
					this.employee = employee[0];
				})
	}
  
  }
}
</script>

<style>
.btn {
			margin-right: 5px;	
        }
</style>