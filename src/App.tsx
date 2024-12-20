import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
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
import UserPrivateRoute from './utils/UserPrivateRoute';
import UserForgotPass from './pages/user/UserForgotPass';
import ExpertForgotPassPage from './pages/expert/ExpertForgotPassPage';
import CurrentJobPage from './pages/user/CurrentJobPage';
import ServiceAndLocationPage from './pages/user/ServiceAndLocationPage';
import ExpertCurrentJobPage from './pages/expert/ExpertCurrentJobPage';
import { Service } from './interfaces/interface';
import ServiceRequestModal from './components/Expert/Home/ServiceRequestModal';
import { RootState } from './service/redux/store';
import JobPaymentPage from './pages/user/JobPaymentPage';
import AdminJobsPage from './pages/admin/AdminJobsPage';

function App() {
  const user = useSelector(
    (store: { user: { loggedIn: boolean } }) => store.user.loggedIn
  );
  const admin = useSelector(
    (store: { admin: { loggedIn: boolean } }) => store.admin.loggedIn
  );
  const expert = useSelector(
    (store: { expert: { loggedIn: boolean } }) => store.expert.loggedIn
  );
  const services = useSelector(
    (state: { services: { services: Service[] } }) => state.services.services
  );
  const { expertId } = useSelector((state: RootState) => state.expert);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<UserServicesPage />} />
          <Route path="/login" element={user ? <Navigate to={'/'} /> : <LoginPage />}/>
          <Route path="/signup" element={user ? <Navigate to={'/'} /> : <SignUpPage />}/> 
          <Route path="/forgot-password" element={user ? <Navigate to={'/'} /> : <UserForgotPass />}/> 
          <Route path="" element={<UserPrivateRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/request-service" element={<ServiceAndLocationPage />} />
            <Route path ="/job" element={<CurrentJobPage />} />
            <Route path="/payment" element={<JobPaymentPage />}/>
          </Route>


          <Route path="/expert" element={expert ? <><ExpertHomePage /><ServiceRequestModal expertId={expertId} services={services}/></>: <ExpertLogin />}/>
          <Route path="/expert/signup" element={expert ? <><ExpertHomePage /><ServiceRequestModal expertId={expertId} services={services}/></> : <ExpertSignup />}/>
          <Route path="/expert/forgot-password" element={expert ? <><ExpertHomePage /><ServiceRequestModal expertId={expertId} services={services}/></> : <ExpertForgotPassPage />}/>
          <Route path="" element={<ExpertPrivateRoute />}>
            <Route path="/expert" element={<><ExpertHomePage /><ServiceRequestModal expertId={expertId} services={services}/></>} />
            <Route path="/expert/profile" element={<><ExpertProfile /><ServiceRequestModal expertId={expertId} services={services}/></>} />
            <Route path="/expert/previous-services" element={<><ExpertPrevService /><ServiceRequestModal expertId={expertId} services={services}/></>} />
            <Route path="/expert/earnings" element={<><ExpertEarning /><ServiceRequestModal expertId={expertId} services={services}/></>} />
            <Route path="/expert/help" element={<><ExpertHelpPage /><ServiceRequestModal expertId={expertId} services={services}/></>} />
            <Route path="/expert/job" element={<><ExpertCurrentJobPage /><ServiceRequestModal expertId={expertId} services={services}/></>} />
          </Route>

          <Route path="/admin" element={admin ? <Navigate to={'/admin/dashboard'} /> : <AdminLoginPage />}/>
          <Route path="/admin/dashboard" element={admin ? <AdminHomePage /> : <Navigate to={'/admin'} />}/>
          <Route path="/admin/add-service" element={admin ? <AdminAddService /> : <Navigate to={'/admin'} />}/>
          <Route path="/admin/service-management" element={admin ? <AdminServiceManage /> : <Navigate to={'/admin'} />}/>
          <Route path="/admin/user-management" element={admin ? <AdminUserManage /> : <Navigate to={'/admin'} />}/>
          <Route path="/admin/expert-management" element={admin ? <AdminExpertManage /> : <Navigate to={'/admin'} />}/>
          <Route path="/admin/expert-approval" element={admin ? <AdminExpertApproval /> : <Navigate to={'/admin'} />}/>
          <Route path='/admin/jobs' element = {admin ? <AdminJobsPage /> : <Navigate to={'/admin'} />} />
          <Route path="/admin/update/:id" element={admin ? <AdminEditService /> : <Navigate to={'/admin'} />}/>
          <Route path="/admin/expert/:id" element={ admin ? <AdminExpertApprove /> : <Navigate to={'/admin'} />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
