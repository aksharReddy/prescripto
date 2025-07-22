import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import upload_icon from '../assets/upload_icon.png';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const { userData, setUserData,token,backendUrl,loadUserData} = useContext(AppContext);
  const [image,setimage] = useState(false);

  const updatedUserData = async () => {
    try {
      const formData = new FormData();
        formData.append('name', userData.name);
        formData.append('phone', userData.phone);
        formData.append('dob', userData.dob);
        formData.append('gender', userData.gender);
        formData.append('address', JSON.stringify(userData.address));

        image && formData.append('image', image);
        const {data} = await axios.post(backendUrl + '/api/user/update-profile', formData, {
          headers: {
            'token': token
          }
        });
        if (data.success) {
            toast.success('Profile updated successfully');
            loadUserData(); // Reload user data after update
            setIsEdit(false); // Exit edit mode after saving
            setimage(false); // Reset image state
        }
        else{
            toast.error(data.message || 'Failed to update profile');
        }
    } catch (error) {
      console.error('Error updating user data:', error);
        toast.error(error.message || 'Something went wrong while updating profile');
    }
}
  useEffect(() => {
    // Parse address if it's stored as a JSON string
    if (userData?.address && typeof userData.address === 'string') {
      try {
        const parsedAddress = JSON.parse(userData.address);
        setUserData(prev => ({ ...prev, address: parsedAddress }));
      } catch (error) {
        console.error('Failed to parse address:', error);
      }
    }
  }, [userData?.address]);

  if (!userData) return null;

  return (
    <div className='max-w-lg flex flex-col gap-2 text-sm'>
    {isEdit ? (
  <label htmlFor='image'>
    <div className='inline-block relative cursor-pointer'>
      <img
        className='w-36 rounded opacity-75'
        src={image ? URL.createObjectURL(image) : userData.image}
        alt=""
      />
      <img className='w-10 absolute bottom-12 right-12' src={upload_icon} alt="" />
    </div>
    <input onChange={(e) => setimage(e.target.files[0])} type="file" id="image" hidden />
  </label>
) : (
  <img
    className='w-36 rounded'
    src={image ? URL.createObjectURL(image) : userData.image}
    alt=""
  />
)}

      {isEdit ? (
        <input
          className='bg-gray-50 text-3xl font-medium max-w-60 mt-4'
          type="text"
          onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
          value={userData.name}
        />
      ) : (
        <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
      )}

      <hr className='bg-zinc-400 h-[1px] border-none' />

      {/* CONTACT INFORMATION */}
      <div>
        <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Email id:</p>
          <p className='text-blue-500'>{userData.email}</p>

          <p className='font-medium'>Phone:</p>
          {isEdit ? (
            <input
              className='bg-gray-100 max-w-52'
              type="text"
              onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
              value={userData.phone}
            />
          ) : (
            <p className='text-blue-400'>{userData.phone}</p>
          )}

          <p className='font-medium'>Address:</p>
          {isEdit ? (
            <div className='flex flex-col gap-1'>
              <input
                className='bg-gray-50'
                type="text"
                placeholder="Line 1"
                onChange={(e) =>
                  setUserData(prev => ({
                    ...prev,
                    address: { ...(prev.address || {}), line1: e.target.value }
                  }))
                }
                value={userData.address?.line1 || ''}
              />
              <input
                className='bg-gray-50'
                type="text"
                placeholder="Line 2"
                onChange={(e) =>
                  setUserData(prev => ({
                    ...prev,
                    address: { ...(prev.address || {}), line2: e.target.value }
                  }))
                }
                value={userData.address?.line2 || ''}
              />
            </div>
          ) : (
            <p className='text-gray-500'>
              {userData.address?.line1}<br />{userData.address?.line2}
            </p>
          )}
        </div>
      </div>

      {/* BASIC INFORMATION */}
      <div>
        <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Gender:</p>
          {isEdit ? (
            <select
              className='max-w-20 bg-gray-100'
              onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
              value={userData.gender}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            <p className='text-gray-400'>{userData.gender}</p>
          )}

          <p className='font-medium'>Birthday:</p>
          {isEdit ? (
            <input
              className='max-w-28 bg-gray-100'
              type='date'
              onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}
              value={userData.dob}
            />
          ) : (
            <p className='text-gray-400'>{userData.dob}</p>
          )}
        </div>
      </div>

      {/* BUTTON */}
      <div className='mt-10'>
  <button
    onClick={() => {
      if (isEdit) {
        updatedUserData(); // Save profile if in edit mode
      } else {
        setIsEdit(true); // Switch to edit mode
      }
    }}
    className='border bg-blue-500 px-8 py-2 rounded-full hover:bg-blue-600 text-white transition-all'
  >
    {isEdit ? 'Save Information' : 'Edit'}
  </button>
</div>

    </div>
  );
};

export default MyProfile;
