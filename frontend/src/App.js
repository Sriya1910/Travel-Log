import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Logs from './pages/Logs';
import Wishlist from './pages/Wishlist';
import PublicPosts from './pages/PublicPosts';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Addlog from './pages/Addlog';
import Deletelog from './pages/Deletelog';
import Viewlogs from './pages/Viewlogs';
import Home from './pages/Home';
import Adminhome from './pages/Adminhome';
import AdminPublicPosts from './pages/AdminPublicPosts';
import DeletePosts from './pages/DeletePosts';
function App() {
  return (
       <>
        <Routes>
          <Route path="/logs" element={<Logs/>} />
          <Route path="/wishlist" element={<Wishlist/>} />
          <Route path="/publicposts" element={<PublicPosts/>} />
          <Route path="/addlog" element={<Addlog/>} />
          <Route path="/deletelog" element={<Deletelog/>} />
          <Route path="/viewlogs" element={<Viewlogs/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/adminhome" element={<Adminhome/>} />
          <Route path="/adminpublicposts" element={<AdminPublicPosts/>} />
          <Route path="/deleteposts" element={<DeletePosts/>} />
          <Route path="/" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
        </Routes>
        
      </>   
  );
}
export default App;

// import React from 'react';
// import { Router, Route, Routes } from 'react-router-dom';
// import Logs from './pages/Logs';
// import Wishlist from './pages/Wishlist';
// import PublicPosts from './pages/PublicPosts';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import Addlog from './pages/Addlog';
// import Deletelog from './pages/Deletelog';
// import Viewlogs from './pages/Viewlogs';
// import Home from './pages/Home';
// import Adminhome from './pages/Adminhome';
// import AdminPublicPosts from './pages/AdminPublicPosts';
// import DeletePosts from './pages/DeletePosts';
// import history from './History'; // Import the custom history object

// function App() {
//   return (
//     <Router history={history}>
//       <Routes>
//         <Route path="/logs" element={<Logs />} />
//         <Route path="/wishlist" element={<Wishlist />} />
//         <Route path="/publicposts" element={<PublicPosts />} />
//         <Route path="/addlog" element={<Addlog />} />
//         <Route path="/deletelog" element={<Deletelog />} />
//         <Route path="/viewlogs" element={<Viewlogs />} />
//         <Route path="/home" element={<Home />} />
//         <Route path="/adminhome" element={<Adminhome />} />
//         <Route path="/adminpublicposts" element={<AdminPublicPosts />} />
//         <Route path="/deleteposts" element={<DeletePosts />} />
//         <Route path="/" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//       </Routes>
//     </Router>
//   );
// }
// export default App;
