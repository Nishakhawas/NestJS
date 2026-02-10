import Login from "../Page/Login";
import { Route, Routes } from "react-router-dom";
import RegisterPage from "../Page/RegisterPage";
import ManageModule from "../Admin/Manage Module/ManageModule";
import ModuleList from "../Admin/Manage Module/ModuleList";
import Group from "../Admin/Manage Group/Group";
import AddUserForm from "../Admin/Manage User/createuser";
import UserList from "../Admin/Manage User/UserList";
import Sidebar from "../Sidebar/Sidebar";
import Layout from "../Layout/Layout";
import GroupList from "../Admin/Manage Group/GroupList";
import ManagePermission from "../Admin/Manage Permission/ManagePermission";
import EmailConfiguration from "../Admin/Email/EmailConfiguration";
import BannerManagement from "../Admin/Content Management/BannerManagement";
import BannerList from "../Admin/Content Management/BannerList";
import Page from "../Admin/Page/Page";
import PageList from "../Admin/Page/PageList";
import Team from "../Admin/Team/Team";
import TeamList from "../Admin/Team/TeamList";
import FrontendMenu from "../Admin/Frontend Menu/frontendmenu";
import FrontendMenuList from "../Admin/Frontend Menu/FrontendMenuList";
import MenuSidebar from "../Sidebar/MenuSidebar";
import Dashboard from "../Admin/Dashboard/Dashboard";
import Content from "../Component/Trumbowygeditor/content";
// import RichTextEditor from "../Admin/Content Management/RichTextEditor";
export default function Routing() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<Login />} />
      <Route element={<Layout />} >
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/modulelist" element={<ModuleList />} />
        <Route path="/managemodule" element={<ManageModule />} />
        <Route path="modulelist/managemodule/:id" element={<ManageModule />} />
        <Route path="/group" element={<Group />} />
        <Route path="/group/:id" element={<Group />} />
        <Route path="/grouplist" element={<GroupList />} />
        <Route path="/adduser" element={<AddUserForm />} />
        <Route path="/adduser/:id" element={<AddUserForm />} />
        <Route path="/userlist" element={<UserList />} />
        <Route path="/managepermission" element={<ManagePermission />} />
        <Route path="/emailconfiguration" element={<EmailConfiguration />} />
        <Route path="/banner" element={<BannerManagement />} />
        <Route path="/bannerlist" element={<BannerList />} />
        <Route path="/page" element={<Page />} />
        <Route path="/pagelist" element={<PageList />} />
        <Route path="/team" element={<Team />} />
        <Route path="/teamlist" element={<TeamList />} />
        <Route path="/teamlist/:id" element={<TeamList />} />
        <Route path="/frontendtiles" element={< FrontendMenu />} />
        <Route path="/frontendtileslist" element={< FrontendMenuList />} />
        <Route path="/menusidebar" element={< MenuSidebar />} />
        <Route path="/content" element={< Content />} />

        {/* <Route path="/text" element={<RichTextEditor />} /> */}
      </Route>
    </Routes>

  )
}
