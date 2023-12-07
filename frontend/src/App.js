import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import LandingPage from "./components/pages/landingPage";
import ProjectDetails from "./components/pages/projectDetails2";
import EmployeeDetails from "./components/pages/employeeDetails";
import TimesheetDetails from "./components/pages/timesheetDetails";
import HomePage from "./components/pages/homePage";
import Login from "./components/pages/loginPage";
import Signup from "./components/pages/registerPage";
import PrivateUserProfile from "./components/pages/privateUserProfilePage";
import ProjectPage from "./components/pages/projectPage";
import TimesheetPage from "./components/pages/timesheetPage";
import EditUserPage from "./components/pages/editUserPage";
import CreateProject from "./components/pages/createProject";
import CreateEmployee from "./components/pages/createEmployee";  
import CreateTimesheet from "./components/pages/createTimesheet";  
import EmployeePage from "./components/pages/employeePage";
import { createContext, useState, useEffect } from "react";
import getUserInfo from "./utilities/decodeJwt";


export const UserContext = createContext();

const App = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(getUserInfo());
  }, []);

  return (
    <>
      <Navbar />
      <UserContext.Provider value={user}>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/home" element={<HomePage />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route path="/privateUserProfile" element={<PrivateUserProfile />} />
          <Route path="/projects" element={<ProjectPage />} />
          <Route path="/timesheets" element={<TimesheetPage />} />
          <Route path="/editUser" element={<EditUserPage />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/employee/:id" element={<EmployeeDetails />} />
          <Route path="/timesheets/:id" element={<TimesheetDetails />} />
          <Route path="/employees" element={<EmployeePage />} />
          <Route path="/create-project" element={<CreateProject />} />
          <Route path="/create-employee" element={<CreateEmployee />} />
          <Route path="/create-timesheet" element={<CreateTimesheet />} />
        </Routes>
        
      </UserContext.Provider>
    </>
  );
};
//<Route path="/projects/:id" element={<ProjectIdPage />} />
//URI param
export default App;
