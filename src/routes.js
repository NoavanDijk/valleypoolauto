import Home from './App.vue';
import Information from './components/Information.vue';

const routes = [
    { path: '/', Home},
    { path: '/information', component: Information}
];

export default routes;