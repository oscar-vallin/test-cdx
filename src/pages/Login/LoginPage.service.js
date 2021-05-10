// import React, { useState, useEffect } from 'react';
// import { usePasswordLoginMutation } from '../../data/services/graphql';

// export const useLogin = () => {
//   const [success, setSuccess] = useState(false);
//   const [userId, setUserId] = useState();
//   const [password, setPassword] = useState();

//   const [passwordLoginMutation, { data, loading, error }] = usePasswordLoginMutation({
//     variables: {
//       userId,
//       password,
//     },
//   });

//   useEffect(() => {
//     setSucess(true);
//     console.log('data');
//   }, [data]);

//   const Login = (_userId, _password) => {
//     setUserId(_userId);
//     setPassword(_password);
//     passwordLoginMutation();
//   };

//   return { success, login };
// };
