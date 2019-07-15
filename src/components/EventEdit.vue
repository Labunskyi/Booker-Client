<template>
<div class="container pt-2">
	<div class="form-group row">			
		<div class="col-md-3" >
			<router-link :to="'/'" class="btn btn-primary" role="button" aria-pressed="true">Back</router-link>
		</div>
		
		<div class="col-md-6" >

			<div class="event-panel">
				<div class="event-detail">
				  
				  <h2>Edit event</h2>
				  <div class="time field">
					  <label for="time">When: </label>
					  <input type="time" id="start-time" name="start-time"
							  min="08:00" max="20:00" step="1800" pattern="[0-9]{2}:[0-9]{2}" v-model="event.start_time"/>
								- 
					  <input type="time" id="end-time" name="end-time"
							  min="08:00" max="20:00" step="1800" pattern="[0-9]{2}:[0-9]{2}" v-model="event.end_time"/>
				  </div>
				  <div class="field">
					<label for="description">Notes</label>
					<textarea class="form-control" cols="30" rows="2" v-model="event.description"></textarea>
				  </div>
				  <div class="field">
					<label for="user">Who</label>
					<div>
						{{ event.iduser }}

					</div>
				  </div>
				  
				  <div class="field">
					<b>Submitted:</b> 
				  </div>

				  <div v-if="event.is_recurring" class="field">
					<input id="isrec" type="checkbox" v-model="event.applyToAllRec"/>
					<label for="isrec">Apply to all occurences?</label>
				  </div>
				  
				  <div>
					<button type="button" class="btn btn-secondary" @click="update">UPDATE</button>
					<button type="button" class="btn btn-danger" @click="remove">DELETE</button>
				 </div>
       
				</div>
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
		
		users: ['vasya', 'miha'],
		id: this.$router.currentRoute.params['id'],
		event: [],
	}
  },
  created(){
	this.getEventById(this.id);
	
  },
  methods: {
	update() {
	
	},
	remove() {
	
	},
	getEventById(id){
		this.$http.get('http://booker.local/Server/api/events/eventbyid/' + this.id)
				.then(function(response) {
				return response.json()
				})
				.then(event => {
					this.event = event[0];
					this.event.start_time = this.event.start_time.substring(11);
					this.event.end_time = this.event.end_time.substring(11);
					console.log(event);
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