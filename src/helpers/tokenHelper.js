import axios from 'axios';

export const tokenHelper = () => {
  const url = 'https://x2-terraform-loadbalancer.k2u.xyz/frsc';

  const tokenClient = async () => {
    const res = await axios.get(url, {
      withCredentials: true,
    });

    return res.data.token;
  };

  return { tokenClient };
};
