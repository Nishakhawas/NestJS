import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ManageModule from './ManageModule';
import { RxCross2 } from "react-icons/rx";
import axiosInstance from '../../Api/axiosInstance';
import ExportButtons from '../../Component/ExportButtons';



export default function ModuleList() {
    const queryClient = useQueryClient();

    const fetchMenuData = async () => {
        const res = await axiosInstance.get('/modules');
        return res.data; // Wrap in array if it's one object
    };
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['menu'],
        queryFn: fetchMenuData,
    });

    // queryClient.refetchQueries(["menu"]);
    useEffect(() => {
        queryClient.refetchQueries(['menu']);
    }, []);


    //Delete module
    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            console.log("🚀 ~ MenuTable ~ error:", error)
            return axiosInstance.delete(`/modules/${id}`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
        },
        onSuccess: () => {
            toast.success("Module deleted Successfully", {
                position: "bottom-right",
                autoClose: 3000
            });
            queryClient.invalidateQueries(["data"]);
        },
        onError: () => {
            console.log(error)

        }
    })

    const deleteModule = (id) => {
        deleteMutation.mutate(id);
    }


    const fakeRow = {
        id: 'placeholder',
        menu: '',
        displayText1: '',
        menuLink: '',
        parentMenu: '',
        displayText2: '',
        postdatead: '',
        isActive: null,
        isPlaceholder: true

    };
    //Global Search
    const [searchText, setSearchText] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = Boolean(id);
    const shouldShowModal = showCreateModal || isEditMode;

    const handleSuccess = () => {
        toast.success(id ? 'Module Updated!' : 'Module Created!');
        setShowCreateModal(false);
    };

    const handleModalClose = () => {
        setShowCreateModal(false);
        if (isEditMode) {
            navigate('/modulelist');
        }
        // navigate('/modulelist');
    };
    // const shouldShowModal = !!id || showCreateModal;
    console.log("🚀 ~ ModuleList ~ id:", id)

    useEffect(() => {
        if (id) {
            setShowCreateModal(true);
        }
    }, [id]);

    //column filters
    const [filters, setFilters] = useState({
        menu: '',
        displayText1: '',
        menuLink: '',
        parentMenu: '',
        displayText2: '',
        postdatead: ''
    });

    const isGlobalSearchActive = searchText.trim() !== '';
    const isColumnSearchActive = Object.values(filters).some(val => val.trim() !== '');
    const isAnySearchActive = isGlobalSearchActive || isColumnSearchActive;

    const { data: searchedData } = useQuery({
        queryKey: ['modules', { searchText, ...filters }],
        queryFn: async () => {
            if (isGlobalSearchActive && !isColumnSearchActive) {
                // Global Search only
                const res = await axios.get('http://localhost:3000/modules/search', {
                    params: { search: searchText },
                });
                return res.data;
            } else if (isColumnSearchActive && !isGlobalSearchActive) {
                // Column filters only
                const res = await axios.get('http://localhost:3000/modules/query', {
                    params: filters,
                });
                return res.data;
            } else if (isGlobalSearchActive && isColumnSearchActive) {
                // Both active? You decide – merge? prioritize? return intersection?
                const [global, column] = await Promise.all([
                    axios.get('http://localhost:3000/modules/search', { params: { search: searchText } }),
                    axios.get('http://localhost:3000/modules/query', { params: filters }),
                ]);

                const globalIds = new Set(global.data.map((g) => g.id));
                const intersected = column.data.filter((item) => globalIds.has(item.id));
                return intersected;
            }


            return [];
        },
        enabled: isAnySearchActive,
    });

    const finalData = isAnySearchActive ? searchedData ?? [] : data ?? [];
    const finalTableData = finalData.length > 0 ? finalData : [fakeRow];

    //Data Table
    const columns = [
        {
            name: 'S.N', cell: (row, index) => row.isPlaceholder ? '' : index + 1, sortable: true, width: "80px"
        },

        {
            // name: 'Parent Menu', width: '170px', selector: row => row.menu,
            name: (
                <div className='flex flex-col'>
                    <input
                        type="text"
                        className="border border-gray-300 focus:outline-none outline-none focus:ring focus:ring-blue-200 focus:border-blue-400 w-24  bg-white text-black p-1 rounded  mt-1 text-xs"
                        placeholder="Parent Menu"
                        value={filters.parentMenu}
                        onChange={(e) => setFilters({ ...filters, parentMenu: e.target.value })}
                    />
                </div>
            ),
            selector: row => row.parentMenu,
            sortable: true,
            width: '170px',
            cell: row => {
                if (row.isPlaceholder) {
                    return (
                        <div className="text-gray-500 italic w-full py-4 whitespace-nowrap col-span-full flex justify-center text-center">
                            No matching groups found.
                        </div>
                    );
                }
                return row.parentMenu;
            },
            // cell: row => row.isPlaceholder ? '' : row.parentMenu,


        },

        {
            name: (
                <div className='flex flex-col'>
                    <input
                        type="text"
                        className="border border-gray-300 focus:outline-none outline-none focus:ring focus:ring-blue-200 focus:border-blue-400 w-24 bg-white text-black p-1 rounded px-1 mt-1 text-xs"
                        placeholder=" Display Text "
                        value={filters.displayText1}
                        onChange={(e) => setFilters({ ...filters, displayText1: e.target.value })}
                    />
                </div>
            ),
            cell: row => row.isPlaceholder ? '' : row.displayText1,
            selector: row => row.displayText1,
            width: "170px",
            sortable: true

        },
        {
            name: (
                <div className='flex flex-col'>
                    <input
                        type="text"
                        className="border border-gray-300  focus:outline-none outline-none focus:ring focus:ring-blue-200 focus:border-blue-400 w-24 bg-white text-black p-1 rounded px-1 mt-1 text-xs"
                        placeholder=" Menu Link"
                        value={filters.menuLink}
                        onChange={(e) => setFilters({ ...filters, menuLink: e.target.value })}
                    />
                </div>
            ),
            cell: row => row.isPlaceholder ? '' : row.menuLink,
            selector: row => row.menuLink,
            sortable: true,
            width: "170px"
        },
        {
            name: (
                <div className='flex flex-col'>
                    <input
                        type="text"
                        className="border border-gray-300 focus:outline-none outline-none focus:ring focus:ring-blue-200 focus:border-blue-400 w-24 bg-white text-black p-1 rounded px-1 mt-1 text-xs"
                        placeholder=" Display Text "
                        value={filters.displayText2}
                        onChange={(e) => setFilters({ ...filters, displayText2: e.target.value })}
                    />
                </div>
            ),
            selector: row => row.displayText2,
            // cell: row => row.isPlaceholder ? '' : (row.isActive ? '✅' : '❌'),
            cell: row => row.isPlaceholder ? '' : row.displayText2,
            sortable: true

        },

        {
            name: (
                <div className='flex flex-col'>
                    <input
                        type="text"
                        className="border border-gray-300 focus:outline-none outline-none focus:ring focus:ring-blue-200 focus:border-blue-400 w-24 bg-white text-black p-1 rounded px-1 mt-1 text-xs"
                        placeholder=" Post Date "
                        value={filters.postdatead}
                        onChange={(e) => setFilters({ ...filters, postdatead: e.target.value })}
                    />
                </div>
            ),
            selector: row => row.postdatead,
            // cell: row => row.isPlaceholder ? '' : (row.isActive ? '✅' : '❌'),
            cell: row => row.isPlaceholder ? '' : row.postdatead,
            sortable: true

        },
        {
            name: 'Actions', sortable: true,
            width: '170px',
            cell: (row) => row.isPlaceholder ? '' : (
                <div className='flex gap-2 items-center justify-center'>
                    <button className='hover:bg-blue-300 rounded-md p-1'>View</button>
                    <button onClick={() => navigate(`/modulelist/managemodule/${row.id}`)} className='hover:bg-blue-300 rounded-md p-1'>Edit</button>
                    <button
                        className='hover:bg-blue-300 rounded-md p-1'
                        onClick={() => deleteModule(row.id)}
                        style={{ color: 'red' }}
                    >
                        Delete
                    </button>
                </div>
            ),

        },
    ];

    const customStyles = {
        headCells: {
            style: {
                backgroundColor: 'skyblue',
                color: 'white',
                fontSize: '14px',
                fontWeight: 'bold',
            },
        },
        rows: {
            style: {
                fontSize: '13px',
                minHeight: '38px',
            },
        },
    };

    { isLoading && <p>Loading Menus</p> }
    { isError && <p>{error.message}</p> }

    return (
        <>
            < div className=' max-w-6xl mt-10 mx-auto flex flex-col gap-2 bg-white '>
                <div className='bg-sky-300 flex justify-between items-center p-2'>
                    <div className='flex-1 text-center'>
                        <h2 className='font-medium text-gray-500'>Module List</h2>
                    </div>
                    <div className='flex justify-end'>
                        <button
                            onClick={() => setShowCreateModal(true)} className='p-1 text-white font-semibold bg-sky-600 hover:bg-sky-700 hover:shadow-sky-100 justify-end'> + Create Module</button>
                    </div>
                </div>
                <div className='text-end'>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className=" bg-white px-4 py-1 outline-none border border-blue-100 max-w-xl"
                    />
                </div>
                <ExportButtons data={finalTableData} />

                <div className="border border-gray-300 rounded">
                    <DataTable
                        columns={columns}
                        data={finalTableData}
                        pagination={finalData.length > 0}
                        noHeader={false}
                        fixedHeader
                        // highlightOnHover
                        striped

                        customStyles={customStyles}
                        noDataComponent={
                            finalData.length === 0 ? (
                                <div className="text-gray-500 italic py-4 text-center w-full">
                                    No matching groups found.
                                </div>
                            ) : null
                        }

                    />

                </div>
            </div >

            <div className="relative">
                {shouldShowModal && (
                    <div
                        className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50"
                        onClick={handleModalClose} //close on outside click
                    >
                        {/* Stop click propagation to prevent closing when clicking inside modal */}
                        <div
                            className=" p-6 w-[800px] relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/*  Close button */}
                            <button
                                className="absolute top-20 right-9 text-gray-500 hover:text-red-500 text-xl font-bold"
                                onClick={handleModalClose}
                            >
                                <RxCross2 />
                            </button>
                            {/* 
                            <ManageModule
                                id={id}
                                onSuccess={() => {
                                    handleSuccess();
                                    // toast.success('Module Created!');
                                    setShowCreateModal(false);
                                }}
                            /> */}

                            <ManageModule
                                id={id}
                                onSuccess={() => {
                                    toast.success(isEditMode ? 'Module Updated!' : 'Module Created!');
                                    setShowCreateModal(false);
                                    if (isEditMode) navigate('/modulelist');
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>

        </>
    );
}
