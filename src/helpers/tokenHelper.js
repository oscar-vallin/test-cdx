import axios from 'axios';
import { useCurrentUser } from '../contexts/hooks/useCurrentUser';

export const tokenHelper = async () => {
  const url = 'https://x2-terraform-loadbalancer.k2u.xyz/frsc';
  // const { currentUserQuery } = useCurrentUser();

  const res = await axios.get(url, {
    withCredentials: true,
  });

  const csrToken = res.data.token;

  return csrToken;
};
