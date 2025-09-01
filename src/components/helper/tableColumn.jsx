import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

export const adminOrderColumns = (handleEdit) => [
  {
    field: "id",
    headerName: "Order Id",
    flex: 1, // responsive width
    minWidth: 120, // keep a reasonable minimum
    headerAlign: "center",
    align: "center",
    sortable: false,
    disableColumnMenu: true,
    headerClassName: "text-indigo-600 uppercase font-bold",
    renderCell: (params) => (
      <div className="truncate w-full text-gray-700 text-center">
        {params.value}
      </div>
    ),
  },
  {
    field: "email",
    headerName: "Email",
    flex: 2, // email usually needs more space
    minWidth: 180,
    headerAlign: "center",
    align: "center",
    sortable: false,
    disableColumnMenu: true,
    headerClassName: "text-indigo-600 uppercase font-bold",
    renderCell: (params) => (
      <div className="truncate w-full text-gray-700 text-center">
        {params.value}
      </div>
    ),
  },

  {
    field: "status",
    headerName: "Order Status",
    flex: 1,
    minWidth: 140,
    headerAlign: "center",
    align: "center",
    sortable: false,
    disableColumnMenu: true,
    headerClassName: "text-indigo-600 uppercase font-bold",
    renderCell: (params) => (
      <div className="w-full text-gray-700 text-center">{params.value}</div>
    ),
  },
  {
    field: "date",
    headerName: "Date",
    flex: 1,
    minWidth: 140,
    headerAlign: "center",
    align: "center",
    sortable: false,
    disableColumnMenu: true,
    headerClassName: "text-indigo-600 uppercase font-bold",
    renderCell: (params) => (
      <div className="w-full text-gray-700 text-center">{params.value}</div>
    ),
  },
  {
    field: "action",
    headerName: "Action",
    flex: 1,
    minWidth: 150,
    headerAlign: "center",
    align: "center",
    sortable: false,
    disableColumnMenu: true,
    headerClassName: "text-indigo-600 uppercase font-bold",
    renderCell: (params) => (
      <div className="flex justify-center items-center">
        <button
          type="button"
          onClick={() => handleEdit(params.row)}
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 
                     hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 
                     dark:focus:ring-blue-800 font-medium rounded-sm text-sm px-4 py-2"
        >
          Edit
        </button>
      </div>
    ),
  },
];

export const adminProductTableColumn = (
  handleEdit,
  handleDelete,
  handleImageUpload,
  handleProductView
) => [
  {
    field: "id",
    headerName: "Product Id",
    flex: 1, // responsive width
    minWidth: 120,
    headerAlign: "center",
    align: "center",
    sortable: false,
    disableColumnMenu: true,
    headerClassName: "text-indigo-600 uppercase font-bold",
    renderCell: (params) => (
      <div className="truncate w-full text-gray-700 text-center">
        {params.value}
      </div>
    ),
  },
  {
    field: "image",
    headerName: "Image",
    flex: 1, 
    minWidth: 80,
    headerAlign: "center",
    align: "center",
    sortable: false,
    disableColumnMenu: true,
    headerClassName: "text-indigo-600 uppercase font-bold",
    renderCell: (params) => (
      <div className="w-full flex justify-center text-gray-700 text-center">
        {" "}
        <img
          src={params.value}
          alt={params.value}
          className="h-14 w-14 p-2"
        />{" "}
      </div>
    ),
  },
  {
    field: "productName",
    headerName: "Product Name",
    flex: 2,
    minWidth: 100,
    headerAlign: "center",
    align: "center",
    sortable: false,
    disableColumnMenu: true,
    headerClassName: "text-indigo-600 uppercase font-bold",
    renderCell: (params) => (
      <div className="w-full truncate text-gray-700 text-center">
        {params.value}
      </div>
    ),
  },

  {
    field: "quantity",
    headerName: "Quantity",
    flex: 1,
    minWidth: 120,
    headerAlign: "center",
    align: "center",
    sortable: false,
    disableColumnMenu: true,
    headerClassName: "text-indigo-600 uppercase font-bold",
    renderCell: (params) => (
      <div className="w-full text-gray-700 text-center">{params.value}</div>
    ),
  },
  {
    field: "price",
    headerName: "Price",
    flex: 1,
    minWidth: 120,
    headerAlign: "center",
    align: "center",
    sortable: false,
    disableColumnMenu: true,
    headerClassName: "text-indigo-600 uppercase font-bold",
    renderCell: (params) => (
      <div className="w-full text-gray-700 text-center">
        {params.value.toFixed(2)}
      </div>
    ),
  },
  {
    field: "discount",
    headerName: "Discount",
    flex: 1,
    minWidth: 120,
    headerAlign: "center",
    align: "center",
    sortable: false,
    disableColumnMenu: true,
    headerClassName: "text-indigo-600 uppercase font-bold",
    renderCell: (params) => (
      <div className="w-full text-red-600 text-center">
        
        {params.value.toFixed(2) * 100}%
      </div>
    ),
  },
  {
    field: "specialPrice",
    headerName: "Special Price",
    flex: 1,
    minWidth: 120,
    headerAlign: "center",
    align: "center",
    sortable: false,
    disableColumnMenu: true,
    headerClassName: "text-indigo-600 uppercase font-bold",
    renderCell: (params) => (
      <div className="w-full font-semibold text-center">
        {params.value.toFixed(2)}
      </div>
    ),
  },
  {
    field: "action",
    headerName: "Action",
    flex: 1,
    minWidth: 340,
    headerAlign: "center",
    align: "center",
    sortable: false,
    disableColumnMenu: true,
    headerClassName: "text-indigo-600 uppercase font-bold",
    renderCell: (params) => (
      <div className="flex justify-center h-full items-center">
          <button
          type="button"
          onClick={() => handleImageUpload(params.row)}
          className="flex items-center gap-1 mr-2 hover:cursor-pointer text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 
                     hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 
                     dark:focus:ring-green-800 font-medium rounded-sm text-sm sm:py-3 px-3 md:py-2"
        >
          <FaEye size={16} />
          <span className="hidden md:block">Image</span>
        </button>
        <button
          type="button"
          onClick={() => handleEdit(params.row)}
          className="flex items-center gap-1 mr-2 hover:cursor-pointer text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 
                     hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 
                     dark:focus:ring-blue-800 font-medium rounded-sm text-sm sm:py-3 px-3 md:py-2"
        >
          <FaEdit size={16} />
          <span className="hidden md:block">Edit</span>
        </button>

        <button
          type="button"
          onClick={() => handleDelete(params.row)}
          className="flex items-center gap-1 hover:cursor-pointer text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 
                      hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 
                      font-medium rounded-sm text-sm sm:py-3 px-3 md:py-2 text-center me-2 "
        >
          <FaTrash size={16} />
          <span className="hidden md:block">Delete</span>
        </button>

        <button
          type="button"
          onClick={() => handleProductView(params.row)}
          className="flex items-center gap-1 hover:cursor-pointer text-white bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 
                     hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-gray-300 
                     dark:focus:ring-gray-800 font-medium rounded-sm text-sm sm:py-3 px-3 md:py-2"
        >
          <FaEye size={16} />
          <span className="hidden md:block">View</span>
        </button>
      </div>
    ),
  },
];
