import React from 'react';
import { useFileHookSubscription } from '../../services/graphql';

export const SubData = ({ value = 'Not Loaded' }) => {
  const { data } = useFileHookSubscription();

  // console.log({ subData: data });
  return (
    <>
      {data?.updateStatus?.status && <p>{data.updateStatus.status}</p>}
      {!data && <p>{value}</p>}
    </>
  );
};
