import VueRouter from 'vue-router'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Test from './components/Test'

export default new VueRouter({
	routes: [
		{
			path: '',
			component: Home
		},
		{
			path: '/login',
			component: Login
		},
		{
			path: '/register',
			component: Register
		},
		{
			path: '/test',
			component: Test
		},

	
	],
	mode: 'history'

})
