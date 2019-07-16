<template>
   <div class="container pt-5">
		<div class="form-group row">
			
		<div class="col-md-3" >
			<router-link :to="'/'" class="btn btn-primary" role="button" aria-pressed="true">Back</router-link>
		</div>
		<div class="col-md-5" >
      <p>
         1. Booked for
      </p>
      <div class="form-group">
         {{this.email}}
      </div>
      <p>
         2. I would like to book this meeting:
      </p>
      <p>
	  <input type="hidden" name="date" v-model="event.date"/>
         {{ event.date }}
      </p>
      
	  <p>
         3. Select:
      </p>
			<select class="form-control" v-model="event.idroom">
				<option :value="1">Main boardroom</option>
				<option :value="2">Meeting room</option>
				<option :value="3">Small meeting room</option>
			</select>
		<p>
         4. Specify what the time and end of the meeting. 
         (This will be what people see on the calendar).
      </p>
	  <p>
	  <input type="date" >
	  </p>
      <p>
         <input type="time" name="start_time" 
         min="08:00" max="20:00" step="1800" pattern="[0-9]{2}:[0-9]{2}" required v-model="event.start_time">
      </p>
      <p>
        <input type="time" name="end_time" 
        min="08:00" max="20:00" step="1800" pattern="[0-9]{2}:[0-9]{2}" required v-model="event.end_time">
      </p>
      <p>
         5. Enter the specifics for the meeting.
         (This will be what people see when they click on the event link).
      </p>
      <p>
        <textarea class="form-control" name="description" required cols="40" rows="7" v-model="event.description">
        </textarea>
      </p>
      <p>
         6. Is this going to be a recurring event?
      </p>
	  <div class="is-recuring">
					
					<div class="custom-control custom-radio">
					  <input name="Radio" type="radio" value="false" id="customRadio5" selected v-model="event.is_recurring" class="custom-control-input">
					  <label class="custom-control-label" for="customRadio5">no</label>
					</div>
					<div class="custom-control custom-radio">
					  <input name="Radio" type="radio" value="true" id="customRadio6" v-model="event.is_recurring" class="custom-control-input">
					  <label class="custom-control-label" for="customRadio6">yes</label>
					</div>
	  </div>
      
      <div v-if="event.is_recurring=='true'" class="recurring">
        <p>
         7. If it is recurring, specify weekly, bi-weekly, or monthly.
      </p>
	  <div class="recuring">
		  <div class="custom-control custom-radio">
			 <input name="period" id="weekly" type="radio" value="weekly" v-model="event.period" class="custom-control-input">
			 <label class="custom-control-label" for="weekly">weekly</label>
		  </div>
		  <div class="custom-control custom-radio">
			 <input name="period" id="bi-weekly" type="radio" value="bi-weekly" v-model="event.period" class="custom-control-input">
			 <label class="custom-control-label" for="bi-weekly">bi-weekly</label>
		  </div>
		  <div class="custom-control custom-radio">
			 <input name="period" id="monthly" type="radio" value="monthly" v-model="event.period" class="custom-control-input">
			 <label class="custom-control-label" for="monthly">monthly</label>
		  </div>
	  </div>
      <p>
        If weekly or bi-weekly, specify the number of weeks for it to keep recurring.
        If monthly, specify the number of months.
        (If you choose "bi-weekly" and put in an odd number of weeks, the computer will round down.)
      </p>
      <p>
        <input type="number" width="30px" step="1" min="0" max="4" v-model="event.duration_recurring">
        duration (max 4 weeks)
      </p>

      </div>
      
      <p>
        <button class="btn btn-primary" @click="saveEvent">Submit</button>
      </p>
	  </div>
	  <div class="col-md-4" >
			
	  </div>
    </div>
</div>
</template>

<script>

export default {

  data() {
    return {

		event: {
		
			iduser: this.getUserId(), 
			idrec: '0',
			date: this.$router.currentRoute.params['date'],
			start_time: "",
			end_time: "",
			description: "",
			is_recurring: "false",
			period: "",
			duration_recurring: "",
			idroom: '1',
      }
    };
  },
  created() {
	this.getUserId()
  },
  computed: {
   
    is_event_recurring(){
		return (this.event.is_recurring === "true");
    }
  },
  methods: {
	getUserId(){
		var user = JSON.parse(localStorage.getItem("user"));
		this.id = user.id
		this.email = user.email
		return this.id
	},
    saveEvent() {

      let data = this.transformFields();
	  
	  this.$http.post('http://booker.local/Server/api/events/singleevent/', data)
		.then(function(response) {
		let time1 = this.digitTime(new Date(this.event.date + ' ' + this.event.start_time));
        let time2 =  this.digitTime(new Date(this.event.date + ' ' + this.event.end_time));
        alert('The event '+time1+ '-'+time2+' has been added. The text for this event is: '+this.event.description);
		this.$router.push('/')
		return response.json();
		})
		.then(formData => {
			this.formData = formData
			
		})
     
    },
	digitTime(date){
        return date.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" })
      },
	  
	  
	 transformFields() {
      let eventCopy = Object.assign({}, this.event);
      let start_time='';
      let end_time='';
      if (this.event.date){
        if (eventCopy.start_time){
          start_time = eventCopy.start_time;
          eventCopy.start_time = this.event.date + ' ' + this.event.start_time + ':' + '00';
        }
        if(eventCopy.end_time){
          end_time = eventCopy.end_time;
          eventCopy.end_time = this.event.date + ' ' + this.event.end_time + ':' + '00';
        }
      }
	        return eventCopy;
    },
    
  }
};
</script>

<style>

</style>