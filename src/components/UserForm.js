import React, { useState, useEffect } from 'react';
import { validateName, validateEmail, validatePhone, validateWebsite } from '../utils/validators';

function UserForm({ isOpen, onClose, onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    company: { name: '' },
    address: { street: '', city: '' }
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        website: '',
        company: { name: '' },
        address: { street: '', city: '' }
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!validateName(formData.name)) newErrors.name = 'Name is required and must be at least 3 characters';
    if (!validateEmail(formData.email)) newErrors.email = 'Valid email is required';
    if (!validatePhone(formData.phone)) newErrors.phone = 'Valid phone number is required';
    if (formData.website && !validateWebsite(formData.website)) newErrors.website = 'Must be a valid URL';
    if (!formData.address.street) newErrors['address.street'] = 'Street is required';
    if (!formData.address.city) newErrors['address.city'] = 'City is required';
    if (formData.company.name && formData.company.name.length < 3) newErrors['company.name'] = 'Company name must be at least 3 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...formData,
        username: initialData ? initialData.username : `USER-${formData.name.replace(/\s+/g, '-').toLowerCase()}`
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">{initialData ? 'Edit User' : 'Create New User'}</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label className="block mb-1">UserName</label>
            <input
              type="email"
              name="email"
              value={formData.username}
              className="w-full p-2 border rounded"
              disabled
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label className="block mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Website</label>
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors.website && <p className="text-red-500 text-sm">{errors.website}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Street</label>
            <input
              type="text"
              name="address.street"
              value={formData.address.street}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors['address.street'] && <p className="text-red-500 text-sm">{errors['address.street']}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-1">City</label>
            <input
              type="text"
              name="address.city"
              value={formData.address.city}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors['address.city'] && <p className="text-red-500 text-sm">{errors['address.city']}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Company Name</label>
            <input
              type="text"
              name="company.name"
              value={formData.company.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors['company.name'] && <p className="text-red-500 text-sm">{errors['company.name']}</p>}
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-2 px-4 py-2 text-gray-600">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
              {initialData ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserForm;