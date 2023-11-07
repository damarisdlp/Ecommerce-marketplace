// Nav menu for user not logged in
import { lazy } from 'react';
import { DEFAULT_PATHS } from '../config';

const about = lazy(() => import('../views/information/about/About'));
const accountBilling = lazy(() => import('../views/account/AccountBilling'));
const accountSecurity = lazy(() => import('../views/account/AccountSecurity'));
const accountSettings = lazy(() => import('../views/account/AccountSettings'));
const careers = lazy(() => import('../views/information/careers/Careers'));
const contact = lazy(() => import('../views/information/contact/Contact'));
const events = lazy(() => import('../views/information/events/Events'));
const howItWorks = lazy(() => import('../views/information/howItWorks/HowItWorks'));
const inclusivity = lazy(() => import('../views/information/inclusivity/InclusivityGuidelines'));
const insurance = lazy(() => import('../views/information/insurance/Insurance'));
const membership = lazy(() => import('../views/information/membership/Membership'));
const securityGuidelines = lazy(() => import('../views/information/security/SecurityGuidelines'));
const termsConditions = lazy(() => import('../views/information/termsConditions/TermsConditions'));
const testimonials = lazy(() => import('../views/information/testimonials/Testimonials'));
const marketplace = lazy(() => import('../views/marketplace/Marketplace'));
const profileStandard = lazy(() => import('../views/profile/ProfileStandard'));
const register = lazy(() => import('../views/default/Register'));
const login = lazy(() => import('../views/default/Login'));
const detail = lazy(() => import('../views/detail/Detail'));
const addItemForm = lazy(() => import('../views/addItemForm/AddItemForm'));
const cart = lazy(() => import('../views/cart/Cart'));
const search = lazy(() => import('../views/miscellaneous/Search'));
const support = lazy(() => import('../views/support/Support'));
const supportTicketsDetail = lazy(() => import('../views/support/SupportTicketsDetail'));
const supportDocsDetail = lazy(() => import('../views/support/SupportDocsDetail'));
const faq = lazy(() => import('../views/faq/Faq'));

const appRoot = DEFAULT_PATHS.APP.endsWith('/') ? DEFAULT_PATHS.APP.slice(1, DEFAULT_PATHS.APP.length) : DEFAULT_PATHS.APP;

const routesAndMenuItems = {
  mainMenuItems: [
    {
      path: DEFAULT_PATHS.APP,
      exact: true,
      redirect: true,
      to: `${appRoot}/marketplace`,
    },
    {
      path: `${appRoot}/marketplace`,
      component: marketplace,
      label: 'MarketPlace',
    },
    {
      path: `${appRoot}/miscellaneous`,
      component: search,
      label: 'Categories',
      subs: [
        { path: '/:category', component: search },
        { path: '/Sporting-Bikes', label: 'Bicycles', component: search },
        { path: '/Outdoor-Tools', label: 'Tools', component: search },
        { path: '/Outdoor-Camping', label: 'Camping', component: search },
        { path: '/Electronic-Video-Camera', label: 'Video Cameras', component: search },
        { path: '/Electronic-Photo', label: 'Cameras', component: search },
        { path: '/Vehicles-Electric', label: 'Electric Vehicles', component: search },
        { path: '/Apparel-Men', label: 'Mens Apparel', component: search },
      ],
    },
    {
      path: `${appRoot}/miscellaneous`,
      component: search,
      label: 'Search',
      icon: 'search',
    },
    {
      path: `${appRoot}/cart`,
      component: cart,
      label: 'Cart',
      icon: 'cart',
    },
    {
      path: `${appRoot}/faq`,
      component: faq,
    },
    {
      path: `${appRoot}/support`,
      component: support,
    },
    {
      path: `${appRoot}/supportTicketsDetail`,
      component: supportTicketsDetail,
    },
    {
      path: `${appRoot}/supportDocsDetail`,
      component: supportDocsDetail,
    },
    {
      path: `${appRoot}/help`,
      component: marketplace,
      label: 'Help',
      subs: [
        { path: `${appRoot}/support`, label: 'Support', component: support, icon: 'support' },
        { path: `${appRoot}/faq`, label: 'FAQ', component: faq, icon: 'notebook-1' },
      ],
    },
    {
      path: `${appRoot}/register`,
      component: register,
      label: 'Sign Up',
      icon: 'user',
    },
    {
      path: `${appRoot}/login`,
      component: login,
      label: 'Login',
      icon: 'user',
    },
    {
      path: `${appRoot}/profile/:lynchpin`,
      component: profileStandard,
      label: '',
    },
    {
      path: `${appRoot}/detail/:_id`,
      component: detail,
    },
    {
      path: `${appRoot}/listMyItem`,
      component: addItemForm,
    },
    {
      path: `${appRoot}/about`,
      component: about,
    },
    {
      path: `${appRoot}/accountBilling`,
      component: accountBilling,
    },
    {
      path: `${appRoot}/accountSecurity`,
      component: accountSecurity,
    },
    {
      path: `${appRoot}/accountSettings`,
      component: accountSettings,
    },
    {
      path: `${appRoot}/careers`,
      component: careers,
    },
    {
      path: `${appRoot}/contact`,
      component: contact,
    },
    {
      path: `${appRoot}/events`,
      component: events,
    },
    {
      path: `${appRoot}/howItWorks`,
      component: howItWorks,
    },
    {
      path: `${appRoot}/inclusivity`,
      component: inclusivity,
    },
    {
      path: `${appRoot}/insurance`,
      component: insurance,
    },
    {
      path: `${appRoot}/membership`,
      component: membership,
    },
    {
      path: `${appRoot}/securityGuidelines`,
      component: securityGuidelines,
    },
    {
      path: `${appRoot}/termsConditions`,
      component: termsConditions,
    },
    {
      path: `${appRoot}/testimonials`,
      component: testimonials,
    },
  ],
  sidebarItems: [],
};
export default routesAndMenuItems;
