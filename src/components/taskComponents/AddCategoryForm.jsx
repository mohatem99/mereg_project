import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCategory } from '../../store/reducers/categoriesSlice';


export default function AddCategoryForm({ onClose }) {
    const [categoryName , setCategoryName] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addCategory({name: categoryName}))
        onClose();
    };


    const handleCancel = () => {
        onClose(); 
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl"> 
                <h2 className="text-customBlue900 font-montserrat text-[20px] font-bold mb-4">Add New Category</h2>
                <form 
                onSubmit={handleSubmit}
                >
                    <div className="mb-4">
                        <label className="block text-customBlue900 mb-2 font-montserrat text-[18px] font-normal">Category Name</label>
                        <input
                            type="text"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 focus:outline-customBlue900 rounded-lg"
                            placeholder="Enter category name"
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="bg-gray-400  hover:bg-gray-700 font-montserrat text-white px-4 py-2 rounded-lg mr-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-customBlue900 hover:bg-[#000541] font-montserrat text-white px-4 py-2 rounded-lg"
                        >
                            Add Category
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
}
