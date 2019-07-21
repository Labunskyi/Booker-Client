<template>
    <div class="container pt-5">
		<div class="form-group row">
			
		<div class="col-md-2" >
			<router-link :to="'/'" class="btn btn-primary" role="button" aria-pressed="true">Home</router-link>
		</div>
		<div class="col-md-8" >						
				<h4>Employee list</h4>
				<ul class="list-group">
					<li class="list-group-item" v-for="(item, key) in employee">
						<div class="list-number">{{ key + 1}}. </div>
						<div class="username"> 
							<a :href="'mailto:' + item.email">{{ item.username }}</a> 
						</div>
						<div class="remove">
							<router-link :to="'/employee/remove/' + item.id">REMOVE </router-link>
						</div>
						<span class="edit">
							<router-link :to="'/employee/edit/' + item.id"> EDIT</router-link>
						</span>
					</li>
				</ul>
				<div class="form-group" style="padding-top: 20px;">
					<router-link :to="'/employee/add'" class="btn btn-primary" role="button" aria-pressed="true">Add a new employee</router-link>
				</div>
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
		employee: []
	}
  },
  created(){
	this.getEmployeeList();
  },
  
   
  methods: {
	getEmployeeList(){
		this.$http.get(serverUrl + 'users/userlist/')
				.then(function(response) {
				return response.json()
				})
				.then(employee => {
					this.employee = employee;
				})
	},
  }
}
</script>

<style scoped>
	.list-number{
		float: left;
	}
	.username{
		margin-left: 10px;
		width: 200px;
		float: left;
	}
	.remove {
		float: left;
	}
	.edit {
		margin-left: 60px;
	}
</style>