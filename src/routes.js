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


export default new VueRouter({
	routes: [
		{
			path: '/',
			component: Home,
		},
		{
			path: '/login',
			component: Login
		},
		{
			path: '/eventcreate/:date',
			component: EventCreate
		},
		{
			path: '/eventedit/:id',
			component: EventEdit
		},
		{
			path: '/register',
			component: Register
		},
		{
			path: '/employee/list',
			component: EmployeeList
		},
		{
			path: '/employee/add',
			component: EmployeeAdd
		},
		{
			path: '/employee/edit/:id',
			component: EmployeeEdit
		},
		{
			path: '/employee/remove/:id',
			component: EmployeeRemove
		},
		{
			path: '*',
			component: Page404
		},
		
		

	
	],
	mode: 'history'

})
