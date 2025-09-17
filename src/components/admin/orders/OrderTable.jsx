import { DataGrid } from "@mui/x-data-grid";
import { adminOrderColumns } from "../../helper/tableColumn";
import { useState } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import UpdateOrderForm from "./UpdateOrderForm";
import Modal from "../../shared/Modal"
import OrderList from "./OrderList";

const OrderTable = ({ adminOrders, pagination }) => {
  const [currentPage, setCurrentPage] = useState(
    pagination?.pageNumber + 1 || 1
  );

  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [isListOrderModalOpen, setIsListOrderModalOpen] = useState(false);
  const [selectedOrderList, setSelectedOrderList] = useState("");

  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  const tableRecords = adminOrders?.map((item) => ({
    id: item.orderId,
    email: item.email,
    totalAmount: item.totalAmount,
    status: item.orderStatus,
    date: item.orderDate,
    orderItems: item.orderItems,
    payment: item.payment,
    addressId: item.addressId
  }));

  const handlePaginationChange = (paginationModel) => {
    const page = paginationModel.page + 1;
    setCurrentPage(page);
    params.set("page", page.toString());
    navigate(`${pathname}?${params}`);
  };

  const handleEdit = (order) => {
    setSelectedItem(order);
    setIsOrderModalOpen(true);
  };
  const handleListOrder = (order) => {
    setSelectedOrderList(order);
    setIsListOrderModalOpen(true);
   // console.log("Selected Order: " + selectedOrderList);
  }

  return (
    <div className="space-y-6 w-full">
      <h2 className="font-semibold">Order Table</h2>

      {/* Scrollable wrapper */}
      <div className="w-full overflow-x-auto overflow-y-auto h-[80vh] ">
        <div>
          <DataGrid
            className="w-full"
            rows={tableRecords}
            columns={adminOrderColumns(handleEdit,handleListOrder)}
            paginationMode="server"
            rowCount={pagination?.totalElements || 0}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: pagination?.pageSize || 10,
                  page: currentPage - 1,
                },
              },
            }}
            onPaginationModelChange={handlePaginationChange}
            disableRowSelectionOnClick
            disableColumnResize
            paginationOptions={{
              showFirstButton: true,
              showLastButton: true,
              hideNextButton: currentPage === pagination?.totalPages,
            }}
            pagination
          />
        </div>
      </div>

      {/* Edit Modal */}
      <Modal
        title="Update Order Status"
        isOpen={isOrderModalOpen}
        setIsOpen={setIsOrderModalOpen}
        children={
          <UpdateOrderForm
            setOpen={setIsOrderModalOpen}
            loader={loader}
            setLoader={setLoader}
            selectedItem={selectedItem}
          />
        }
      />

      {/*Total Order View Modal */}
      <Modal
        title="Order List Information"
        isOpen={isListOrderModalOpen}
        setIsOpen={setIsListOrderModalOpen}
        children={
          <OrderList orders={selectedOrderList} />
        }
      />
    
      
    </div>
  );
};

export default OrderTable;
