import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { updateUser } from '../services/services';
import { toast } from 'react-toastify';

function EditModal({ isOpen, onClose, editingItem, fetchData }) {
    console.log(editingItem?.attributes?.email);
  const [formData, setFormData] = useState({
    firstName: editingItem?.attributes?.firstName,
    lastName: editingItem?.attributes?.lastName,
    email: editingItem?.attributes?.email,
    postalCode: editingItem?.attributes?.postalCode,
  });

  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    postalCode: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {
      firstName: formData.firstName.trim() === '',
      lastName: formData.lastName.trim() === '',
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
      postalCode: formData.postalCode.trim() === '',
    };

    if (Object.values(errors).some((error) => error)) {
      setFormErrors(errors);
      return;
    }

    updateUser(formData, editingItem.id)
      .then((res) => {
        toast.success('User updated with success !');
        fetchData();
        onClose();
      })
      .catch((err) => {
        toast.error('there is an error !');
        console.log(err)}
        );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className={`fixed inset-0 flex mt-32 justify-center ${isOpen ? '' : 'hidden'}`}>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <FaTimes />
          </button>
        </div>
        <h2 className="text-xl font-semibold mb-2">Edit user</h2>
        <form onSubmit={handleSubmit} className="border rounded p-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className={`border p-2 rounded w-full mb-2 focus:outline-none focus:border-${
              formErrors.firstName ? 'red' : 'blue'
            }-500`}
          />
          {formErrors.firstName && (
            <p className="text-red-500">Invalid first name</p>
          )}

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className={`border p-2 rounded w-full mb-2 focus:outline-none focus:border-${
              formErrors.lastName ? 'red' : 'blue'
            }-500`}
          />
          {formErrors.lastName && (
            <p className="text-red-500">Invalid last name</p>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={`border p-2 rounded w-full mb-2 focus:outline-none focus:border-${
              formErrors.email ? 'red' : 'blue'
            }-500`}
          />
          {formErrors.email && <p className="text-red-500">Invalid email</p>}

          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={formData.postalCode}
            onChange={handleChange}
            className={`border p-2 rounded w-full mb-2 focus:outline-none focus:border-${
              formErrors.postalCode ? 'red' : 'blue'
            }-500`}
          />
          {formErrors.postalCode && (
            <p className="text-red-500">Invalid postal code</p>
          )}

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Update
            </button>
            <button type="button" onClick={onClose} className="text-red-500">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditModal;
