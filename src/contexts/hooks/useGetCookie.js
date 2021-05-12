import axios from 'axios';
import { set } from 'date-fns';
import { useState, useEffect } from 'react';

export const useGetCookie = () => {
  // const [cookies, setCookies] = useState();

  const getTokenCookies = async () => {
    const configAxios = {
      method: 'get',
      url: 'https://x2-terraform-loadbalancer.k2u.xyz/graphql/schema.json',
      withCredentials: true,
      xsrfCookieName: 'XSRF-TOKEN',
      xsrfHeaderName: 'X-XSRF-TOKEN',
      crossDomain: true,
    };

    let res = await axios(configAxios);
  };

  return { getTokenCookies };
};

export default useGetCookie;
