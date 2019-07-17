import VueRouter from 'vue-router'
import Home from './components/Home'
import Login from './components/Login'
import EventCreate from './components/EventCreate'
import EventEdit from './components/EventEdit'
import EmployeeList from './components/EmployeeList'
import EmployeeAdd from './components/EmployeeAdd'
import EmployeeEdit from './components/EmployeeEdit'
import EmployeeRemove from './components/EmployeeRemove'
import Register from './components/Register'
import Page404 from './components/Page404'

/* const isLogin = (to, from, next) => {
  if (calendar.user) {
    next()
    return
  }else{
    let user = JSON.parse(localStorage.getItem('user') || '[]');
    if (user){
      user.is_active = (user.is_active === '1');
      user.is_admin = (user.is_admin === '1');
      calendar.user = user;
      next()
      return
    }
  }
  next('/login')
}; */

/* const isLogin = (to, from, next) => {
	let user = JSON.parse(localStorage.getItem('user') || '[]');
	if (user.length !== 0) {
		next()
		return
	} else {
		this.$router.push('/login')
		return
	}	
	next('/login')
} */

const isLogin = (to, from, next) => {
	let user = JSON.parse(localStorage.getItem('user') || '[]');
	if (user.length !== 0) {
    next()
    return
  }
  next('/login')
};


export default new VueRouter({
	routes: [
		{
			path: '/',
			component: Home,
			beforeEnter: isLogin
		},
		{
			path: '/login',
			component: Login
		},
		{
			path: '/eventcreate/:date',
			component: EventCreate,
			beforeEnter: isLogin
		},
		{
			path: '/eventedit/:id',
			component: EventEdit,
			beforeEnter: isLogin			
		},
		{
			path: '/register',
			component: Register
		},
		{
			path: '/employee/list',
			component: EmployeeList,
			beforeEnter: isLogin
		},
		{
			path: '/employee/add',
			component: EmployeeAdd,
			beforeEnter: isLogin
		},
		{
			path: '/employee/edit/:id',
			component: EmployeeEdit,
			beforeEnter: isLogin
		},
		{
			path: '/employee/remove/:id',
			component: EmployeeRemove,
			beforeEnter: isLogin
		},
		{
			path: '*',
			component: Page404
		},	
	],
	mode: 'history'

})
