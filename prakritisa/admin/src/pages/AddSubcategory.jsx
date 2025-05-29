import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddSubcategory = () => {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    category: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const editSubcategory = location.state?.subcategory || null;

  // Set form data for editing
  useEffect(() => {
    if (editSubcategory) {
      setFormData({
        name: editSubcategory.name || "",
        slug: editSubcategory.slug || "",
        category: editSubcategory.category || "",
        image: null, 
      });
      if (editSubcategory.image) {
        setPreview(editSubcategory.image); 
      }
    }
  }, [editSubcategory]);

  // Fetch category list
  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/category/list");
      setCategories(res.data.categorys);
    } catch (error) {
      toast.error("Failed to fetch categories");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const generateSlug = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");


 const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === "name") {
    const slug = generateSlug(value);
    setFormData((prev) => ({
      ...prev,
      name: value,
      slug: slug,
    }));
  } else {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, slug, category, image } = formData;

    if (!name || !slug || !category || (!editSubcategory && !image)) {
      toast.error("Please fill in all fields");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", name);
    formDataToSend.append("slug", slug);
    formDataToSend.append("category", category);
    if (image) formDataToSend.append("image", image);

    setLoading(true);

    try {
      if (editSubcategory) {
        await axios.put(
          `http://localhost:4000/api/subcategory/${editSubcategory._id}`,
          formDataToSend,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        toast.success("Subcategory updated successfully");
      } else {
        await axios.post(
          "http://localhost:4000/api/subcategory/add",
          formDataToSend,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        toast.success("Subcategory added successfully");
      }
      
    } catch (error) {
      toast.error("Operation failed");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-5 bg-white p-10 rounded-xl shadow-md">
      <header className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800">
          {editSubcategory ? "Edit Subcategory" : "Add New SubCategory"}
        </h2>
        <hr className="mt-3 border-t-2 border-gray-200 w-full" />
      </header>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
            Subcategory Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Smartphones"
            className="w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label htmlFor="slug" className="block text-sm font-semibold text-gray-700 mb-1">
            Slug (URL Friendly)
          </label>
          <input
            type="text"
            name="slug"
            id="slug"
            value={formData.slug}
            onChange={handleChange}
            placeholder="e.g. smartphones"
            className="w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-1">
            Select Category
          </label>
          <select
            name="category"
            id="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">Choose Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-semibold text-gray-700 mb-1">
            Upload Image
          </label>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border rounded-xl shadow-sm"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-3 rounded-xl h-32 w-auto object-cover border"
            />
          )}
        </div>

        <div className="md:col-span-2 mt-6">
          <button
            type="submit"
            disabled={loading}
            className="px-10 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition duration-200 disabled:opacity-60"
          >
            {loading
              ? editSubcategory
                ? "Updating..."
                : "Adding..."
              : editSubcategory
              ? "Update Subcategory"
              : "Add Subcategory"}
          </button>
        </div>
      </form>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default AddSubcategory;
