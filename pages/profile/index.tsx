import React from 'react';
import useMe from '../../hooks/useMe';

const Profile = () => {
  const { me, loading } = useMe();

  return (
    <div>
      <pre>{JSON.stringify(me)}</pre>
    </div>
  );
};

export default Profile;
