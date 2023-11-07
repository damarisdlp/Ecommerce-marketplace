import { LAYOUT, MENU_BEHAVIOUR, NAV_COLOR, MENU_PLACEMENT, RADIUS, THEME_COLOR, USER_ROLE } from 'constants.js';

export const IS_DEMO = false;
export const IS_AUTH_GUARD_ACTIVE = true;
export const SERVICE_URL = '/app';
export const USE_MULTI_LANGUAGE = true;

// For detailed information: https://github.com/nfl/react-helmet#reference-guide
export const REACT_HELMET_PROPS = {
  defaultTitle: '2LetItGo',
  titleTemplate: '%s | 2LetItGo',
};

export const DEFAULT_PATHS = {
  APP: '/',
  LOGIN: '/login',
  LOGOUT: '/logout',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  USER_WELCOME: '/dashboards/default',
  NOTFOUND: '/page-not-found',
  UNAUTHORIZED: '/unauthorized',
  INVALID_ACCESS: '/invalid-access',
  PROFILE: '/myprofile',
  PROFILE_SETTINGS: '/profile/profileSettings',
  LISTITEM: '/listItem',
};

export const DEFAULT_SETTINGS = {
  MENU_PLACEMENT: MENU_PLACEMENT.Horizontal,
  MENU_BEHAVIOUR: MENU_BEHAVIOUR.Pinned,
  LAYOUT: LAYOUT.Boxed,
  RADIUS: RADIUS.Rounded,
  COLOR: THEME_COLOR.DarkBlue,
  NAV_COLOR: NAV_COLOR.Default,
  USE_SIDEBAR: false,
};

export const DEFAULT_USER = {
  id: 1,
  name: 'Not Lisa Jackson',
  thumb: '/img/profile/profile-9.webp',
  role: USER_ROLE.Admin,
  email: 'lisajackson@gmail.com',
  password: 'LisaJackson',
};

export const REDUX_PERSIST_KEY = 'ecommerce-platform';
