import SignUpPage from './containers/signUpPage.js';
import Base from './components/base';

const routes = {
  // base component (wrapper for the whole application).
  component: Base,
  childRoutes: [
    {
      path: '/signup',
      component: SignUpPage
    }

  ]
};

export default routes;
