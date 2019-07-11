<template>
	<div class="conteiner pt-2">
    <h2>Booker</h2>
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
						<td v-for="(d, index) in day"> {{ d }} </td>
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
				<div class='login-register' id='login-register'>
					<router-link :to="'/login'" class="btn btn-primary" role="button" aria-pressed="true">Login</router-link>
					<router-link :to="'/register'" class="btn btn-primary" role="button" aria-pressed="true">Register</router-link>
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
        
        day:["Пн", "Вт","Ср","Чт","Пт","Сб", "Вс"],
        days: [],
		monthes: ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],

	}
  },
  methods: {
	calendar2: function(){
			var days = [];
			var week = 0;
			days[week] = [];
			var dfirst = new Date(this.year, this.month, 1).getDay();
			var dlast = new Date(this.year, this.month + 1, 0).getDate();
			var dlastPrMonth = (new Date(this.year, this.month, 0).getDate() + 1);
                for (let i = 1; i <= dlast; i++) {
                    if (new Date(this.year, this.month, i).getDay() != 1) {
					
						if (i == new Date().getDate() && this.year == new Date().getFullYear() && this.month == new Date().getMonth()) { a.current = 'blue'};
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
					console.log(days[0].length);
					days = days.splice(1);
					console.log(days);
				}
				if (days[0].length > 0) {
					for (let i = days[0].length; i < 7; i++) {
						dlastPrMonth -= 1;
					
						days[0].unshift(dlastPrMonth);
					}
				}
				
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
</style>
