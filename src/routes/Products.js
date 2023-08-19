import React, { useState, useEffect } from 'react';
import EditModal from '../components/edit'; 
import AddModal from '../components/add'; 
import { getList, deleteUser, getUserById } from '../services/services';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';

function App() {
  const [data, setData] = useState([]);
  const [editingItem, setEditingItem] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const openEditModal = (id) => {
    setEditingItemId(id);
  };

  const closeEditModal = () => {
    setEditingItemId(null);
  };

  const openDeleteConfirmation = (id) => {
    setEditingItemId(null);
    setEditingItem(null);
    setDeleteItemId(id);
    setIsDeleteConfirmationOpen(true);
  };

  const closeDeleteConfirmation = () => {
    setIsDeleteConfirmationOpen(false);
    setDeleteItemId(null);
  };

  function fetchData() {
    getList()
      .then((results) => {
        console.log(results?.data);
        setData(results?.data?.data);
      })
      .catch(err => console.log(err));
  }

  async function handleEdit(id) {
    setEditingItem(null)
    getUserById(id)
      .then((results) => {
        console.log(results?.data?.data);
        setEditingItem(results?.data?.data);
        openEditModal(id);
      })
      .catch(err => console.log(err))
  }

  function handleDelete() {
    if (deleteItemId) {
      deleteUser(deleteItemId)
        .then((res) => {
          console.log(res);
          toast.success('User deleted with success !');
          closeDeleteConfirmation();
          fetchData();
        })
        .catch((err) => {
          toast.error('there is an error !');
          console.log(err)
        }
        );
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  return (
    <div className="container mx-auto p-8">
      <button onClick={openAddModal} className='m-5'>
        <FaPlus />
      </button>
      <table className="w-full border-collapse border-2">
        <thead>
        <tr className="bg-gray-100 text-center">
          <th className="border p-2">First Name</th>
          <th className="border p-2">Last Name</th>
          <th className="border p-2">Email</th>
          <th className="border p-2">Postal Code</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>
        <tbody>
          {data?.map(item => (
            <tr key={item.id} className="bg-white text-center">
              <td className="border p-2">{item.attributes?.firstName}</td>
              <td className="border p-2">{item.attributes?.lastName}</td>
              <td className="border p-2">{item.attributes?.email}</td>
              <td className="border p-2">{item.attributes?.postalCode}</td>
              <td className="border p-2">
                <button className="mr-2 text-blue-500" onClick={() => handleEdit(item?.id)}>Edit</button>
                <button className="text-red-500" onClick={() => openDeleteConfirmation(item?.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddModal isOpen={isAddModalOpen} onClose={closeAddModal} fetchData={fetchData} />
      {editingItem && (
        <EditModal isOpen={editingItemId !== null} onClose={closeEditModal} editingItem={editingItem} fetchData={fetchData} />
      )}
      {isDeleteConfirmationOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-xl font-semibold mb-4">Are you sure you want to delete this item?</p>
            <div className="flex justify-end">
              <button className="bg-red-500 text-white px-4 py-2 rounded mr-2" onClick={handleDelete}>Delete</button>
              <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded" onClick={closeDeleteConfirmation}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
