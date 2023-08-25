import { Prompt } from '@/types/prompt';

export const updatePrompt = (updatedPrompt: Prompt, allPrompts: Prompt[]) => {
  const updatedPrompts = allPrompts.map((c) => {
    if (c.id === updatedPrompt.id) {
      return updatedPrompt;
    }

    return c;
  });

  savePrompts(updatedPrompts);

  return {
    single: updatedPrompt,
    all: updatedPrompts,
  };
};

export const savePrompts = async (prompts: Prompt[]) => {
  localStorage.setItem('prompts', JSON.stringify(prompts));
  const uDetail: string = localStorage.getItem('user') || '{}';
  const user = JSON.parse(uDetail);
  await fetch(`/api/user_history?field=prompts&userId=${user?._id}`, {
    method: 'PUT',
    body: JSON.stringify({
      prompts: prompts,
    }),
  });
};
