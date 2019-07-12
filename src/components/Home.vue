<template>
	<div class="conteiner pt-2">

		<div>
			<span>{{ date | date('datetime') }}</span>
			<h2>Booker</h2>
		</div>
		<div class="form-group row">
			<div class="col-md-10 form-group">

				<table class="table table-bordered">
					<thead>
					<tr>
						<td>
							<button class="btn btn-default" v-on:click="decrease"> << </button>
						</td>
						<td colspan="5"> {{ monthes[month] }} {{ year }} <td>
							<button class="btn btn-default" v-on:click="increase"> >> </button>
						</td>
					</tr>
					<tr >
						<td v-for="d in day"> {{ d }} </td>
					</tr>
					</thead>
					
					<tbody>

					   <tr v-for="week in calendar2()">
							<td v-for="day in week" :style="{'color': day.visible, 'background-color': day.current}"> {{ day.index }} </td>
						</tr>
						
						
					</tbody>
				</table>
			</div>
			<div class="col-md-2 form-group">
				<div class="user-form">
				   <div class="user-info" id='user-info'>
						Hello, <span name="infoUsername"> {{ name }}</span>
						<br>
						<button type="submit" class="btn btn-primary" v-on:click="logout()">Logout</button>
					</div>	
				</div>
				<div class='login-register' id='login-register'>
					<router-link :to="'/login'" class="btn btn-primary" role="button" aria-pressed="true">Login</router-link>
					<router-link :to="'/register'" class="btn btn-primary" role="button" aria-pressed="true">Register</router-link>
				</div>
				
				<div>
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
        day:["Пн", "Вт","Ср","Чт","Пт","Сб", "Вс"],
        days: [],
		monthes: ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],
		date: new Date(),
		name: ''

	}
  },
  methods: {
	calendar2: function(){
			var days = [];
			var week = 0;
			days[week] = [];
			var dfirst = new Date(this.year, this.month, 1).getDay();
			var dlast = new Date(this.year, this.month + 1, 0).getDate();
			var dLastPrMonth = (new Date(this.year, this.month, 0).getDate() + 1);
                for (let i = 1; i <= dlast; i++) {
                    if (new Date(this.year, this.month, i).getDay() != this.dFirstMonth) {
						var a = {index: i, visible: ''};
                        days[week].push(a);
						if (new Date(this.year, this.month, i).getDay() == 6 || new Date(this.year, this.month, i).getDay() == 0) { a.visible = 'red'};
                        }
                     else {
                        week++;
                        days[week] = [];
                        var a = {index: i, visible: ''};
                        days[week].push(a);
                        }
                    }
				if (days[0].length == 0) {
					days = days.splice(1);
				}
				if (days[0].length > 0) {
					for (let i = days[0].length; i < 7; i++) {
						dLastPrMonth -= 1;
						days[0].unshift(dLastPrMonth);
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
			logout: function() {
				localStorage.clear()
				this.$router.push('/login')
			},
			
			
        },
		computed: {
            dayChange: function(){
                if(this.dFirstMonth == 0){
                    this.day = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
                }else{
                    this.day = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
                }
            },
			
		},
		mounted(){
  			this.interval = setInterval(() =>{
				this.date = new Date()
			}, 1000)
			var user = JSON.parse(localStorage.getItem("user"));
			this.name = user.username
		},
		beforeDestroy(){
  			clearInterval(this.interval)
		}
}
</script>

<style>
	h2 { 
			text-align: center;
		}
	.table{
			border-collapse: collapse;
			margin-left: auto;
			margin-right: auto;
			width: 700px;
			height: 700px;
			
        }
	.btn {
			margin-right: 5px;
			
        }
	.login-register{
            display: block;
        }
</style>
