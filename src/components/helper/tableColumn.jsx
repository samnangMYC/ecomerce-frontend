
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
    headerClassName: "text-black font-semibold",
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
    headerClassName: "text-black font-semibold",
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
    headerClassName: "text-black font-semibold",
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
    headerClassName: "text-black font-semibold",
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
    headerClassName: "text-black font-semibold",
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

export const adminProductTableColumn = (handleEdit) => [
  {
    field: "id",
    headerName: "Product Id",
    flex: 1, // responsive width
    minWidth: 120,
    headerAlign: "center",
    align: "center",
    sortable: false,
    disableColumnMenu: true,
    headerClassName: "text-black font-semibold",
    renderCell: (params) => (
      <div className="truncate w-full text-gray-700 text-center">
        {params.value}
      </div>
    ),
  },
  {
    field: "image",
    headerName: "Image",
    flex: 1, // email usually needs more space
    minWidth: 80,
    headerAlign: "center",
    align: "center",
    sortable: false,
    disableColumnMenu: true,
    headerClassName: "text-black font-semibold",
    renderCell: (params) => (
      <div className="w-full flex justify-center text-gray-700 text-center">
        {" "}
        <img src={params.value} alt={params.value} className="h-14 w-14" />{" "}
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
    headerClassName: "text-black font-semibold",
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
    headerClassName: "text-black font-semibold",
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
    headerClassName: "text-black font-semibold",
    renderCell: (params) => (
      <div className="w-full text-gray-700 text-center">{params.value}</div>
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
    headerClassName: "text-black font-semibold",
    renderCell: (params) => (
      <div className="w-full text-red-600 text-center">{params.value}</div>
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
    headerClassName: "text-black font-semibold",
    renderCell: (params) => (
      <div className="w-full font-semibold text-center">{params.value}</div>
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
    headerClassName: "text-black font-semibold",
    renderCell: (params) => (
      <div className="flex justify-center h-full items-center">
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
