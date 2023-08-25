import { FolderInterface } from '@/types/folder';

export const saveFolders = async (folders: FolderInterface[]) => {
  localStorage.setItem('folders', JSON.stringify(folders));
  const uDetail: string = localStorage.getItem('user') || '{}';
  const user = JSON.parse(uDetail);
  await fetch(`/api/user_history?field=folders&userId=${user?._id}`, {
    method: 'PUT',
    body: JSON.stringify({
      folders: folders,
    }),
  });
};
