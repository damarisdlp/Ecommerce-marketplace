/* eslint-disable */
// Nav menu for user logged in
import { lazy } from 'react';
import { DEFAULT_PATHS } from '../config.js';

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
const profileSettings = lazy(() => import('../views/profile/ProfileSettings'));
const detail = lazy(() => import('../views/detail/Detail'));
const orderCenter = lazy(() => import('../views/orderCenter/OrderCenter'));
const chatApp = lazy(() => import('../views/chat/Chat'));
const calendar = lazy(() => import('../views/apps/calendar/Calendar'));
const chat = lazy(() => import('../views/apps/chat/Chat'));
const mailbox = lazy(() => import('../views/apps/mailbox/Mailbox'));
const tasks = lazy(() => import('../views/apps/tasks/Tasks'));
const addItemForm = lazy(() => import('../views/addItemForm/AddItemForm'));
const cart = lazy(() => import('../views/cart/Cart'));
const checkout = lazy(() => import('../views/checkout/Checkout'));
const search = lazy(() => import('../views/miscellaneous/Search'));
const listings = lazy(() => import('../views/listings/Listings'));
const support = lazy(() => import('../views/support/Support'));
const supportTicketsDetail = lazy(() => import('../views/support/SupportTicketsDetail'));
const supportDocsDetail = lazy(() => import('../views/support/SupportDocsDetail'));
const faq = lazy(() => import('../views/faq/Faq'));
const contacts = lazy(() => import('../views/contacts/Contacts'));
const success = lazy(() => import('../views/checkout/Success'));
const cancel = lazy(() => import('../views/checkout/Cancel'));

const appRoot = DEFAULT_PATHS.APP.endsWith('/') ? DEFAULT_PATHS.APP.slice(1, DEFAULT_PATHS.APP.length) : DEFAULT_PATHS.APP;

const routesAndMenuItemsLI = {
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
      path: `${appRoot}/orderCenter`,
      component: orderCenter,
      label: 'Order Center',
    },
    {
      path: `${appRoot}/cart`,
      component: cart,
      label: 'Cart',
      icon: 'cart',
    },
    {
      path: `${appRoot}/messages`,
      component: chatApp,
      label: 'Messages',
      icon: 'message',
    },
    {
      path: `${appRoot}/calendar`,
      component: calendar,
    },
    {
      path: `${appRoot}/chat`,
      component: chat,
      label: 'Chat',
      icon: 'messages',
    },
    {
      path: `${appRoot}/mailbox`,
      component: mailbox,
    },
    {
      path: `${appRoot}/tasks`,
      component: tasks,
    },
    {
      path: `${appRoot}/listings`,
      component: listings,
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
      path: `${appRoot}/myprofile`,
      component: profileSettings,
    },
    {
      path: `${appRoot}/profile/:lynchpin`,
      component: profileStandard,
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
      path: `${appRoot}/checkout/success`,
      component: success,
    },
    {
      path: `${appRoot}/checkout/cancel`,
      component: cancel,
    },
    {
      path: `${appRoot}/checkout`,
      component: checkout,
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
      path: `${appRoot}/contacts`,
      component: contacts,
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

export default routesAndMenuItemsLI;