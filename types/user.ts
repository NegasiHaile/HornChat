import { Conversation } from '@/types/chat';
import { FolderInterface } from '@/types/folder';
import { Prompt } from '@/types/prompt';

export interface UserDetail {
  _id?: string;
  email?: string;
  userName?: string;
}

export type UserHistory = UserDetail & {
  folders?: FolderInterface[];
  prompts?: Prompt[];
  history?: Conversation[];
};
