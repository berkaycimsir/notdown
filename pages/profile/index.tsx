import React from 'react';
import { useToastsContext } from '../../contexts/toasts';
import { useUpdateUserProfileImageMutation } from '../../generated/graphql';
import useMe from '../../hooks/useMe';
import { UploadFolders, UploadPresets } from '../../utils/file/types';
import { uploadImage } from '../../utils/file/upload';

const Profile = () => {
  const { me, updateMeQuery } = useMe();
  const [file, setFile] = React.useState<File | undefined>();
  const { showToast } = useToastsContext();
  const [updateUserProfileImage] = useUpdateUserProfileImageMutation({});

  const onUpload = async () => {
    if (!me) return;
    await uploadImage({
      file: file as File,
      preset: UploadPresets.PROFILE_IMAGE,
      folder: UploadFolders.PROFILE_IMAGE,
      onSuccess: async (file) => {
        await updateUserProfileImage({
          variables: {
            userId: me.id,
            imageId: file.public_id,
          },
          optimisticResponse: {
            updateUserProfileImage: {
              id: me.id,
              profileImage: file.public_id,
            },
          },
          update: (_, { data }) => {
            const newImage = data?.updateUserProfileImage?.profileImage;
            if (!newImage) return;
            updateMeQuery({
              me: {
                ...me,
                profileImage: newImage,
              },
            });
          },
        });
        showToast({
          type: 'success',
          message: 'Your file was uploaded successfully',
        });
      },
      onFail: () => {
        showToast({
          type: 'error',
          message: 'Oops, something went wrong. Please try again',
        });
      },
    });
  };

  return (
    <div>
      <input
        onChange={(e) => setFile(e.currentTarget.files?.[0])}
        type="file"
      />
      <button onClick={onUpload}>upload</button>
      <pre>{JSON.stringify(me)}</pre>
    </div>
  );
};

export default Profile;
