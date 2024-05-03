// App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/common/Navbar';
import FooterComponent from './components/common/Footer';
import UserService from './components/service/UserService';
import TaskManagement from './components/userspage/TaskManagement';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';

function App() {

  const isAuthenticated = UserService.isAuthenticated();

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />

            {/* Check if user is authenticated before rendering protected routes */}
            {isAuthenticated && (
              <>
                <Route path="/user/task-management" element={<TaskManagement />} />
              </>
            )}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
        <FooterComponent />
      </div>
    </BrowserRouter>
  );
}

export default App;