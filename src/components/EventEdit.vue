<template>
<div class="container pt-5">
	<div class="form-group row">			
		<div class="col-md-3" >
			<router-link :to="'/'" class="btn btn-primary" role="button" aria-pressed="true">Back</router-link>
		</div>
		
				<div class="col-md-6" >
		
				<div class="event-detail" v-if="this.date < this.currentdate">
				  
				  <h2>Event</h2>
				  
				  <div class="time field">
					  <label for="time">When: </label>
					  <span> {{ start_time }} </span> - <span> {{ end_time }} </span>
				  </div>
				  <div class="field">
					<label for="description">Notes</label>
					<span> {{ event.description }}</span>
				  </div>
				  <div class="field">
					<label for="user">Who: {{ event.username }}</label>
				  </div>
				  
				  <div class="field">
					<p>Submitted: {{ event.created_time }}</p> 
				  </div>       
       
			   </div>
			
				<div class="event-detail" v-else-if="this.name == this.event.username || this.name == 'admin'">
				  <h2>Edit event</h2>
				  <div class="time field">
					  <label for="time">When: </label>
					  <input type="time" id="start-time" name="start-time"
							  min="08:00" max="20:00" step="1800" pattern="[0-9]{2}:[0-9]{2}" v-model="start_time"/>
								- 
					  <input type="time" id="end-time" name="end-time"
							  min="08:00" max="20:00" step="1800" pattern="[0-9]{2}:[0-9]{2}" v-model="end_time"/>
				  </div>
				  <div class="field">
					<label for="description">Notes</label>
					<textarea class="form-control" cols="30" rows="2" v-model="event.description"></textarea>
				  </div>
				  <div class="field">
					<label for="user">Who: {{ event.username }}</label>
				  </div>
				  
				  <div class="field">
					<p>Submitted: {{ event.created_time }}</p> 
				  </div>
					
				  <div v-if="event.is_recurring == 1" class="field">
					<input id="isrec" type="checkbox" v-model="applyToAllRec"/>
					<label for="isrec">Apply to all occurences?</label>
				  </div>
				  
				  <div>
					<button type="button" class="btn btn-secondary" @click="update">UPDATE</button>
					<button type="button" class="btn btn-danger" @click="remove">DELETE</button>
				 </div>
			</div>
			<div class="event-detail" v-else>
				  <h2>Event</h2>
				  <div class="time field">
					  <label for="time">When: </label>
					  <span> {{ start_time }} </span> - <span> {{ end_time }} </span>
				  </div>
				  <div class="field">
					<label for="description">Notes</label>
					<span> {{ event.description }}</span>
				  </div>
				  <div class="field">
					<label for="user">Who: {{ event.username }}</label>
				  </div>
				  
				  <div class="field">
					<p>Submitted: {{ event.created_time }}</p> 
				  </div>       
			</div>

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
		currentdate: this.currentDate(), 
		applyToAllRec: false,
		id: this.$router.currentRoute.params['id'],
		event: [],
		start_time: '',
		end_time: '',
		date: ''
		
	}
  },
  created(){
	this.getEventById(this.id);
	var user = JSON.parse(localStorage.getItem("user"));
	this.name = user.username
  },
  methods: {
	update() {
		const data = {
			id: this.event.id,
			start_time: this.date + ' ' + this.start_time + ':' + '00',
			end_time: this.date + ' ' + this.end_time + ':' + '00',
			description: this.event.description,
			idroom: this.event.idroom,
			idrec: this.event.idrec,
			iduser: this.event.iduser,
			is_recurring: this.event.is_recurring,
			applyToAllRec: this.applyToAllRec,
		},
		formatdata = JSON.stringify(data)
		this.$http.put(serverUrl + 'events/eventedit/', formatdata)
		.then(function(response) {
			if (response.body.errors == undefined) {
				let time1 = this.digitTime(new Date(this.date + ' ' + this.start_time));
				let time2 =  this.digitTime(new Date(this.date + ' ' + this.end_time));
				alert('The event '+time1+ '-'+time2+' was updated. The text for this event is: '+this.event.description);
				this.$router.push('/')
				return response.json();
			} else if (response.body.errors == 'This time has already booked!') {
				alert('This time has already booked!');
			} 
		})
		.then(formData => {
			this.formData = formData
			
		})
	},
	digitTime(date){
        return date.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" })
      },
	currentDate(){
		var today = new Date();
		var dd = String(today.getDate()).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		var yyyy = today.getFullYear();
		return yyyy + '-' + mm + '-' + dd;
	  },
	remove() {
		const data = {
			id: this.event.id,
			start_time: this.date + ' ' + this.start_time + ':' + '00',
			
			idrec: this.event.idrec,
			iduser: this.event.iduser,
			is_recurring: this.event.is_recurring,
			applyToAllRec: this.applyToAllRec,
		}
		if (confirm('Confirm removing this event')) {
			this.$http.post(serverUrl + 'events/deleteevent/' + this.id, data)
			.then(function(response) {
			let time1 = this.digitTime(new Date(this.date + ' ' + this.start_time));
			let time2 =  this.digitTime(new Date(this.date + ' ' + this.end_time));
			alert('The event '+time1+ '-'+time2+' has been removed.');
			this.$router.push('/')
			return response.json();
			})
			.then(formData => {
				this.formData = formData
				
			})
		} else {
			return
		}
	},
	getEventById(id){
		this.$http.get(serverUrl + 'events/eventbyid/' + this.id)
				.then(function(response) {
				return response.json()
				})
				.then(event => {
					
					this.event = event[0];
					this.start_time = this.event.start_time.substring(11, 16);
					this.end_time = this.event.end_time.substring(11, 16);
					this.date = this.event.start_time.substring(0, 10);
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