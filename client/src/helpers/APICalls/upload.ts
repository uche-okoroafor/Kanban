import { UploadProfilePic } from '../../interface/AuthApiData';

export const uploadProfileImage = async (file: any): Promise<UploadProfilePic> => {
  const formData = new FormData();
  formData.append('image', file);
  console.log(formData);
  return await fetch(`${process.env.REACT_APP_SERVER}/users/upload`, {
    method: 'POST',
    body: formData,
    credentials: 'include',
  })
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'File upload failed. Please try again.' },
    }));
};
