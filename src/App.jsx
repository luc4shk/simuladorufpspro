import React from 'react';
import { useState } from 'react';
import './App.css';
import SideBar from './components/SideBar';
import NavBar from './components/NavBar';
import Page from './components/container/Page';
import { Router, Route, Switch } from 'wouter';
import PrincipalPage from './pages/Admin/principal/PrincipalPage';
import Competencias from './pages/Admin/competencias/Competencias';
import {AppProvider} from './components/context/AppProvider';
import AppRouter from './routes/AppRouter';

function App() {
  return (
    <AppProvider>
      <AppRouter/>
    </AppProvider>
  );
}

export default App;
