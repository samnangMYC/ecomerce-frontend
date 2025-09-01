import { useState } from "react";
import { PackageX } from "lucide-react";
import { MdAddShoppingCart } from "react-icons/md";
import Loader from "../../shared/Loader";
import { adminProductTableColumn } from "../../helper/tableColumn";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useProductFilter } from "../../../hook/useProductFilter";
import Modal from "../../shared/Modal";
import AddProductForm from "./AddProductForm";
import DeleteModal from "../../shared/DeleteModal";
import { deleteProduct } from "../../../store/actions";
import toast from "react-hot-toast";
import ImageUploadForm from "./ImageUploadForm";
import ProductViewModal from "../../shared/ProductViewModal";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const AdminProduct = () => {

  const { products, pagination } = useSelector((state) => state.products);

  useProductFilter();

  const emptyProduct = !products || products?.length === 0;
  const { isLoading, errorMessage } = useSelector((state) => state.error);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [openProductModal, setOpenProductModal] = useState(false);

  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const [openImageUploadModal,setOpenImageUploadModal] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = useLocation().pathname;

  const tableRecords = products?.map((item) => ({
    id: item.productId,
    productName: item.productName,
    image: item.image,
    description: item.description,
    quantity: item.quantity,
    price: item.price,
    discount: item.discount,
    specialPrice: item.specialPrice,
  }));

  const handleEdit = (product) => {
    setOpenUpdateModal(true);
    setSelectedProduct(product);
  };
  const handleDelete = (product) => {
    setSelectedProduct(product);
    setOpenDeleteModal(true);
   //console.log("Prod: " +product.id);
  };
  const handleImageUpload = (product) => {
    setOpenImageUploadModal(true);
    setSelectedProduct(product);
  };
  const handleProductView = (product) => {
    setOpenProductModal(true);
    setSelectedProduct(product);
  };
  const handlePaginationChange = (paginationModel) => {
    const page = paginationModel.page + 1;
    setCurrentPage(page);
    params.set("page", page.toString());
    navigate(`${pathname}?${params}`);
  };

  const onDeleteHandler = () => {
    //console.log("Handler : " +selectedProduct );
    dispatch(
      deleteProduct(
        toast,
        selectedProduct?.id,
        setLoader,
        setOpenDeleteModal
      )
    );
  };

  const [currentPage, setCurrentPage] = useState(
    pagination?.pageNumber + 1 || 1
  );

  return (
    <div className="overflow-x-auto h-[80vh]">
      <div className="flex items-center justify-between py-4">
        {/* Title */}
        <p className="font-semibold text-lg">All Products </p>

        {/* Add Product Button */}
        <button
          type="button"
          onClick={() => setOpenAddModal(true)}
          className="flex idhover:cursor-pointer hover:cursor-pointer items-center gap-2 text-white bg-gradient-to-br from-indigo-600 to-indigo-500 
                   hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-indigo-300 
                   dark:focus:ring-indigo-800 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          <MdAddShoppingCart size={18} />
          Add Product
        </button>
      </div>
      {/* Loading state */}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {/* Empty state */}
          {emptyProduct ? (
            <div className="flex flex-col items-center justify-center h-[80vh] py-10 text-gray-500">
              <PackageX size={40} />
              <p className="mt-2 text-sm">No products found</p>
            </div>
          ) : (
            <div className=" overflow-x-auto">
              <DataGrid
                className="w-full"
                rows={tableRecords}
                columns={adminProductTableColumn(
                  handleEdit,
                  handleDelete,
                  handleImageUpload,
                  handleProductView
                )}
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
                pageSizeOptions={[pagination?.pageSize || 10]}
                pagination
                paginationOptions={{
                  showFirstButton: true,
                  showLastButton: true,
                  hideNextButton: currentPage === pagination?.totalPages,
                }}
              />
            </div>
          )}
        </>
      )}
      <Modal
        isOpen={openUpdateModal || openAddModal}
        setIsOpen={openUpdateModal ? setOpenUpdateModal : setOpenAddModal}
        title={
          openUpdateModal ? "Update Product Information" : "Add New Product"
        }
      >
        <AddProductForm
          setOpen={openUpdateModal ? setOpenUpdateModal : setOpenAddModal}
          update={openUpdateModal}
          product={selectedProduct}
        />
      </Modal>

      <Modal
        isOpen={openImageUploadModal}
        setIsOpen={setOpenImageUploadModal}
        title={
          "Add Product Image"
        }
        
      >
        <ImageUploadForm
          setOpen={setOpenImageUploadModal}
          product={selectedProduct}
        />
        
      </Modal>

      {/* <ProductViewModal
        product={selectedProduct}
        setOpen={setOpenProductModal}
        open={openProductModal}
       /> */}

        {openProductModal &&
        selectedProduct && (
          <ProductViewModal
            product={selectedProduct}
            setOpen={setOpenProductModal}
          />
        )}

      <DeleteModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        title="Are you sure, you want delete this?"
        onDeleteHandler={onDeleteHandler}
        loader={loader}
      ></DeleteModal>
    </div>
  );
};

export default AdminProduct;
