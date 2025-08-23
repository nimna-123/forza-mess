import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from './components/LoginScreen';
import MainLayout from './components/MainLayout';
import Summary from './pages/Summary';
import IndividualCustomerList from './pages/individualCustomerList';
import AgentList from './pages/AgentList';
import AddCustomer from './pages/AddCustomer';
import AddAgent from './pages/AddAgent';
import AddOrder from './pages/AddOrder';
import Orders from './pages/Orders';
import './App.css';

const App = () => {
  // Initialize authentication state from localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const savedAuth = localStorage.getItem('isLoggedIn');
    return savedAuth === 'true';
  });
  
  // Add loading state to prevent flash of login screen
  const [isLoading, setIsLoading] = useState(true);

  // Update localStorage when authentication state changes
  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn.toString());
    setIsLoading(false);
  }, [isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/login" 
            element={
              isLoggedIn ? 
                <Navigate to="/summary" replace /> : 
                <LoginScreen onLogin={handleLogin} />
            } 
          />
          <Route 
            path="/" 
            element={
              isLoggedIn ? 
                <MainLayout onLogout={handleLogout}>
                  <Summary />
                </MainLayout> : 
                <Navigate to="/login" replace />
            } 
          />
          <Route 
            path="/summary" 
            element={
              isLoggedIn ? 
                <MainLayout onLogout={handleLogout}>
                  <Summary />
                </MainLayout> : 
                <Navigate to="/login" replace />
            } 
          />
          <Route 
            path="/individual" 
            element={
              isLoggedIn ? 
                <MainLayout onLogout={handleLogout}>
                  <IndividualCustomerList />
                </MainLayout> : 
                <Navigate to="/login" replace />
            } 
          />
          <Route 
            path="/add-customer" 
            element={
              isLoggedIn ? 
                <MainLayout onLogout={handleLogout}>
                  <AddCustomer />
                </MainLayout> : 
                <Navigate to="/login" replace />
            } 
          />
          <Route 
            path="/agent" 
            element={
              isLoggedIn ? 
                <MainLayout onLogout={handleLogout}>
                  <AgentList />
                </MainLayout> : 
                <Navigate to="/login" replace />
            } 
          />
          <Route 
            path="/agent-list" 
            element={
              isLoggedIn ? 
                <MainLayout onLogout={handleLogout}>
                  <AgentList />
                </MainLayout> : 
                <Navigate to="/login" replace />
            } 
          />
          <Route 
            path="/add-agent" 
            element={
              isLoggedIn ? 
                <MainLayout onLogout={handleLogout}>
                  <AddAgent />
                </MainLayout> : 
                <Navigate to="/login" replace />
            } 
          />
          <Route 
            path="/orders" 
            element={
              isLoggedIn ? 
                <MainLayout onLogout={handleLogout}>
                  <Orders />
                </MainLayout> : 
                <Navigate to="/login" replace />
            } 
          />
          <Route 
            path="/add-order" 
            element={
              isLoggedIn ? 
                <MainLayout onLogout={handleLogout}>
                  <AddOrder />
                </MainLayout> : 
                <Navigate to="/login" replace />
            } 
          />
          <Route 
            path="*" 
            element={
              isLoggedIn ? 
                <Navigate to="/summary" replace /> : 
                <Navigate to="/login" replace />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
