import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = Boolean(id);
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        shortDescription: "",
        description: "",
        category: "",
        subcategory: [],
        shopconcern: [],
        sku: "",
        section: "",
        stock: "",
        productType: "simple",
        price: 0,
        discountPrice: 0,
        variant: [],
    });

    const [thumbImg, setThumbImg] = useState(null);
    const [thumbImgPreview, setThumbImgPreview] = useState("");
    const [galleryImgs, setGalleryImgs] = useState([]);
    const [galleryPreviews, setGalleryPreviews] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredSubcategories, setFilteredSubcategories] = useState([]);
    const [shopconcerns, setShopconcerns] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [showVariantFields, setShowVariantFields] = useState(false);

    useEffect(() => {
        fetchCategories();
        fetchShopConcern();
        if (id) {
            fetchProductDetails();
        }
    }, [id]);


    // Added handler:
    const handleShopConcernChange = (e) => {
        const selected = Array.from(e.target.selectedOptions).map((opt) => opt.value);
        setFormData((prev) => ({ ...prev, shopconcern: selected }));
    };

    const descriptionEditorRef = useRef(null);
    const shortDescriptionEditorRef = useRef(null);

    useEffect(() => {
        if (window.CKEDITOR) {
            descriptionEditorRef.current = window.CKEDITOR.replace("description-editor");
            shortDescriptionEditorRef.current = window.CKEDITOR.replace("short-description-editor");

            descriptionEditorRef.current.on("change", () => {
                setFormData((prev) => ({
                    ...prev,
                    description: descriptionEditorRef.current.getData(),
                }));
            });

            shortDescriptionEditorRef.current.on("change", () => {
                setFormData((prev) => ({
                    ...prev,
                    shortDescription: shortDescriptionEditorRef.current.getData(),
                }));
            });
        }

        return () => {
            if (descriptionEditorRef.current) descriptionEditorRef.current.destroy();
            if (shortDescriptionEditorRef.current) shortDescriptionEditorRef.current.destroy();
        };
    }, [isEditMode]);

    const fetchCategories = async () => {
        try {
            const res = await axios.get("http://localhost:4000/api/category/list");
            setCategories(res.data.categorys);
        } catch (error) {
            console.error("Error fetching categories:", error);
            toast.error("Failed to load categories");
        }
    };

    const fetchSubcategories = async (category) => {
        try {
            const res = await axios.get(
                `http://localhost:4000/api/subcategory/get?category=${category}`
            );
            setFilteredSubcategories(res.data.subcategorys);
        } catch (error) {
            console.error("Error fetching subcategories:", error);
            toast.error("Failed to load subcategories");
        }
    };


    const fetchShopConcern = async () => {
        try {
            const res = await axios.get(
                "http://localhost:4000/api/shop/list"
            );
            setShopconcerns(res.data.shops);
        } catch (error) {
            console.error("Error fetching shopconcerns:", error);
            toast.error("Failed to load shopconcerns");
        }
    };

    const fetchProductDetails = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:4000/api/product/${id}`);
            if (response.data.success) {
                const product = response.data.product;

                setFormData({
                    name: product.name || "",
                    slug: product.slug || "",
                    shortDescription: product.shortDescription || "",
                    description: product.description || "",
                    category: product.category || "",
                    subcategory: product.subcategory || [],
                    shopconcern: product.shopconcern || [],
                    sku: product.sku || "",
                    section: product.section || "",
                    stock: product.stock || "",
                    productType: product.variant?.length > 0 ? "variable" : "simple",
                    price: product.price || 0,
                    discountPrice: product.discountPrice || 0,
                    variant: product.variant || [],
                });

                setShowVariantFields(product.variant?.length > 0);

                if (product.thumbImg) {
                    setThumbImgPreview(`${product.thumbImg}`);
                }

                if (product.galleryImg?.length > 0) {
                    const galleryUrls = product.galleryImg.map(img =>
                        typeof img === 'string' ? `${img}` : img
                    );
                    setGalleryPreviews(galleryUrls);
                }
                if (product.category) {
                    fetchSubcategories(product.category);
                }
                fetchShopConcern(product.shopconcern)

                // Set CKEditor content after a small delay to ensure editors are initialized
                setTimeout(() => {
                    if (descriptionEditorRef.current) {
                        descriptionEditorRef.current.setData(product.description || "");
                    }
                    if (shortDescriptionEditorRef.current) {
                        shortDescriptionEditorRef.current.setData(product.shortDescription || "");
                    }
                }, 200);
            } else {
                toast.error("❌ Failed to load product.");
            }
        } catch (err) {
            console.error(err);
            toast.error("❌ Error fetching product.");
        } finally {
            setLoading(false);
        }
    };

      const generateSlug = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

    const handleChange = (e) => {
        const { name, value } = e.target;
        // setFormData((prev) => ({ ...prev, [name]: value }));
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

        if (name === "category") {
            setFormData((prev) => ({ ...prev, subcategory: [] }));
            fetchSubcategories(value);
        }

        if (name === "productType") {
            setShowVariantFields(value === "variable");
            if (value === "simple") {
                setFormData((prev) => ({ ...prev, variant: [] }));
            }
        }
    };

    const handleSubcategoryChange = (e) => {
        const selected = Array.from(e.target.selectedOptions).map((opt) => opt.value);
        setFormData((prev) => ({ ...prev, subcategory: selected }));
    };

    const handleVariantChange = (e, index, key) => {
        const newVariants = [...formData.variant];
        newVariants[index] = {
            ...newVariants[index],
            [key]: key.includes("price") ? parseFloat(e.target.value) : e.target.value,
        };
        setFormData((prev) => ({ ...prev, variant: newVariants }));
    };

    const addVariantField = () => {
        setFormData((prev) => ({
            ...prev,
            variant: [...prev.variant, { size: "", price: 0, discountPrice: 0 }],
        }));
    };

    const removeVariantField = (index) => {
        const newVariants = [...formData.variant];
        newVariants.splice(index, 1);
        setFormData((prev) => ({ ...prev, variant: newVariants }));
    };

    const handleThumbImgChange = (e) => {
        if (e.target.files[0]) {
            setThumbImg(e.target.files[0]);
            setThumbImgPreview(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleGalleryImgsChange = (e) => {
        if (e.target.files.length > 0) {
            const newGalleryImgs = Array.from(e.target.files);
            setGalleryImgs([...galleryImgs, ...newGalleryImgs]);

            const newPreviews = newGalleryImgs.map(file => URL.createObjectURL(file));
            setGalleryPreviews([...galleryPreviews, ...newPreviews]);
        }
    };

    const removeGalleryImg = (index) => {
        const newPreviews = [...galleryPreviews];
        newPreviews.splice(index, 1);
        setGalleryPreviews(newPreviews);

        // If it's a newly added image (not from server)
        if (index >= galleryPreviews.length - galleryImgs.length) {
            const newGalleryImgs = [...galleryImgs];
            newGalleryImgs.splice(index - (galleryPreviews.length - galleryImgs.length), 1);
            setGalleryImgs(newGalleryImgs);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg("");

        try {
            const payload = new FormData();

            // Append all form data
            Object.entries(formData).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    payload.append(key, JSON.stringify(value));
                } else {
                    payload.append(key, value);
                }
            });

            // Append images
            if (thumbImg) payload.append("thumbImg", thumbImg);
            galleryImgs.forEach((img) => payload.append("galleryImg", img));

            let response;
            if (isEditMode) {
                response = await axios.post(
                    `http://localhost:4000/api/product/${id}`,
                    payload,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );
            } else {
                response = await axios.post(
                    "http://localhost:4000/api/product/add",
                    payload,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );
            }

            if (response.data.success) {
                toast.success(`🎉 Product ${isEditMode ? 'updated' : 'added'} successfully!`);

            } else {
                throw new Error(response.data.message || "Operation failed");
            }
        } catch (error) {
            setErrorMsg(
                error.response?.data?.message ||
                `Failed to ${isEditMode ? 'update' : 'add'} product. Please check your inputs and try again.`
            );
            console.error(`Error ${isEditMode ? 'updating' : 'adding'} product:`, error);
            toast.error(`❌ Failed to ${isEditMode ? 'update' : 'add'} product`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full mx-auto p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
                {isEditMode ? "Edit Product" : "Add New Product"}
            </h2>

            {errorMsg && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                    <p>{errorMsg}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information Section */}
                <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {["name", "slug", "sku", "section"].map((field) => (
                            <div key={field} className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700 capitalize">
                                    {field === "sku" ? "SKU" : field}
                                </label>
                                <input
                                    name={field}
                                    value={formData[field]}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    onChange={handleChange}
                                    required={field !== "slug"}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Description Section */}
                <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Descriptions</h3>

                    <div className="space-y-4">
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Short Description</label>
                            <textarea
                                id="short-description-editor"
                                name="shortDescription"
                                rows="3"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Detailed Description</label>
                            <textarea
                                id="description-editor"
                                name="description"
                                rows="5"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Category Section */}
                <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Categories</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Category</option>
                                {categories.map((cat) => (
                                    <option key={cat._id} value={cat.name}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {formData.category && (
    <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Subcategories</label>
        
        {/* Selected subcategories chips */}
        <div className="mb-2">
            {formData.subcategory.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                    {formData.subcategory.map((subName, index) => (
                        <span 
                            key={index}
                            className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-sm"
                        >
                            {subName}
                            <button
                                type="button"
                                onClick={() => {
                                    const updated = [...formData.subcategory];
                                    updated.splice(index, 1);
                                    setFormData(prev => ({...prev, subcategory: updated}));
                                }}
                                className="ml-2 text-indigo-600 hover:text-indigo-900"
                            >
                                ×
                            </button>
                        </span>
                    ))}
                </div>
            )}
        </div>

        {/* Enhanced multi-select dropdown */}
        <div className="relative">
            <select
                multiple
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 h-auto min-h-[100px]"
                value={formData.subcategory}
                onChange={handleSubcategoryChange}
            >
                {filteredSubcategories.map((sub) => (
                    <option 
                        key={sub._id} 
                        value={sub.name}
                        className={`${formData.subcategory.includes(sub.name) ? 'bg-indigo-50' : ''}`}
                    >
                        {sub.name}
                        {formData.subcategory.includes(sub.name) }
                    </option>
                ))}
            </select>
            
            {/* Clear all button */}
            {formData.subcategory.length > 0 && (
                <button
                    type="button"
                    onClick={() => setFormData(prev => ({...prev, subcategory: []}))}
                    className="absolute right-2 top-2 text-xs text-indigo-600 hover:text-indigo-900"
                >
                    Clear All
                </button>
            )}
        </div>
        
        <p className="text-xs text-gray-500 mt-1">
            {formData.subcategory.length > 0 
                ? `${formData.subcategory.length} selected - Click to deselect or use Clear All`
                : "Hold Ctrl/Cmd to select multiple"}
        </p>
    </div>
)}
                    </div>
                </div>




              {/* Shop Concern Section */}
<div className="bg-gray-50 p-6 rounded-lg">
    <h3 className="text-lg font-medium text-gray-900 mb-4">Shop Concerns</h3>
    <div className="space-y-1">
        {/* Selected items display */}
        <div className="mb-2">
            {formData.shopconcern.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                    {formData.shopconcern.map((shopName, index) => (
                        <span
                            key={index}
                            className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-sm"
                        >
                            {shopName}
                            <button
                                type="button"
                                onClick={() => {
                                    const updated = [...formData.shopconcern];
                                    updated.splice(index, 1);
                                    setFormData(prev => ({ ...prev, shopconcern: updated }));
                                }}
                                className="ml-2 text-indigo-600 hover:text-indigo-900"
                                aria-label={`Remove ${shopName}`}
                            >
                                ×
                            </button>
                        </span>
                    ))}
                </div>
            )}
        </div>

        {/* Multi-select dropdown */}
        <div className="relative">
            <select
                multiple
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 h-auto min-h-[100px]"
                value={formData.shopconcern}
                onChange={handleShopConcernChange}
            >
                {shopconcerns.map((shop) => (
                    <option
                        key={shop._id}
                        value={shop.name}
                        className={`${formData.shopconcern.includes(shop.name) ? 'bg-indigo-50 font-medium' : ''} py-1`}
                    >
                        {shop.name}
                        {formData.shopconcern.includes(shop.name) && (
                            <span className="float-right mr-2">✓</span>
                        )}
                    </option>
                ))}
            </select>

            {/* Clear all button */}
            {formData.shopconcern.length > 0 && (
                <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, shopconcern: [] }))}
                    className="absolute right-2 top-2 text-xs text-indigo-600 hover:text-indigo-900 bg-white px-2 py-1 rounded"
                >
                    Clear All
                </button>
            )}
        </div>

        {/* Help text */}
        <p className="text-xs text-gray-500 mt-1">
            {formData.shopconcern.length > 0
                ? `${formData.shopconcern.length} selected - Click × to remove or use Clear All`
                : "Hold Ctrl/Cmd to select multiple"}
        </p>
    </div>
</div>


                {/* Pricing Section */}
                <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Pricing</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Product Type</label>
                            <select
                                name="productType"
                                value={formData.productType}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                onChange={handleChange}
                                required
                            >
                                <option value="simple">Simple Product</option>
                                <option value="variable">Variable Product</option>
                            </select>
                        </div>

                        {formData.productType === "simple" && (
                            <>
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        min="0"
                                        step="0.01"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700">Discount Price ($)</label>
                                    <input
                                        type="number"
                                        name="discountPrice"
                                        value={formData.discountPrice}
                                        min="0"
                                        step="0.01"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        onChange={handleChange}
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    {showVariantFields && (
                        <div className="mt-6 space-y-4">
                            <div className="flex justify-between items-center">
                                <h4 className="text-md font-medium text-gray-700">Product Variants</h4>
                                <button
                                    type="button"
                                    onClick={addVariantField}
                                    className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition"
                                >
                                    + Add Variant
                                </button>
                            </div>

                            {formData.variant.map((v, i) => (
                                <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                                    <div className="space-y-1">
                                        <label className="block text-sm font-medium text-gray-700">Size</label>
                                        <input
                                            type="text"
                                            placeholder="e.g., S, M, L"
                                            value={v.size}
                                            onChange={(e) => handleVariantChange(e, i, "size")}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                                        <input
                                            type="number"
                                            placeholder="Price"
                                            value={v.price}
                                            min="0"
                                            step="0.01"
                                            onChange={(e) => handleVariantChange(e, i, "price")}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="block text-sm font-medium text-gray-700">Discount ($)</label>
                                        <input
                                            type="number"
                                            placeholder="Discount Price"
                                            value={v.discountPrice}
                                            min="0"
                                            step="0.01"
                                            onChange={(e) => handleVariantChange(e, i, "discountPrice")}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => removeVariantField(i)}
                                        className="px-3 py-2 bg-red-100 text-red-600 text-sm rounded-md hover:bg-red-200 transition"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="mt-4 space-y-1">
                        <label className="block text-sm font-medium text-gray-700">Stock Quantity</label>
                        <input
                            type="number"
                            name="stock"
                            value={formData.stock}
                            min="0"
                            className="w-full md:w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                {/* Images Section */}
                <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Product Images</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Thumbnail Image Upload */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Thumbnail Image</label>
                            <div className="flex flex-col items-center space-y-4">
                                {thumbImgPreview ? (
                                    <div className="relative group">
                                        <img
                                            src={thumbImgPreview}
                                            alt="Thumbnail preview"
                                            className="w-full h-48 object-contain rounded-lg border border-gray-200"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setThumbImg(null);
                                                setThumbImgPreview("");
                                            }}
                                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                ) : (
                                    <label className="flex flex-col items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-white hover:border-indigo-500 transition-colors">
                                        <svg className="w-10 h-10 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                        </svg>
                                        <span className="text-sm text-gray-600">Click to upload thumbnail</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleThumbImgChange}
                                            className="hidden"
                                            required={!isEditMode}
                                        />
                                    </label>
                                )}
                            </div>
                            <p className="text-xs text-gray-500">Main product image (required, 1:1 ratio recommended)</p>
                        </div>

                        {/* Gallery Images Upload */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Gallery Images</label>
                            <div className="space-y-4">
                                <label className="flex flex-col items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-white hover:border-indigo-500 transition-colors">
                                    <svg className="w-10 h-10 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                    </svg>
                                    <span className="text-sm text-gray-600">
                                        {galleryPreviews.length > 0
                                            ? `Add more images (${galleryPreviews.length} selected)`
                                            : "Click to upload gallery images"}
                                    </span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleGalleryImgsChange}
                                        className="hidden"
                                    />
                                </label>

                                {galleryPreviews.length > 0 && (
                                    <div className="grid grid-cols-3 gap-2">
                                        {galleryPreviews.map((img, index) => (
                                            <div key={index} className="relative group">
                                                <img
                                                    src={img}
                                                    alt={`Gallery preview ${index + 1}`}
                                                    className="w-full h-24 object-cover rounded border border-gray-200"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeGalleryImg(index)}
                                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <p className="text-xs text-gray-500">Additional product images (optional)</p>
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </span>
                        ) : (
                            isEditMode ? "Update Product" : "Add Product"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;