import axios from 'axios';
// import { IImageResponse, IResponse } from '../../interface/ApiResponse';
import { IFile } from '../../interface/File';

export const uploadImage = async (image: any): Promise<any> => {
  const formData = new FormData();
  formData.append('image', image);
  return axios.post('/image/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
};
