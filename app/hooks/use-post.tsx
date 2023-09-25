// import React from 'react'
// import axios from 'axios'
// import { isAwaitExpression } from 'typescript'
// import { useQuery } from '@tanstack/react-query'

// interface Data{
// userId:number
// id:number ,
// title:string,
// body:string
// }
// const Usepost = (postId:Number) => {
//     const {data, isLoading}=useQuery<Data>({
//     queryFn: async()=>{
//         const {}= await axios.post<Data>(`https://jsonplaceholder.typicode.com/posts/${postId}`)
//     return data as Data
   
    
// }
//     })
//   return (
   
//    {data , isLoading}
        
   
//   )
// }

// export default Usepost

// fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`).then(res=>res.json())

import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

interface Data {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const UsePost = (postId: number) => {
  const { data, isLoading } = useQuery<Data>({
    queryKey: ['post', postId], // You may want to provide a unique key for the query
    queryFn: async () => {
      const response = await axios.post<Data>(`https://jsonplaceholder.typicode.com/posts/${postId}`);
      return response.data;
    },
  });

  return { data, isLoading };
};

export default UsePost;
