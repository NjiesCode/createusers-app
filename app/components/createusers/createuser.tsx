"use client"

// import React, { useState } from 'react';

// import axios from 'axios';
// import { useMutation } from '@tanstack/react-query';
// import { useQueryClient } from '@tanstack/react-query';

// interface User {
//   id: number;
//   firstName: string;
//   lastName: string;
//   email: string;
//   age: number;
//   // Add more properties as needed
// }

// const CreateUser: React.FC = () => {
//   const [formData, setFormData] = useState<User>({
//     id: 0, // You may leave the ID as 0 if it's an auto-generated field
//     firstName: '',
//     lastName: '',
//     email: '',
//     age: 0,
//   });
// const querClient=useQueryClient() 

//   // const createUserMutation = useMutation<User, Error, User>(
//   //  mutationFn:await async (newUser) => {
//   //     try {
//   //       const response = await axios.post<User>('https://dummyjson.com/users', newUser);
//   //       return response.data;
//   //     } catch (error) {
//   //       throw new Error('Failed to create user');
//   //     }
//   //   }
//   // );
//   const createUserMutation=useMutation({
//     mutationFn:  async ()=>await axios.post('https://dummyjson.com/users', newUser),
//     onSuccess=()=>{
//     setFormData("")
//     querClient.invalidateQueries('users')
//     }
//   })

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     createUserMutation.mutate(formData);
//   };

//   return (
//     <div>
//       <h2>Create User</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">First Name</label>
//           <input  className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
//             type="text"
//             id="firstName"
//             value={formData.firstName}
//             onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">Last Name</label>
//           <input  className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
//             type="text"
//             id="lastName"
//             value={formData.lastName}
//             onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="email" className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">Email</label>
//           <input  className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
//             type="email"
//             id="email"
//             value={formData.email}
//             onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="age" className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">Age</label>
//           <input  className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
//             type="number"
//             id="age"
//             value={formData.age}
//             onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value, 10) })}
//             required
//           />
//         </div>
//         <button type="submit" disabled={createUserMutation.isLoading} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
//           {createUserMutation.isLoading ? 'Creating User...' : 'Create User'}
//         </button>
//       </form>
//       {createUserMutation.isError && (
//         <p className="text-red-500 mt-2">{createUserMutation.error?.message || 'An error occurred'}</p>
//       )}
//       {createUserMutation.isSuccess && (
//         <p className="text-green-500 mt-2">User created successfully!</p>
//       )}
//     </div>
//   );
// };

// export default CreateUser;

import React, { useState } from 'react';

import axios from 'axios';
import { data } from 'autoprefixer';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  // Add more properties as needed
}

const CreateUser: React.FC = () => {
  const [formData, setFormData] = useState<User>({
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    age: 0,
  });

  const queryClient = useQueryClient();

  const  createUserMutation = useMutation<User, unknown, User>(
    async (newUser) => {
      try {
        const response = await axios.post<User>('https://dummyjson.com/users', newUser);
       
        
        return response.data;
      } catch (error) {
        throw error; // Throw the original error
      }
    },
    {
      onMutate: (variables) => {
        // Handle the onMutate event if needed
      },
      onError: (error) => {
        if (error) {
          console.log("there is error .............");
          
        }
        // Handle the onError event if needed
      },
      onSuccess: (data) => {
        setFormData({
          id: 0,
          firstName: '',
          lastName: '',
          email: '',
          age: 0,
        });
        queryClient.invalidateQueries(['users']);
      },
    }
    );
    console.log("Your data",);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    createUserMutation.mutate(formData);
  };

  return (
    <div>
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">First Name</label>
          <input
            className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
            type="text"
            id="firstName"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">Last Name</label>
          <input
            className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
            type="text"
            id="lastName"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">Email</label>
          <input
            className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="age" className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">Age</label>
          <input
            className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
            type="number"
            id="age"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value, 10) })}
            required
          />
        </div>
        <button type="submit" disabled={createUserMutation.isLoading} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          {createUserMutation.isLoading ? 'Creating User...' : 'Create User'}
        </button>
      </form>
      {createUserMutation.isError && (
        <p className="text-red-500 mt-2">
          {createUserMutation.error ? createUserMutation.error.toString() : 'An error occurred'}
        </p>
      )}
      {createUserMutation.isSuccess && (
        <p className="text-green-500 mt-2">User created successfully!</p>
      )}
      {JSON.stringify(formData, null, 2)}
    
    </div>
  );
};

export default CreateUser;




