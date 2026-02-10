// import React, { useState } from 'react'
// import { IoMdSettings } from "react-icons/io";
// import { MdKeyboardArrowRight } from "react-icons/md";
// import { Link } from 'react-router-dom';
// import { FaBars } from "react-icons/fa";


// export default function Sidebar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [activeItem, setActiveItem] = useState(null);
//   const [activeMenu, setActiveMenu] = useState(null);
//   const [expandedMenu, setExpandedMenu] = useState(null);
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

//   React.useEffect(() => {
//     const handleResize = () => {
//       const width = window.innerWidth;

//       setIsMobile(width <= 640);

//       if (width > 1024) {
//         setIsOpen(true);
//         setExpandedMenu(true);
//       } else if (width > 640 && width <= 1024) {
//         setIsOpen(false);
//         setExpandedMenu(false);
//       } else if (width <= 640) {
//         // setIsOpen(true);
//         setExpandedMenu(null); // or false, depending on your preference
//       }
//     };

//     window.addEventListener('resize', handleResize);
//     handleResize(); // Initial call

//     return () => window.removeEventListener('resize', handleResize);
//   }, []);


//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//     setActiveItem(null);
//     setActiveMenu(null);
//   };

//   const [dropDownMenu, setDropDownMenu] = useState(false);
//   const toggleMenu = (index) => {
//     setExpandedMenu(expandedMenu === index ? null : index);
//   };
//   // Sidebar container styles
//   const sidebarContainerClasses = `
//         ${isMobile
//       ? (isOpen ? 'fixed top-0 left-0 w-full z-50' : 'fixed top-0 left-0 w-0  z-50')
//       : `${isOpen ? "w-64 translate-x-0" : "w-16 "}  top-0 left-0`
//     } 
//        bg-blue-200 h-auto transform transition-all duration-700 ease-in-out rounded-tr-md rounded-br-md
//     `;
//   // Overlay for mobile view
//   const renderMobileOverlay = () => {
//     if (isMobile && isOpen) {
//       return (
//         <div
//           className="fixed h-auto  bg-white bg-opacity-50 z-40"
//           onClick={toggleSidebar}
//         />
//       );
//     }
//     return null;
//   };



//   const navItems = [

//     { title: "Dashboard", route: "/dashboard" },
//     {
//       title: "Admin", route: "/admin",
//       subItems: [
//         { title: "User", route: "/dashboard/User" },
//         { title: "Roles", route: "/dashboard/Role" },
//         { title: "Permission", route: "/dashboard/Permission" },
//         { title: "Add Permission", route: "/dashboard/addPermission" },
//         { title: "Add Role", route: "/dashboard/addNewRole" }
//       ]
//     },
//     {
//       title: "Teachers", userRole: ['admin', 'teacher'], route: "/teacher",
//       subItems: [
//         { title: "All Teachers", userRole: ['admin'], route: "/teacher/allTeacher" },
//         { title: "Add Teachers", userRole: ['admin'], route: "teacher/addTeacher" },
//         { title: "Bulk Add Teachers", userRole: ['teacher'] },
//         { title: "Attendance", userRole: ['admin'], route: "/teacher/Attendance" }

//       ]

//     },
//     {
//       title: "Students", route: "/student ",
//       subItems: [
//         { title: "All Students", route: "/student/allStudent" },
//         { title: "Add Students", route: "/student/addStudent" },
//         { title: "Bulk Add Students", }
//       ]
//     },
//     {
//       title: "Stream", route: "/faculty",
//       subItems: [
//         { title: "All Stream", route: "/faculty/allFaculty" },
//         { title: "Add Stream", route: "/faculty/addFaculty" },
//         { title: "Admission Year", route: '/faculty/admissionYear' },
//         { title: "Add New Admission", route: '/faculty/addNewAdmission' },
//         { title: "Classes", route: '/faculty/class' },
//         { title: "Add Classes", route: '/faculty/addClass' },
//       ]
//     },





//   ];




//   // const filteredNavItems = adminNavItems
//   //     .filter(item => {
//   //         if (!item.userRole) return true;
//   //         return item.userRole.some(role => allowedRoles.includes(role));
//   //     })
//   //     .map(item => ({
//   //         ...item,
//   //         subItems: item.subItems?.filter(subItem => {
//   //             if (!subItem.userRole) return true;
//   //             return subItem.userRole.some(role => allowedRoles.includes(role));
//   //         })
//   //     }));

//   // const navItems = userRole.includes('student') ? studentNavItems : filteredNavItems;

//   return (
//     <>
//       {renderMobileOverlay()}
//       <div className={`flex `}>
//         <div className={`${sidebarContainerClasses} h-screen md:overflow-y-auto max-h-screen`}>
//           <div className={`grid py-6 top-0 sticky bg-white text-black`}>
//             <div className='flex items-cener'>
//               {isOpen && (
//                 <div className=" mx-4 gap-5 flex items-center">
//                 </div>
//               )}

//               <button
//                 className={`mb-4 `}
//                 onClick={toggleSidebar}>
//                 <FaBars size={16}
//                   className={` mx-4 ${isMobile && isOpen ? "text-black" : !isMobile ? "text-blue-800" : "text-black sticky top-0 z-50"} `}
//                 />
//               </button>

//             </div>
//             <hr className={`w-full ${isOpen ? "block" : "hidden"}`} />
//           </div>

//           {/* Navigation */}
//           <nav>
//             {navItems.map((item, index) => (
//               <ul key={index}>
//                 <li
//                   className={`flex flex-col mx-4  text-black cursor-pointer ${item.subItems && expandedMenu === index
//                     ? ""
//                     : ""
//                     }`}
//                 >
//                   <Link to={item.route || "#"}>
//                     <div
//                       className={`flex items-center h-12 justify-between`}
//                       onClick={() => item.subItems && toggleMenu(index)}
//                     >
//                       <div
//                         onClick={() => {
//                           setActiveMenu(isOpen ? item.title : null)
//                           isMobile && !item.subItems && toggleSidebar()
//                         }}
//                         className={`flex items-center px-2 h-10 w-full text-black cursor-pointer  ${isOpen ? "hover:bg-blue-900" : ""}
//                                                     ${isOpen && activeMenu === item.title ? "bg-blue-900  " : ""}`}
//                       >
//                         {/* {isOpen && (
//                                                     <span> {item.icon}</span>
//                                                 )} */}
//                         {isOpen && (
//                           <span className={`text-gray-600 text-sm mx-4 font-medium  `}>
//                             {item.title}
//                           </span>
//                         )}
//                         {isOpen && item.subItems && expandedMenu === index && (
//                           <MdKeyboardArrowRight
//                             size={28}
//                             className={`text-white ml-auto ${expandedMenu === index
//                               ? "rotate-90"
//                               : "rotate-0"
//                               } `}
//                           />
//                         )}
//                       </div>
//                     </div>
//                   </Link>

//                   {/* Nested List */}
//                   {isOpen && item.subItems && expandedMenu === index && (
//                     <ul className="pl-8 mt-1">
//                       {item.subItems.map((subItem, subIndex) => (
//                         <Link to={subItem.route || '#'}>
//                           <li
//                             key={subIndex}
//                             onClick={() => {
//                               setActiveItem(isOpen ? subItem.title : null)
//                               isMobile && toggleSidebar()
//                             }}
//                             className={`flex items-center h-10 cursor-pointer 
//                                                             ${isOpen && activeItem === subItem.title ? "bg-blue-900 " : ""}`}
//                           >

//                             <span className="text-white text-sm p-2">{subItem.title}</span>

//                           </li>
//                         </Link>

//                       ))}
//                     </ul>
//                   )}
//                 </li>
//               </ul>
//             ))}

//           </nav>
//         </div>
//       </div>
//     </>
//   )
// }




import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import {
  FaBars,
  FaChevronDown,
  FaChevronRight,
  FaUserShield,
  FaFileAlt,
  FaUser,
  FaUsers,
  FaBriefcase,
  FaClipboardList,
  FaCogs,

} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const mockMenu = [
  { name: 'Dashboard', icon: <FaClipboardList />, submenu: [] },
  { name: 'CV', icon: <FaFileAlt />, submenu: [] },
  { name: 'Employer', icon: <FaBriefcase />, submenu: [] },
  { name: 'Jobseeker', icon: <FaUsers />, submenu: [] },
  { name: 'Jobs', icon: <FaClipboardList />, submenu: [] },
  { name: 'Applicant', icon: <FaUser />, submenu: [] },
  {
    name: 'Content Management', icon: <FaFileAlt />, submenu: [

      { title: 'Banner Management', route: "/bannerlist" },
      { title: 'SEO  Management', route: "" },
      { title: 'Page Management', route: "/pagelist" },
      { title: 'Blog Management', route: "" },
      { title: 'Team/Testimonial', route: "/teamlist" },
      { title: 'Frontend Tiles', route: "/frontendtileslist" },


    ]
  },
  {
    name: 'General Settings', icon: <FaCogs />, submenu: []

  },
  {
    name: 'Admin Setting',
    icon: <FaUserShield />,
    submenu: [
      { title: 'Manage Modules', route: "/modulelist" },
      { title: 'Manage Group', route: "/grouplist" },
      { title: 'Module Order' },
      { title: 'Manage User', route: "/userlist" },
      { title: 'Manage Permission', route: "managepermission" },
      { title: 'Email Configuration', route: "/emailconfiguration" },
      { title: 'Email Template' },
      { title: 'System Setting' },
    ],
  },
  { name: 'System Log', icon: <FaClipboardList />, submenu: [] },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null);


  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleMenuClick = (name) => {
    setActiveMenu((prev) => (prev === name ? null : name));
  };


  const fetchModules = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/modules`);
      console.log("API Response:", response.data);
      return response.data;
    }
    catch (error) {
      throw new Error(error.response ? error.response.data.message : 'Something went wrong. Please try again later.');

    }
  };

  const { data: modules } = useQuery({
    queryKey: ["modules"],
    queryFn: fetchModules,
    staleTime: 5000,
  });


  return (
    <div className={`bg-[#F8F8F8] h-screen ${isOpen ? 'w-64' : 'w-16'} transition-all  border-r border-gray-200 duration-300`}>
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <button onClick={toggleSidebar} className={`text-gray-700 ${isOpen ? "text-xl" : "ml-2"}`}>
          <FaBars />
        </button>
      </div>

      <ul className="p-2">
        {mockMenu.map((menu, idx) => (
          <li key={idx}>
            <div
              onClick={() => menu.submenu.length && handleMenuClick(menu.name)}
              className={`flex items-center justify-between px-4 py-2  cursor-pointer 
          ${isOpen && 'hover:bg-blue-200 hover:text-blue-800'} 
          ${isOpen && activeMenu === menu.name ? 'bg-blue-200 text-blue-800 font-semibold w-full' : 'text-gray-600'}
        `}
            >
              <div className="flex items-center gap-2">
                <span className={`${isOpen ? " text-sm" : "text-lg"}`}>{menu.icon}</span>
                {isOpen && <span className="text-sm">{menu.name}</span>}

              </div>
              {isOpen &&
                menu.submenu.length > 0 &&
                (activeMenu === menu.name ? <FaChevronDown className='size-3' /> : <FaChevronRight className='size-3' />)}
            </div>
            {isOpen && <hr className='w-full text-gray-200'></hr>}


            {/* Submenu */}

            {isOpen && activeMenu === menu.name && menu.submenu.length > 0 && (
              <ul className="ml-8 mt-1">
                {menu.submenu.map((sub) => (
                  <li key={sub.title}>
                    <Link
                      to={sub.route || '#'}
                      onClick={() => {
                        setActiveSubmenu(sub.title);
                      }}
                      className={`
        block py-2 px-2 text-sm  cursor-pointer
        hover:bg-blue-200 hover:text-blue-800
        ${activeSubmenu === sub.title ? 'bg-blue-200 text-blue-800 font-medium m-1' : 'text-gray-700'}
      `}
                    >
                      {sub.title}
                    </Link>
                  </li>
                ))}


              </ul>
            )}

          </li>
        ))}
      </ul>

    </div>
  );
}
