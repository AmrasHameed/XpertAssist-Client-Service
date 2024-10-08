import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/user/HomePage';
import LoginPage from './pages/user/LoginPage';
import SignUpPage from './pages/user/SignUpPage';
import { useSelector } from 'react-redux';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminHomePage from './pages/admin/AdminHomePage';
import ExpertHomePage from './pages/expert/ExpertHomePage';
import ExpertLogin from './pages/expert/ExpertLogin';
import ExpertSignup from './pages/expert/ExpertSignup';
import AdminAddService from './pages/admin/AdminAddService';
import AdminServiceManage from './pages/admin/AdminServiceManage';
import AdminUserManage from './pages/admin/AdminUserManage';
import AdminExpertManage from './pages/admin/AdminExpertManage';
import AdminExpertApproval from './pages/admin/AdminExpertApproval';
import AdminEditService from './pages/admin/AdminEditService';
import UserServicesPage from './pages/user/UserServicesPage';
import UserProfile from './pages/user/UserProfile';
import ExpertProfile from './pages/expert/ExpertProfile';
import ExpertPrevService from './pages/expert/ExpertPrevService';
import ExpertEarning from './pages/expert/ExpertEarning';
import ExpertHelpPage from './pages/expert/ExpertHelpPage';
import AdminExpertApprove from './pages/admin/AdminExpertApprove';
import ExpertPrivateRoute from './utils/ExpertPrivateRoute';

function App() {
  const  user  = useSelector((store:{ user: { loggedIn: boolean } })=>store.user.loggedIn);
  const admin = useSelector((store:{admin:{loggedIn:boolean}}) => store.admin.loggedIn)
  const expert = useSelector((store:{expert:{loggedIn:boolean}}) => store.expert.loggedIn)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/services' element={<UserServicesPage />} />
          <Route path="/profile" element={user ? <UserProfile />:<LoginPage/>} />
          <Route path="/login" element={user ? <Navigate to={'/'}/>:<LoginPage/>} />
          <Route path="/signup" element={user ? <Navigate to={'/'}/>:<SignUpPage/>} />

          <Route path="/expert/login" element={<ExpertLogin />} />
          <Route path="/expert" element={<ExpertPrivateRoute />}>
            <Route index element={<ExpertHomePage />} />
            <Route path="signup" element={<ExpertSignup />} />
            <Route path="profile" element={<ExpertProfile />} />
            <Route path="previous-services" element={<ExpertPrevService />} />
            <Route path="earnings" element={<ExpertEarning />} />
            <Route path="help" element={<ExpertHelpPage />} />
          </Route>


          <Route path='/admin' element={admin? <Navigate to={'/admin/dashboard'}/> :<AdminLoginPage/>}/>
          <Route path='/admin/dashboard' element={admin? <AdminHomePage/> : <Navigate to={'/admin'}/>}/>
          <Route path='/admin/add-service' element={admin? <AdminAddService/> : <Navigate to={'/admin'}/>}/>
          <Route path='/admin/service-management' element={admin? <AdminServiceManage/> : <Navigate to={'/admin'}/>}/>
          <Route path='/admin/user-management' element={admin? <AdminUserManage/> : <Navigate to={'/admin'}/>}/>
          <Route path='/admin/expert-management' element={admin? <AdminExpertManage/> : <Navigate to={'/admin'}/>}/>
          <Route path='/admin/expert-approval' element={admin? <AdminExpertApproval/> : <Navigate to={'/admin'}/>}/>
          <Route path='/admin/update/:id' element={admin? <AdminEditService/> : <Navigate to={'/admin'}/>} />
          <Route path='/admin/expert/:id' element={admin? <AdminExpertApprove/> : <Navigate to={'/admin'}/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
