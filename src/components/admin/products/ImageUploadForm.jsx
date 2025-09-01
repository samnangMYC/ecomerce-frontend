import { X } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { updateProductImageFromDashboard } from "../../../store/actions";
import Spinners from "../../shared/Spinners";

const ImageUploadForm = ({ setOpen, product }) => {
  console.log("Product Id" + product?.id);
  const fileInputRef = useRef();
  const dispatch = useDispatch();

  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState("");
  const [loader, setLoader] = useState(false);

  const onHandleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && ["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setSelectedFile(file);
    } else {
      toast.error("Please select a valid image file(.jpeg, .jpg, .png)");
      setPreview(null);
      setSelectedFile(null);
    }
  };
  const handleClearImage = () => {
    setPreview(null);
    setSelectedFile(null);
  };
  const addNewImageHandler = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      toast.error("Please select an image to upload");
      return;
    }

    if (!product?.id) {
      toast.error("Product ID is missing.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    dispatch(
      updateProductImageFromDashboard(
        formData,
        product.id,
        toast,
        setLoader,
        setOpen
      )
    );
  };
  return (
    <div className="p-6 max-w-full h-[550px] flex flex-col justify-between">
      <form
        className="flex flex-col justify-between h-full"
        onSubmit={addNewImageHandler}
      >
        {/* Upper part: Upload / Preview */}
        <div className="flex flex-col gap-6 items-center justify-center">
          {/* Upload Placeholder */}
          <label
            htmlFor="image"
            className="flex flex-col items-center justify-center w-full h-72 border-2 border-dashed border-yellow-400 rounded-xl cursor-pointer hover:bg-yellow-50 transition-colors duration-300 shadow-sm hover:shadow-md"
          >
            <FaCloudUploadAlt size={40} className="text-yellow-500 mb-3" />
            <span className="text-yellow-500 font-medium text-center">
              Upload Product Image
            </span>
            <input
              id="image"
              type="file"
              ref={fileInputRef}
              onChange={onHandleImageChange}
              className="hidden"
              accept=".jpeg, .jpg, .png"
            />
          </label>

          {/* Image Preview */}
          {preview && (
            <div className="relative w-full sm:w-72 h-72 rounded-xl border-2 border-dashed border-indigo-300 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <img
                src={preview}
                alt="Image preview"
                className="w-full h-full object-cover rounded-xl"
              />
              <button
                onClick={handleClearImage}
                className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 shadow-md transition-colors duration-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Bottom buttons */}
        <div className="flex justify-between mt-4">
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button variant="contained" color="primary" type="submit">
            {loader ? (
              <div className="flex gap-2">
                <Spinners className="text-white" />
                Uploading...
              </div>
            ) : (
              "Upload"
            )}{" "}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ImageUploadForm;
