import "./App.css";
import { Route, Routes } from "react-router-dom";
import { UserProvider, Header } from "./components/index";
import {
  Home,
  Login,
  Profile,
  Roster,
  Shifts,
  Schedule,
  Admin,
  Unauthorized,
  Layout,
  AllEmployeeShifts,
} from "./pages/index";
import RequireAuth from "./components/RequireAuth";
import { ROLES } from "./types/User";
import Employees from "./pages/Employees";
import EmployeeEdit from "./pages/EmployeeEdit";
import EmployeeAdd from "./pages/EmployeeAdd";
import EditShift from "./pages/EditShift";

function App() {
  return (
    <>
      <UserProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* public routes */}
            <Route path="login" element={<Login />} />
            <Route path="unauthorized" element={<Unauthorized />} />

            {/* Employee Routes */}
            <Route element={<RequireAuth allowedRoles={[ROLES.Employee]} />}>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/shifts" element={<Shifts />} />
              <Route path="/schedule" element={<Schedule />} />
            </Route>

            {/* Admin Routes */}
            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/employees" element={<Employees />} />
              <Route path="/admin/shifts/all" element={<AllEmployeeShifts />} />
              <Route path="/admin/shift/edit/:id" element={<EditShift />} />
              <Route path="/admin/employees/:id" element={<EmployeeEdit />} />
              <Route path="/admin/employees/add" element={<EmployeeAdd />} />
              <Route path="/admin/roster/create" element={<Roster />} />
            </Route>

            {/* catch all */}
            <Route path="*" element={<Login />} />
          </Route>
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;
