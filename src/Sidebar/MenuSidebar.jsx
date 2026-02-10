// import{ useEffect, useState } from "react";
// import axios from "axios";

// export default function MenuSidebar() {
//     const [menus, setMenus] = useState([]);
//     const [openMenu, setOpenMenu] = useState(null);

//     useEffect(() => {
//         axios.get("http://localhost:3000/modules/menu-grouped")
//             .then(res => setMenus(res.data))
//             .catch(err => console.error(err));
//     }, []);

//     const toggleMenu = (name) => {
//         setOpenMenu(prev => (prev === name ? null : name));
//     };

//     return (
//         <div className="w-64 bg-white shadow-md rounded-md p-4">
//             {menus.map((menu, idx) => (
//                 <div key={idx} className="mb-4">
//                     <button
//                         onClick={() => toggleMenu(menu.name)}
//                         className="w-full text-left font-bold text-gray-800 hover:text-blue-600"
//                     >
//                         {menu.name}
//                     </button>
//                     {openMenu === menu.name && (
//                         <ul className="ml-4 mt-2 list-disc text-sm text-gray-700">
//                             {menu.submenu.map((item, i) => (
//                                 <li key={i}>
//                                     <a href={item.route} className="hover:underline">{item.title}</a>
//                                 </li>
//                             ))}
//                         </ul>
//                     )}
//                 </div>
//             ))}
//         </div>
//     );
// }


// import { useEffect, useState } from "react";
// import { FaBars } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import * as FaIcons from 'react-icons/fa';
// import axiosInstance from "../Api/axiosInstance";


// export default function MenuSidebar() {
//     const [menus, setMenus] = useState([]);
//     const [openMenu, setOpenMenu] = useState(null);
//     const [sidebarOpen, setSidebarOpen] = useState(true);
//     const [activeSubmenu, setActiveSubmenu] = useState(null);


//     useEffect(() => {
//         axiosInstance.get("/modules/menu-grouped")
//             .then(res => {
//                 const sortedMenus = [...res.data].sort((a, b) => {
//                     if (a.name === "Dashboard") return -1;
//                     if (b.name === "Dashboard") return 1;
//                     return 0;
//                 });
//                 setMenus(sortedMenus);
//             })
//             .catch(err => console.error(err));
//     }, []);


//     const toggleMenu = (name) => {
//         setOpenMenu(prev => (prev === name ? null : name));
//     };

//     const toggleSidebar = () => {
//         setSidebarOpen(prev => !prev);
//     };

//     const handleSubmenuClick = (route) => {
//         setActiveSubmenu(route);
//     };

//     return (
//         <div className="relative">
//             {/* Toggle Button */}
//             <button
//                 onClick={toggleSidebar}
//                 className="absolute top-4 z-50 ml-5  text-black p-2 rounded "
//             >
//                 <FaBars size={20} />
//             </button>

//             {/* Sidebar */}
//             <div className={`${sidebarOpen ? 'h-full' : 'h-16'}  bg-white shadow-md p-4 transition-all duration-500
//         ${sidebarOpen ? "translate-x-0 w-64" : "-translate-x-full w-0"} overflow-hidden `}>
//                 <h5 className="text-xl font-bold px-3 mb-6 mt-10">Menu</h5>
//                 {menus.map((menu, idx) => {
//                     const IconComponent = FaIcons[menu.iconClass?.trim()] || null;
//                     console.log("🚀 ~ MenuSidebar ~ menu.iconClass:", menu.iconClass)
//                     console.log("🚀 ~ MenuSidebar ~ IconComponent:", IconComponent)
//                     console.log("🚀 ~ MenuSidebar ~ menus:", menus)

//                     return (<div key={idx} className="mb-2">
//                         <button
//                             key={menu.id}
//                             onClick={() => toggleMenu(menu.name)}
//                             className={`w-full text-left px-2 py-2 flex gap-3 rounded-md font-medium 
//                             ${openMenu === menu.name
//                                     ? " text-blue-800 "
//                                     : "text-gray-800 hover:bg-gray-100 hover:text-blue-600"}`}
//                         >
//                             <span className="flex items-center gap-3">
//                                 {IconComponent && <IconComponent className="ml-2 text-lg" />}
//                                 {menu.name}
//                             </span>
//                             {openMenu === menu.name ? (
//                                 <FaIcons.FaChevronDown className='py-2' size={12} />
//                             ) : (
//                                 <FaIcons.FaChevronRight size={12} />
//                             )}
//                         </button>
//                         {openMenu === menu.name && (
//                             <ul className="ml-2 mt-1 space-y-1">
//                                 {menu.submenu.map((item, i) => (
//                                     <li key={i}>
//                                         <Link
//                                             to={item.route}
//                                             onClick={() => {
//                                                 handleSubmenuClick(item.route);
//                                             }}
//                                             className={`block px-10 py-1.5 rounded-md text-sm font-medium
//                         ${activeSubmenu === item.route
//                                                     ? "bg-blue-500 text-white"
//                                                     : "text-gray-700 hover:bg-blue-100 hover:text-blue-700"}`}
//                                         >
//                                             {item.title}
//                                         </Link>
//                                     </li>
//                                 ))}
//                             </ul>
//                         )}
//                     </div>)
//                 })}






//                 {/* {menus.map((menu, idx) => {
//                     const IconComponent = FaIcons[menu.iconClass?.trim()] || null;
//                     const hasSubmenu = menu.submenu && menu.submenu.length > 0;

//                     return (
//                         <div key={idx} className="mb-2">
//                             {hasSubmenu ? (
//                                 // If menu has submenu → toggle
//                                 <button
//                                     key={menu.id}
//                                     onClick={() => toggleMenu(menu.name)}
//                                     className={`w-full text-left px-2 py-2 flex gap-3 rounded-md font-medium 
//                         ${openMenu === menu.name
//                                             ? "text-blue-800"
//                                             : "text-gray-800 hover:bg-gray-100 hover:text-blue-600"}`}
//                                 >
//                                     {IconComponent && <IconComponent className="ml-2 text-lg" />}
//                                     <span>{menu.name}</span>
//                                 </button>
//                             ) : (
//                                 // If no submenu → direct link
//                                 <Link
//                                     to={menu.route || "#"}
//                                     className={`w-full text-left px-2 py-2 flex gap-3 rounded-md font-medium
//                         text-gray-800 hover:bg-gray-100 hover:text-blue-600`}
//                                 >
//                                     {IconComponent && <IconComponent className="ml-2 text-lg" />}
//                                     <span>{menu.name}</span>
//                                 </Link>
//                             )}

//                             {hasSubmenu && openMenu === menu.name && (
//                                 <ul className="ml-2 mt-1 space-y-1">
//                                     {menu.submenu.map((item, i) => (
//                                         <li key={i}>
//                                             <Link
//                                                 to={item.route}
//                                                 onClick={() => handleSubmenuClick(item.route)}
//                                                 className={`block px-10 py-1.5 rounded-md text-sm font-medium
//                                     ${activeSubmenu === item.route
//                                                         ? "bg-blue-500 text-white"
//                                                         : "text-gray-700 hover:bg-blue-100 hover:text-blue-700"}`}
//                                             >
//                                                 {item.title}
//                                             </Link>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             )}
//                         </div>
//                     );
//                 })} */}

//             </div>
//         </div>
//     );
// }


import { useEffect, useState } from "react";
import { FaBars, FaChevronRight, FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import axiosInstance from "../Api/axiosInstance";
import { AiFillDashboard } from "react-icons/ai";
export default function MenuSidebar() {
    const [menus, setMenus] = useState([]);
    const [openMenu, setOpenMenu] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeSubmenu, setActiveSubmenu] = useState(null);

    useEffect(() => {
        axiosInstance
            .get("/modules/menu-grouped")
            .then((res) => {
                const sortedMenus = [...res.data].sort((a, b) => {
                    if (a.name === "Dashboard") return -1;
                    if (b.name === "Dashboard") return 1;
                    return 0;
                });
                setMenus(sortedMenus);
            })
            .catch((err) => console.error(err));
    }, []);

    // Ensures only one menu open at a time
    const toggleMenu = (name) => {
        setOpenMenu((prev) => (prev === name ? null : name));
    };

    const toggleSidebar = () => {
        setSidebarOpen((prev) => !prev);
    };

    const handleSubmenuClick = (route) => {
        setActiveSubmenu(route);
    };

    return (
        <div className="relative">
            {/* Toggle Button */}
            <button
                onClick={toggleSidebar}
                className="absolute top-4 z-50 ml-5 text-black p-2 rounded"
            >
                <FaBars size={20} />
            </button>

            {/* Sidebar */}
            <div
                className={`${sidebarOpen ? "h-full" : "h-16"} bg-white shadow-md p-4 transition-all duration-500
                ${sidebarOpen ? "translate-x-0 w-64" : "-translate-x-full w-0"} overflow-hidden`}
            >
                <h5 className="text-xl font-bold px-3 mb-6 mt-10">Menu</h5>
                <Link to='/dashboard'><div className="flex items-center gap-3 text-sm rounded-md  text-gray-800 hover:bg-gray-100 hover:text-blue-600 px-4 py-1.5 font-medium mb-2">
                    <AiFillDashboard size={20} />
                    <span>Dashboard</span>
                </div>
                </Link>
                {menus.map((menu, idx) => {
                    const IconComponent = FaIcons[menu.iconClass?.trim()] || null;
                    const hasSubmenu = menu.submenu && menu.submenu.length > 0;

                    return (
                        <div key={idx} className="mb-2">
                            <button
                                onClick={() => toggleMenu(menu.name)}
                                className={`w-full text-left px-2 py-2 flex items-center justify-between rounded-md font-medium
                                    ${openMenu === menu.name
                                        ? "text-blue-800"
                                        : "text-gray-800 hover:bg-gray-100 hover:text-blue-600"
                                    }`}
                            >
                                <span className="flex items-center gap-3 text-sm">
                                    {IconComponent && <IconComponent className="ml-2 text-lg" />}
                                    {menu.name}
                                </span>
                                {openMenu === menu.name ? (
                                    <FaChevronDown size={12} />
                                ) : (
                                    <FaChevronRight size={12} />
                                )}
                            </button>

                            {/* Submenu items */}
                            {hasSubmenu && openMenu === menu.name && (
                                <ul className="mx-3 mt-1 space-y-2">
                                    {menu.submenu.map((item, i) => (
                                        <li key={i}>
                                            <Link
                                                to={item.route}
                                                onClick={() => handleSubmenuClick(item.route)}
                                                className={`px-8 py-1.5 flex items-center rounded-md text-sm font-medium
                                                ${activeSubmenu === item.route
                                                        ? "bg-blue-500 text-white"
                                                        : "text-gray-700 hover:bg-blue-100  hover:text-blue-700"
                                                    }`}
                                            >
                                                {item.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
