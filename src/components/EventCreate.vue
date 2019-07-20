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
         3. Select:
      </p>
			<select class="form-control" v-model="event.idroom">
				<option :value="1">Main boardroom</option>
				<option :value="2">Meeting room</option>
				<option :value="3">Small meeting room</option>
			</select>
      <p>
         2. I would like to book this meeting:
      </p>
      <p>
	  <input type="date" v-model="event.date">
	  </p>

		<p>
         4. Specify what the time and end of the meeting. 
         (This will be what people see on the calendar).
      </p>
	 
      <p>
         <input type="time" name="start_time" 
         min="08:00" max="20:00" step="1800" required v-model="event.start_time">
      </p>
      <p>
        <input type="time" name="end_time" 
        min="08:00" max="20:00" step="1800" required v-model="event.end_time">
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
					  <input name="Radio" type="radio" value="0" id="customRadio5" selected v-model="event.is_recurring" class="custom-control-input">
					  <label class="custom-control-label" for="customRadio5">no</label>
					</div>
					<div class="custom-control custom-radio">
					  <input name="Radio" type="radio" value="1" id="customRadio6" v-model="event.is_recurring" class="custom-control-input">
					  <label class="custom-control-label" for="customRadio6">yes</label>
					</div>
	  </div>
      
      <div v-if="event.is_recurring == 1" class="recurring">
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
        <button class="btn btn-primary submit" @click="saveEvent">Submit</button>
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
		currentdate: this.currentDate(), 
		
		event: { 
			iduser: this.getUserId(),
			date: this.$router.currentRoute.params['date'],
			start_time: "08:00",
			end_time: "08:00",
			description: "",
			is_recurring: "0",
			period: "weekly",
			duration_recurring: "",
			idroom: '1'
      }
    };
  },
  created() {

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
	  if(this.event.date < this.currentdate) {
			alert('Denied to book a boardroom for a date that has already passed'); 
	  } else if (new Date(this.event.date).getDay() == 0 || new Date(this.event.date).getDay() == 6) {
			alert('Denied to book a boardroom for a weekend date');
	  } else if (this.event.start_time > this.event.end_time) {
			alert('Denied to book a boardroom for this period. Start time should be more then end time');
	  } else if (this.event.start_time < '08:00' || this.event.end_time > '20:00') {
			alert("Denied to book a boardroom for this period. Booking time should be between 08:00 and 20:00 o'clock");
	  } else if (this.comperativeInterval()) {
			alert('Denied to book a boardroom for this period. Min interval should be no less 30 minute');
	  } else {
	  this.$http.post('http://booker.local/Server/api/events/singleevent/', data)
		.then(function(response) {
			if (response.body.errors == undefined) {
				let boardroom = this.event.idroom;
				let time1 = this.digitTime(new Date(this.event.date + ' ' + this.event.start_time));
				let time2 =  this.digitTime(new Date(this.event.date + ' ' + this.event.end_time));
				alert('Boardroom ' + boardroom + '.' + ' The event '+time1+ '-'+time2+' has been added. The text for this event is: '+this.event.description);
				this.$router.push('/')
				return response.json();
			} else if (response.body.errors == 'This time is already booked!') {
				alert('This time is already booked!');
			} else if (response.body.errors == 'Duration limit exceeded') {
				alert('Duration limit exceeded');
			} 
		})
		.then(formData => {
			
		})
		} 
     
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
	  comperativeInterval(){
		var startTime = this.event.start_time;
		var endTime = this.event.end_time;
		var startStartTime = startTime.substring(0, 3);
		var startEndTime = startTime.substring(3);
		var endStartTime = endTime.substring(0, 3);
		var endEndTime = endTime.substring(3);
				if (startStartTime == endStartTime) {
					if (endEndTime - startEndTime < 30) {
						return true;
					} else {
						return false;
					}
				} else return false;
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
	.submit {
		margin-top: 15px;
	}
</style>