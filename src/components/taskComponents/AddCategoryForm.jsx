import React from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addCategory } from '../../store/reducers/categoriesSlice';
import notify from '../../hooks/useNotification';

export default function AddCategoryForm({ onClose }) {
    const dispatch = useDispatch();


    const formik = useFormik({
        initialValues: {
            categoryName: '',
        },
        validationSchema: Yup.object({
            categoryName: Yup.string()
                .required('Category name is required')
                .min(2, 'Category name must be at least 2 characters long'),
        }),
        onSubmit: (values, { resetForm }) => {
            dispatch(addCategory({ name: values.categoryName }));
            resetForm();
            onClose();
            notify("Category Added Successfully", "success")
        },
    });

    const handleCancel = () => {
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
                <h2 className="text-customBlue900 font-montserrat text-[20px] font-bold mb-4">Add New Category</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-customBlue900 mb-2 font-montserrat text-[18px] font-normal">
                            Category Name
                        </label>
                        <input
                            type="text"
                            name="categoryName"
                            value={formik.values.categoryName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`w-full px-4 py-2 border rounded-lg ${formik.touched.categoryName && formik.errors.categoryName
                                ? 'border-red-500'
                                : 'border-neutral-300'} `}
                            placeholder="Enter category name"
                        />
                        {formik.touched.categoryName && formik.errors.categoryName && (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.categoryName}</div>
                        )}
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="bg-gray-400 hover:bg-gray-700 font-montserrat text-white px-4 py-2 rounded-lg mr-2"
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
