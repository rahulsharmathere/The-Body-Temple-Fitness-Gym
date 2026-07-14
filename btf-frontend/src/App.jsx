import './App.css'
import Sidebar from './Components/Sidebar/sidebar';
import Home from './Pages/Public/Home/home';
import Login from './Pages/Auth/Login/login';
import Setup from './Pages/Admin/Setup/setup';
import Dashboard from './Pages/Admin/Dashboard/dashboard';
import Member from './Pages/Admin/Member/member';
import GeneralUser from './Pages/Admin/GeneralUser/generalUser';
import MemberDetail from './Pages/Admin/MemberDetail/memberDetail';
import Settings from './Pages/Admin/Settings/settings';
import MemberSetup from './Pages/Member/Setup/memberSetup';
import MemberDashboard from './Pages/Member/Dashboard/memberDashboard';
import MemberProfile from './Pages/Member/Profile/memberProfile';
import MemberMembership from './Pages/Member/Membership/memberMembership';
import MemberAttendance from './Pages/Member/Attendance/memberAttendance';
import MemberProgress from './Pages/Member/Progress/memberProgress';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

// keeps a route locked behind login, and optionally behind a specific role -
// same isLogin/role flags the rest of the app already reads from localStorage
const ProtectedRoute = ({ children, role }) => {
  const isLogin = localStorage.getItem("isLogin");
  const currentRole = localStorage.getItem("role");

  if (!isLogin) {
    return <Navigate to="/login" replace />
  }
  if (role && currentRole !== role) {
    return <Navigate to={currentRole === 'admin' ? '/admin/dashboard' : '/member/dashboard'} replace />
  }
  return children;
}

// a member must change their temp password and complete their profile
// before reaching the rest of the member area
const RequireCompleteMember = ({ children }) => {
  const mustChangePassword = localStorage.getItem("mustChangePassword") === 'true';
  if (mustChangePassword) {
    return <Navigate to="/member/setup" replace />
  }
  return children;
}

function App() {
  const location = useLocation();
  const isLogin = localStorage.getItem("isLogin");

  const authPages = ['/login', '/admin/setup', '/member/setup'];
  const showSidebar = isLogin
    && (location.pathname.startsWith('/admin') || location.pathname.startsWith('/member'))
    && !authPages.includes(location.pathname);

  return (
    <>
      <div className={showSidebar ? 'flex min-h-screen bg-ink-950 themed-scroll' : 'min-h-screen bg-ink-950'}>
        {
          showSidebar && <Sidebar />
        }

        <Routes>
          {/* public site */}
          <Route path='/' element={<Home />} />

          {/* shared auth */}
          <Route path='/login' element={<Login />} />
          <Route path='/admin/setup' element={<Setup />} />

          {/* admin panel, protected */}
          <Route path='/admin/dashboard' element={<ProtectedRoute role='admin'><Dashboard /></ProtectedRoute>} />
          <Route path='/admin/member' element={<ProtectedRoute role='admin'><Member /></ProtectedRoute>} />
          <Route path='/admin/member/:id' element={<ProtectedRoute role='admin'><MemberDetail /></ProtectedRoute>} />
          <Route path='/admin/specific/:page' element={<ProtectedRoute role='admin'><GeneralUser /></ProtectedRoute>} />
          <Route path='/admin/settings' element={<ProtectedRoute role='admin'><Settings /></ProtectedRoute>} />

          {/* member area, protected */}
          <Route path='/member/setup' element={<ProtectedRoute role='member'><MemberSetup /></ProtectedRoute>} />
          <Route path='/member/dashboard' element={<ProtectedRoute role='member'><RequireCompleteMember><MemberDashboard /></RequireCompleteMember></ProtectedRoute>} />
          <Route path='/member/profile' element={<ProtectedRoute role='member'><RequireCompleteMember><MemberProfile /></RequireCompleteMember></ProtectedRoute>} />
          <Route path='/member/membership' element={<ProtectedRoute role='member'><RequireCompleteMember><MemberMembership /></RequireCompleteMember></ProtectedRoute>} />
          <Route path='/member/attendance' element={<ProtectedRoute role='member'><RequireCompleteMember><MemberAttendance /></RequireCompleteMember></ProtectedRoute>} />
          <Route path='/member/progress' element={<ProtectedRoute role='member'><RequireCompleteMember><MemberProgress /></RequireCompleteMember></ProtectedRoute>} />
        </Routes>
      </div>
    </>
  )
}

export default App
