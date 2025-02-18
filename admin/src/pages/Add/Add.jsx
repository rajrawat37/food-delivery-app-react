import React, { useEffect, useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import { FiX } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ url }) => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  function createPreviewofImage() {
    return URL.createObjectURL(image);
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    console.log("File is : ", file);
    setImage(file);
  }

  const removeImage = () => {
    setImage(null);
    setData({
      name: "",
      description: "",
      price: "",
      category: "Salad",
    });
  };

  function onChangeHandler(e) {
    const name = e.target.name;
    const value = e.target.value;
    console.log(e.target);
    setData((data) => ({ ...data, [name]: value }));
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData(); //FormData is a built-in object that makes easier to construct and send form data, especially when dealing with file uploads.
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    const response = await axios.post(`${url}/api/food/add`, formData);

    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Salad",
      });
      setImage(false);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image" className="upload-label">
            {/* Show image preview or default upload area */}
            <div className="image-preview-container">
              <img
                src={image ? createPreviewofImage() : assets.upload_area}
                alt="Upload Preview"
              />
            </div>
          </label>
          <input
            onChange={handleImageChange}
            type="file"
            id="image"
            required
            hidden
          />
        </div>

        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type Here"
            autoComplete="on"
          />
        </div>

        <div className="add-product-description flex-col">
          <p> Product Description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Write content here"
          ></textarea>
        </div>

        <div className="add-category-price ">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select onChange={onChangeHandler} name="category">
              <option value="Salad">Salad</option>
              <option value="Dessert">Dessert</option>
              <option value="Rolls">Rolls</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="Number"
              name="price"
              placeholder="$20"
            />
          </div>
        </div>

        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
