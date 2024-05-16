// history.js
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

// Define routes that require authentication
const authenticatedRoutes = ['/logs', '/wishlist', '/addlog', '/deletelog', '/viewlogs'];

// Define routes that require admin privileges
const adminRoutes = ['/adminhome', '/adminpublicposts', '/deleteposts'];

history.listen((location, action) => {
  const isLoggedIn = !!localStorage.getItem('token'); // Check if the user is logged in
  const isAuthorized = checkAuthorization(location.pathname); // Check if the user is authorized for the current route

  if (!isLoggedIn) {
    // If the user is not logged in, redirect to the login page
    history.push('/login');
  } else if (!isAuthorized) {
    // If the user is logged in but not authorized for the current route, redirect to the home page or another appropriate route
    history.push('/');
  }
});

function checkAuthorization(pathname) {
  // Check if the current route requires authentication
  if (authenticatedRoutes.includes(pathname)) {
    // For simplicity, assume all authenticated routes require admin privileges
    return isAdmin();
  }
  return true; // No authorization required for non-authenticated routes
}

function isAdmin() {
  // Check if the user has admin privileges (you should implement your own logic here)
  const role = localStorage.getItem('role'); // Assuming role is stored in localStorage
  return role === 'admin';
}

export default history;

