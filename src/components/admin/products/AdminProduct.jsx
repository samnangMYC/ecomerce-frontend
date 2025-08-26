import { useState } from "react";
import { Plus } from "lucide-react";
import { PackageX } from "lucide-react";
import Loader from "../../shared/Loader";
import { adminProductTableColumn } from "../../helper/tableColumn";
import { DataGrid } from "@mui/x-data-grid";

const AdminProduct = () => {
  const product = [
    {
      productId: 1,
      productName: "L'Oréal Paris True Match Foundation",
      image:
        "http://localhost:8080/images/949efab0-afa1-4750-b03c-e2f8b18a66fa.jpg",
      description:
        "Blendable foundation with SPF 17 for a flawless, natural look and medium coverage for all skin types.",
      quantity: 113,
      price: 15.97401,
      discount: 0.1,
      specialPrice: 14.39,
    },
    {
      productId: 2,
      productName: "Apple MacBook Air M2",
      image:
        "http://localhost:8080/images/c2f0cf0a-eae0-4528-bdab-a0a8e4e73fda.jpeg",
      description:
        "Lightweight laptop with Apple's M2 chip, delivering powerful performance and all-day battery in a sleek design.",
      quantity: 18,
      price: 1099.440005,
      discount: 0.05,
      specialPrice: 1044.99,
    },
    {
      productId: 3,
      productName: "JBL Charge 5 Bluetooth Speaker",
      image:
        "http://localhost:8080/images/dd2f700c-616c-4b08-82a4-05590b593c07.jpg",
      description:
        "Portable waterproof speaker with bold sound, powerful bass, and 20 hours of playtime for music lovers.",
      quantity: 67,
      price: 179.73406,
      discount: 0.12,
      specialPrice: 158.36,
    },
    {
      productId: 52,
      productName: "Sony WH-1000XM5 Headphones",
      image:
        "http://localhost:8080/images/a1b0925e-05ce-4651-81a1-69d1b9f72fbf.jpg",
      description:
        "Industry-leading noise canceling wireless headphones with crystal-clear audio, voice assistant support, and up to 30 hours of battery life.",
      quantity: 45,
      price: 399.390015,
      discount: 0.15,
      specialPrice: 339.99,
    },
    {
      productId: 61,
      productName: "Calvin Klein Eternity for Men",
      image:
        "http://localhost:8080/images/80133dc1-c4d6-4dfd-9d10-825bc79c201c.webp",
      description:
        "A classic aromatic fougère fragrance with fresh lavender, mandarin orange, and sage, perfect for everyday wear.",
      quantity: 50,
      price: 84.915,
      discount: 0.1,
      specialPrice: 76.5,
    },
    {
      productId: 62,
      productName: "Levi's 501 Original Fit Jeans",
      image:
        "http://localhost:8080/images/66b8b003-be5a-49c5-8513-128cae1a6e85.jpeg",
      description:
        "Timeless straight-leg jeans crafted from durable denim with a button-fly closure and classic five-pocket styling.",
      quantity: 120,
      price: 64.9025,
      discount: 0.15,
      specialPrice: 55.25,
    },
    {
      productId: 64,
      productName: "Dior Sauvage Eau de Parfum",
      image:
        "http://localhost:8080/images/33a8efaa-e09c-44c5-b353-819b58d719d9.png",
      description:
        "A bold and sensual fragrance featuring fresh bergamot, spicy Sichuan pepper, and warm ambroxan for a magnetic and lasting trail.",
      quantity: 45,
      price: 139.78001500000002,
      discount: 0.15,
      specialPrice: 118.99,
    },
    {
      productId: 65,
      productName: "Starbucks Cold Brew Coffee",
      image:
        "http://localhost:8080/images/84e8e081-049c-4ff5-803f-af409d6b591f.webp",
      description:
        "Smooth and refreshing cold brew coffee with a rich, bold flavor and subtle sweetness, perfect for any time of day.",
      quantity: 100,
      price: 4.4955,
      discount: 0.1,
      specialPrice: 4.05,
    },
  ];
  const pagination = {
    pageNumber: 0,
    pageSize: 10,
    totalElements: 8,
    totalPages: 1,
    lastPage: true,
  };
  const emptyProduct = !product || product?.length === 0;
  //const emptyProduct = true
  const [isLoading, setIsLoading] = useState(false);

  const tableRecords = product?.map((item) => ({
    id: item.productId,
    productName: item.productName,
    image: item.image,
    description: item.description,
    quantity: item.quantity,
    price: item.price,
    discount: item.discount,
    specialPrice: item.specialPrice,
  }));

  const handleEdit = (product) => {};
  const handleDelete = (product) => {};
  const handleImageUpload = (product) => {};
  const handleProductView = (product) => {};
  const handlePaginationChange = (product) => {};

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
          className="flex items-center gap-2 text-white bg-gradient-to-br from-purple-600 to-blue-500 
                   hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 
                   dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          <Plus size={18} />
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
                  handleEdit
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
    </div>
  );
};

export default AdminProduct;
