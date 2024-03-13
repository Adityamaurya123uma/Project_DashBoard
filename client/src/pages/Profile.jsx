import { useSelector } from 'react-redux';
import { useRef, useState,useEffect } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase';

export default function Profile() {

  const currentUser = useSelector(state => state.persistedReducer.user);
  const [image, setImage] = useState(undefined);
  const [imgUploadProgress, setimgUploadProgress] = useState(0);
  const [imgUploadError, setimgUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  const fileRef = useRef(null);

  useEffect(() => {
    if(image){
      handleImageUpload(image);
    }
  },[image])

  const handleImageUpload = async (image) => {
    const storage = getStorage(app);
    const filename = new Date().getTime() + image.name;
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setimgUploadProgress(Math.round(progress));
      },
      (error) => {
        setimgUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(
          (downloadURL) => setFormData({...formData, profilePicture: downloadURL})
        )
      });

  }



  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <input type="file" ref={fileRef} hidden accept='image/.*' 
        onChange={(e) => setImage(e.target.files[0])}/>
        <img
          src={formData.profilePicture || currentUser.currentUser.profilePicture}
          alt='profile'
          className='h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2'
          onClick={() => fileRef.current.click()}        
        />
        <p className='text-sm self-center'>
          {imgUploadError ? (
            <span className='text-red-700'>Error uploading image (file size must be less than 2 MB)</span>
          ) : imgUploadProgress > 0 && imgUploadProgress < 100 ? (
            <span className='text-slate-700'>{`Uploading: ${imgUploadProgress} %`}</span>
          ) : imgUploadProgress === 100 ? (
            <span className='text-green-700'>Image uploaded successfully</span>
          ) : (
            ''
          )}
        </p>
        <input
          defaultValue={currentUser.currentUser.username}
          type='text'
          id='username'
          placeholder='Username'
          className='bg-slate-100 rounded-lg p-3'
        />
        <input
          defaultValue={currentUser.currentUser.email}
          type='email'
          id='email'
          placeholder='Email'
          className='bg-slate-100 rounded-lg p-3'
        />
        <input
          type='password'
          id='password'
          placeholder='Password'
          className='bg-slate-100 rounded-lg p-3'
        />
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>update</button>
      </form>
      <div className="flex justify-between mt-5">
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
    </div>
  );

}
