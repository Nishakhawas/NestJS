import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import MenuSidebar from '../Sidebar/MenuSidebar';

export default function Layout({ children }) {
    return (
        <div className="flex h-screen">
            <MenuSidebar />
            <div className="flex-1 flex flex-col">
                <main className="flex-1 overflow-auto py-4 px-6 bg-gray-100 transition-all duration-500">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

