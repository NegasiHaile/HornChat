import { Conversation } from '@/types/chat';
import { UserDetail, UserHistory } from '@/types/user';

export const updateConversation = (
  updatedConversation: Conversation,
  allConversations: Conversation[],
) => {
  const updatedConversations = allConversations.map((c) => {
    if (c.id === updatedConversation.id) {
      return updatedConversation;
    }

    return c;
  });

  saveConversation(updatedConversation);
  saveConversations(updatedConversations);

  return {
    single: updatedConversation,
    all: updatedConversations,
  };
};

export const saveConversation = (conversation: Conversation) => {
  localStorage.setItem('selectedConversation', JSON.stringify(conversation));
};

export const saveConversations = async (conversations: Conversation[]) => {
  localStorage.setItem('conversationHistory', JSON.stringify(conversations));
  const uDetail: string = localStorage.getItem('user') || '{}';
  const user = JSON.parse(uDetail);
  await fetch(`/api/user_history?field=history&userId=${user?._id}`, {
    method: 'PUT',
    body: JSON.stringify({
      history: conversations,
    }),
  });
};

export const getUserHistory = async (): Promise<UserHistory> => {
  const uDetail: string = localStorage.getItem('user') || '{}';
  const user: UserDetail = JSON.parse(uDetail);

  const initialUserHistory = {
    email: '',
    userName: '',
    folders: [],
    prompts: [],
    history: [],
  };

  const createUserHistory = async () => {
    const newUserHistory = await fetch('/api/user_history', {
      method: 'POST',
      body: JSON.stringify({
        ...initialUserHistory,
      }),
    });
    const parsedUserHistory = await newUserHistory.json();
    const user = {
      _id: parsedUserHistory._id,
      email: parsedUserHistory.email,
      userName: parsedUserHistory.userName,
    };
    localStorage.removeItem('user');
    localStorage.setItem('user', JSON.stringify(user));
    return await parsedUserHistory;
  };

  const getUserHistory = async (userId: string) => {
    const existingUserHistory = await fetch(
      `/api/user_history?userId=${userId}`,
      {
        method: 'GET',
      },
    );
    const parseUserHistory = await existingUserHistory.json();
    if (parseUserHistory && parseUserHistory?._id) {
      return parseUserHistory;
    } else {
      createUserHistory();
    }
  };

  if (user?._id) {
    // If there is a user in local storage, find that user in the database and fetch their chat history
    return getUserHistory(user._id);
  } else {
    // But if there is no any user detail in the local storage, save a new bluprint of a chat history for the user
    // also fetch their data here, then store the user detail in to local storage
    return createUserHistory();
  }
};
