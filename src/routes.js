import VueRouter from 'vue-router'
import Home from './components/Home'
import Login from './components/Login'
import EventCreate from './components/EventCreate'
import EventEdit from './components/EventEdit'
import Register from './components/Register'
import Page404 from './components/Page404'


export default new VueRouter({
	routes: [
		{
			path: '/',
            name: 'home',
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
			path: '*',
			component: Page404
		},
		
		

	
	],
	mode: 'history'

})
