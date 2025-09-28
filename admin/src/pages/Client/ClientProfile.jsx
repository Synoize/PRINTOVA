// import React, { useContext, useEffect, useState } from 'react'
// import { DoctorContext } from '../../context/ClientContext'
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const ClientProfile = () => {
//   const { backendUrl, docToken, profileData, setProfileData, getProfileData } = useContext(DoctorContext);

//   const { currency } = useContext(AppContext);

//   const [isEdit, setIsEdit] = useState(false);

//   const updateProfile = async () => {
//     try {
//       const updateData = {
//         address: profileData.address,
//         fees: profileData.fees,
//         about: profileData.about,
//         available: profileData.available
//       }

//       const { data } = await axios.post(`${backendUrl}/api/doctor/update-profile`, updateData, { headers: { docToken } })

//       toast.dismiss();
//       if (data.success) {
//         toast.success(data.message);
//         setIsEdit(false);
//         getProfileData();
//       } else {
//         toast.error(data.message)
//       }
//     } catch (error) {
//       toast.dismiss();
//       console.log(error);
//       toast.error(error.message)
//     }
//   }

//   useEffect(() => {
//     if (docToken) {
//       getProfileData()
//     }
//   }, [docToken])

//   return profileData && (
//     <div>
//       <div className={`flex ${isEdit ? 'flex-row' : 'flex-col'} gap-4 m-5`}>
//         <div>
//           <img className='bg-primary/80 w-full sm:max-w-64 rounded-lg' src={profileData.image} alt={profileData.name} />
//         </div>

//         <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>
//           <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{profileData.name}</p>
//           <div className='flex items-center gap-2 mt-1 text-gray-600'>
//             <p>{profileData.degree} - {profileData.speciality}</p>
//             <button className='py-0.5 px-2 border text-xs rounded-full text-nowrap'>{profileData.experience}</button>
//           </div>

//           <div>
//             <p className='flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3'>About:</p>
//             <p className=' text-sm text-gray-600 max-w-[700px] mt-1'>
//               {isEdit ? <textarea className='w-full px-4 pt-2 border rounded' type="text" placeholder='Write about doctor... #fever #fracture #specialization ' rows={5} required onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))} value={profileData.about} /> : profileData.about}
//             </p>
//           </div>

//           <p className='text-gray-600 font-medium mt-4'>
//             Appointment fee: <span className='text-gray-800'>{currency} {isEdit ? <input className='border border-zinc-300 p-2 rounded text-sm ' type="number" onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))} value={profileData.fees} /> : profileData.fees}</span>
//           </p>

//           <div className='flex gap-2 py-2'>
//             <p>Address:</p>
//             <p className='text-sm space-y-0.5 w-full'>
//               {isEdit ? <input className='border border-zinc-300 p-2 rounded text-sm w-full' type="text" onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={profileData.address.line1} /> : profileData.address.line1}<br />
//               {isEdit ? <input className='border border-zinc-300 p-2 rounded text-sm w-full' type="text" onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={profileData.address.line2} /> : profileData.address.line2}
//             </p>
//           </div>

//           <div className='flex gap-1 pt-2'>
//             <input onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))} checked={profileData.available} type="checkbox" name="" id="" />
//             <label htmlFor="">Available</label>
//           </div>

//           {
//             isEdit ? (
//               <button onClick={updateProfile} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Save</button>
//             ) : (
//               <button onClick={() => setIsEdit(true)} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Edit</button>
//             )
//           }

//         </div>

//       </div>

//     </div>
//   )
// }

// export default ClientProfile