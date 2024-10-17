import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../components/Loading';
import AddCategoryForm from '../components/taskComponents/AddCategoryForm';
import EditCategoryModal from '../components/taskComponents/EditCategoryModal';
import { fetchCategories, removeCategory, updateCategory } from '../store/reducers/categoriesSlice';
import { IoMdAdd } from 'react-icons/io';

export default function Categories() {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const { categories, loading, error } = useSelector((state) => state.categories);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleRemove = (categoryId) => {
        dispatch(removeCategory(categoryId))
    }

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openEditModal = () => {
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedCategoryId(null);
    };

    return loading ? (
        <Loading />
    ) : (
        <div className="flex flex-col items-center justify-center p-4">
            <h1 className="text-customBlue900 font-montserrat text-[25px] font-bold mb-6 text-center">Categories</h1>

            <div className="w-full flex justify-end mb-4">
                <button
                    type="button"
                    onClick={openModal}
                    className="flex items-center text-white bg-customBlue900 hover:bg-customBlue900 focus:ring-4 focus:ring-customBlue900 font-montserrat rounded-3xl text-[15px] px-5 py-2.5"
                >
                    <IoMdAdd className="text-2xl text-white cursor-pointer" />
                    <span className="ml-2">Add Category</span>
                </button>
            </div>

            {/* Table */}
            <div className="w-full max-w-4xl">
                <div className="relative overflow-x-auto shadow-md rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-center font-montserrat text-[19px]">Name</th>
                                <th scope="col" className="px-6 py-3 text-center font-montserrat text-[19px]">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.length > 0 ? (
                                categories.map((category) =>
                                    <tr
                                        key={category._id}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                    >
                                        <td className="px-6 py-4 text-center font-montserrat font-semibold text-customBlue900 text-[18px]">{category?.name} </td>
                                        <td className="px-6 py-4 flex justify-center items-center gap-4">
                                            <button
                                                className="bg-red-600 hover:bg-red-700 text-white font-bold font-montserrat py-2 px-4 rounded"
                                                onClick={() => handleRemove(category._id)}
                                            >
                                                Delete
                                            </button>
                                            {" | "}
                                            <button
                                                className="bg-customBlue900 hover:bg-blue-700 text-white font-bold font-montserrat py-2 px-4 rounded"
                                                onClick={() => {
                                                    openEditModal(category._id)
                                                    setSelectedCategoryId(category._id)
                                                }
                                                }
                                            >
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                )
                            ) : (
                                <tr>
                                    <td colSpan="3" className="text-center py-4">
                                        No Categories Found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Render AddCategoryForm Modal */}
            {isModalOpen && <AddCategoryForm onClose={closeModal} />}

            {/* Render EditCategoryModal if a category is selected for editing */}
            {isEditModalOpen && <EditCategoryModal categoryId={selectedCategoryId} onClose={closeEditModal} />}
        </div>
    );
}
