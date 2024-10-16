import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { updateCategory } from '../../store/reducers/categoriesSlice';


export default function EditCategoryModal({ onClose, categoryId }) {
    const dispatch = useDispatch();
    const Cat = useSelector(store=>store.categories.categories.find(cat=>cat._id === categoryId))
    const [categoryName, setCategoryName] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateCategory({ id: categoryId, name: categoryName }));
        onClose();

    };

    const handleCancel = () => {
        onClose(); 
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
                <h2 className="text-customBlue900 font-montserrat text-[20px] font-bold mb-4">Edit Category</h2>
                <form
                    onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-customBlue900 mb-2 font-montserrat text-[18px] font-normal">
                            Category Name
                        </label>
                        <input
                            type="text"
                            defaultValue={Cat.name}
                            onChange={(e) => setCategoryName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 focus:outline-customBlue900  rounded-lg"
                            placeholder="Enter category name"
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="bg-gray-400 text-white hover:bg-gray-700 font-montserrat px-4 py-2 rounded-lg mr-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-customBlue900 hover:bg-[#000541] font-montserrat text-white px-4 py-2 rounded-lg"
                        >
                            Update Category
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

