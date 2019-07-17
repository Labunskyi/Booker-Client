<template>
	<div class="conteiner pt-2">

		<div>
			<span>Local time:</span>
			<h2>Booker</h2>
		</div>
		<div class="form-group row">
			<div class="col-md-10 form-group">

				<table class="table table-bordered">
					<thead>
					<tr>
						<td align="center">
							<button class="btn btn-default" v-on:click="decrease"> << </button>
						</td>
						<td colspan="5" align="center"> {{ monthes[month] }} {{ year }} </td>
						<td align="center">
							<button class="btn btn-default" v-on:click="increase"> >> </button>
						</td>
					</tr>
					<tr >
						<td v-for="(d, index) in day" :key="index"> {{ d }} </td>
					</tr>
					</thead>
					
					<tbody>

					   <tr v-for="(week, index) in calendar()" :key="index">
					   
						<router-link 	
								tag="td"
								v-for="(day, index) in week"
								:to="'/eventcreate/' + day.date"
								:key="index"
								:style="{'color': day.visible, 'background-color': day.current, 'pointer-events': day.cursor}"
							> {{ day.index }} 
							<ul class="event-list">
							  <li v-for="(event, index) in day.events" :key="index">
								
								  <router-link :to="'/eventedit/' + event.id" >
									{{ event.start_time  }} - {{ event.end_time }}
								  </router-link>
								
							  </li>
							</ul>
						</router-link>
						</tr>
						
						
					</tbody>
				</table>
			</div>
			<div class="col-md-2 form-group">

				   <div class="user-info" id='user-info'>
						<h4>Hello, {{ name }}</h4>
						<button type="submit" class="btn btn-primary" v-on:click="logout()">Logout</button>
					</div>	

				
				<div class="format-week">
					<h4>Format week</h4>
					<div class="custom-control custom-radio">
					  <input type="radio" value="1" v-model="dFirstMonth" id="customRadio1" name="customRadio" class="custom-control-input">
					  <label class="custom-control-label" for="customRadio1">Monday</label>
					</div>
					<div class="custom-control custom-radio">
					  <input type="radio" value="0" v-model="dFirstMonth" id="customRadio2" name="customRadio" class="custom-control-input">
					  <label class="custom-control-label" for="customRadio2">Sunday</label>
					</div>
				</div>
				<div class="format-time">
					<h4>Format time</h4>
					<div class="custom-control custom-radio">
					  <input type="radio" value="format" v-model="format" id="customRadio3" name="Radio" class="custom-control-input">
					  <label class="custom-control-label" for="customRadio3">12 h</label>
					</div>
					<div class="custom-control custom-radio">
					  <input type="radio" value="" v-model="format" id="customRadio4" name="Radio" class="custom-control-input">
					  <label class="custom-control-label" for="customRadio4">24 h</label>
					</div>
				</div>
				<div class="format-rooms">
					<h4>Rooms</h4>
					<div class="custom-control custom-radio">
					  <input type="radio" value="1" v-model="room" id="customRadio5" name="Room" class="custom-control-input">
					  <label class="custom-control-label" for="customRadio5">Main boardroom</label>
					</div>
					<div class="custom-control custom-radio">
					  <input type="radio" value="2" v-model="room" id="customRadio6" name="Room" class="custom-control-input">
					  <label class="custom-control-label" for="customRadio6">Meeting room</label>
					</div>
					<div class="custom-control custom-radio">
					  <input type="radio" value="3" v-model="room" id="customRadio7" name="Room" class="custom-control-input">
					  <label class="custom-control-label" for="customRadio7">Small meeting room</label>
					</div>
				</div>
				<div class="format-employee">
					<router-link :to="'/employee/list'" class="btn btn-primary" role="button" aria-pressed="true">Employee list</router-link>
				</div>
			</div>
		</div>
	</div>
  
</template>

<script>


export default {
  data() {
	return {
		month: new Date().getMonth(),    
        year: new Date().getFullYear(), 
        dFirstMonth: '1',
        day:["Mn", "Tu","We","Th","Fr","Sa", "Su"],
        days: [],
		monthes: ["January","February","March","April","May","June","July","August","September","Oktober","November","December"],

		name: '',
		events: [],
		eventsByDay: [],
		format: 'format',
		room: '1'

	}
  },

  methods: {
	calendar: function(){
			var days = [];
			var week = 0;
			days[week] = [];
			var dfirst = new Date(this.year, this.month, 1).getDay();
			var dlast = new Date(this.year, this.month + 1, 0).getDate();
			var dLastPrMonth = (new Date(this.year, this.month, 0).getDate() + 1);
                for (let i = 1; i <= dlast; i++) {
                    if (new Date(this.year, this.month, i).getDay() != this.dFirstMonth) {
						var a = {index: i,
								 date: this.formatDate(new Date(this.year, this.month, i)),
								 events: this.getEvent(this.formatDate(new Date(this.year, this.month, i))),
								 room: this.room,
								 visible: '',
								 cursor: 'auto'};
                        days[week].push(a);
						if (i == new Date().getDate() && this.year == new Date().getFullYear() && this.month == new Date().getMonth()) { a.current = '#cdcdef'};
						if (new Date(this.year, this.month, i).getDay() == 6 || new Date(this.year, this.month, i).getDay() == 0) { a.visible = '#ff0000'};
                        }
                     else {
                        week++;
                        days[week] = [];
                        var a = {index: i,
								 date: this.formatDate(new Date(this.year, this.month, i)),
								 events: this.getEvent(this.formatDate(new Date(this.year, this.month, i))),
								 room: this.room,
								 visible: ''};
                        days[week].push(a);
						if (i == new Date().getDate() && this.year == new Date().getFullYear() && this.month == new Date().getMonth()) { a.current = '#cdcdef'};
						if (new Date(this.year, this.month, i).getDay() == 6 || new Date(this.year, this.month, i).getDay() == 0) { a.visible = '#ff0000'};
                        }
                    }

				if (days[0].length > 0) {
					for (let i = days[0].length; i < 7; i++) {
						var b = {index: undefined,
								 visible: '',
								 cursor: 'none'};
						days[0].unshift(b);
						
					}
				}
				this.dayChange;
				
				return days;
			},
            decrease: function(){

                    this.month--;
                    if (this.month < 0) {
                        this.month = 12;
                        this.month--;
                        this.year--;
                    }
                    
            },
			increase: function(){

                    this.month++;
                    if (this.month > 11) {
                        this.month = -1;
                        this.month++;
                        this.year++;
                    }
            },
			formatDate: function(date) {
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				month = month < 10 ? "0" + month : "" + month;
				let day = date.getDate();
				day = day < 10 ? "0" + day : "" + day;
				return "" + year + "-" + month + "-" + day;
			  },
			logout: function() {
				localStorage.clear()
				this.$router.push('/login')
			},
			getEvents: function(room){
				this.$http.get('http://booker.local/Server/api/events/events/'+ this.room)
				.then(function(response) {
				return response.json() 
				})
				.then(events => {
					this.events = events;
				})
			},
			getEvent: function(date) {
				  if (this.events) {
						  let events = this.events.filter((event) =>
							this.isEqualsDays(event.date, date));
						  if (events.length > 0) {
							return events;
						  }
						  return false;
					} else {
						return 
					}
				},
				
			isEqualsDays: function(date1, date2) {
				  if (date1 === date2) {
					return true
				  } else {
					return false
				  }
				},
			
        },
		
		
		computed: {
            dayChange: function(){
                if(this.dFirstMonth == 0){
                    this.day = ["Su", "Mn", "Tu","We","Th","Fr","Sa"]
                }else{
                    this.day = ["Mn", "Tu","We","Th","Fr","Sa", "Su"]
                }
            },
			
		},
		mounted(){
  			this.interval = setInterval(() =>{

				this.getEvents(this.room);
			}, 500)
			var user = JSON.parse(localStorage.getItem("user"));
			this.name = user.username
		},
		beforeDestroy(){
  			clearInterval(this.interval)
		},
		
}
</script>

<style>
	h2 { 
			text-align: center;
		}
	li {
		list-style-type: none;
		}
	ul {
		 margin: 0;
		 padding: 0; 
		}
	.table {
			border-collapse: collapse;
			margin-left: auto;
			margin-right: auto;
			width: 850px;
			height: 700px;
			table-layout: fixed;
        }
	.table thead td {
			
			font-size: 20px;

        }
	.table tbody td {
			height: 130px;
			font-size: 15px;
			margin: 0;
			padding: 0;
        }
	.format-week  {
			margin-top: 40px;
	}
	.format-time  {
			margin-top: 20px;
	}
	.format-rooms  {
			margin-top: 20px;
	}
	.format-employee  {
			margin-top: 20px;
	}
</style>
