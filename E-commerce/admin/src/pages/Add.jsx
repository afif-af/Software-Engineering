
import { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!image1) {
      toast.error("Please upload at least one product image");
      return;
    }

    if (sizes.length === 0) {
      toast.error("Please select at least one size");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        {
          headers: {
            token: token,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);

        // Reset form
        setName("");
        setDescription("");
        setPrice("");
        setCategory("Men");
        setSubCategory("Topwear");
        setBestseller(false);
        setSizes([]);

        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
        error.message ||
        "Something went wrong"
      );
    }
  };

  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size)
        ? prev.filter((item) => item !== size)
        : [...prev, size]
    );
  };

  const imageBoxes = [
    {
      id: "image1",
      image: image1,
      setImage: setImage1,
    },
    {
      id: "image2",
      image: image2,
      setImage: setImage2,
    },
    {
      id: "image3",
      image: image3,
      setImage: setImage3,
    },
    {
      id: "image4",
      image: image4,
      setImage: setImage4,
    },
  ];

  return (
    <form
      onSubmit={onSubmitHandler}
      className="w-full max-w-5xl mx-auto pb-10"
    >
      {/* Page Header */}
      <div className="mb-7">
        <h1 className="text-2xl font-semibold text-gray-900">
          Add New Product
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Add product information, images, pricing and sizes.
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 sm:p-7">

        {/* Product Images */}
        <div className="mb-8">
          <h2 className="text-base font-semibold text-gray-900 mb-1">
            Product Images
          </h2>

          <p className="text-sm text-gray-500 mb-4">
            Upload up to 4 product images.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {imageBoxes.map((item) => (
              <label
                key={item.id}
                htmlFor={item.id}
                className="
                  group relative
                  flex items-center justify-center
                  aspect-square
                  border-2 border-dashed border-gray-300
                  rounded-xl
                  overflow-hidden
                  cursor-pointer
                  bg-gray-50
                  hover:border-blue-500
                  hover:bg-blue-50
                  transition
                "
              >
                <img
                  className="w-full h-full object-cover"
                  src={
                    !item.image
                      ? assets.upload_area
                      : URL.createObjectURL(item.image)
                  }
                  alt="Upload"
                />

                {!item.image && (
                  <div className="absolute bottom-2 left-0 right-0 text-center">
                    <span className="text-xs text-gray-500">
                      Upload image
                    </span>
                  </div>
                )}

                <input
                  id={item.id}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) =>
                    item.setImage(e.target.files?.[0] || false)
                  }
                />
              </label>
            ))}
          </div>
        </div>

        {/* Product Name */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Name
          </label>

          <input
            type="text"
            placeholder="Enter product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="
              w-full
              border border-gray-300
              rounded-xl
              px-4 py-3
              outline-none
              focus:ring-2 focus:ring-blue-500
              focus:border-blue-500
              transition
            "
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Description
          </label>

          <textarea
            placeholder="Write product description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows="5"
            className="
              w-full
              border border-gray-300
              rounded-xl
              px-4 py-3
              outline-none
              resize-none
              focus:ring-2 focus:ring-blue-500
              focus:border-blue-500
              transition
            "
          />
        </div>

        {/* Category / Subcategory / Price */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-7">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="
                w-full
                border border-gray-300
                rounded-xl
                px-4 py-3
                bg-white
                outline-none
                focus:ring-2 focus:ring-blue-500
              "
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sub Category
            </label>

            <select
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              className="
                w-full
                border border-gray-300
                rounded-xl
                px-4 py-3
                bg-white
                outline-none
                focus:ring-2 focus:ring-blue-500
              "
            >
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price
            </label>

            <input
              type="number"
              placeholder="25"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              min="0"
              className="
                w-full
                border border-gray-300
                rounded-xl
                px-4 py-3
                outline-none
                focus:ring-2 focus:ring-blue-500
                focus:border-blue-500
              "
            />
          </div>
        </div>

        {/* Sizes */}
        <div className="mb-7">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Product Sizes
          </label>

          <div className="flex flex-wrap gap-3">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <button
                type="button"
                key={size}
                onClick={() => toggleSize(size)}
                className={`
                  min-w-12 px-4 py-2.5
                  rounded-lg
                  border
                  text-sm font-medium
                  transition
                  ${
                    sizes.includes(size)
                      ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                      : "bg-gray-50 text-gray-700 border-gray-300 hover:border-blue-400"
                  }
                `}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Bestseller */}
        <div className="mb-8">
          <label
            htmlFor="bestseller"
            className="
              flex items-center gap-3
              cursor-pointer
              w-fit
            "
          >
            <input
              id="bestseller"
              type="checkbox"
              checked={bestseller}
              onChange={() => setBestseller((prev) => !prev)}
              className="w-4 h-4 accent-blue-600"
            />

            <span className="text-sm font-medium text-gray-700">
              Add this product to bestseller
            </span>
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="
            w-full sm:w-auto
            min-w-36
            px-7 py-3
            bg-gray-900
            hover:bg-blue-600
            text-white
            rounded-xl
            text-sm
            font-semibold
            transition-all duration-200
            shadow-sm
            hover:shadow-md
            active:scale-95
          "
        >
          Add Product
        </button>

      </div>
    </form>
  );
};

export default Add;

