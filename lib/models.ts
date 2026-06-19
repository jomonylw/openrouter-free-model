import { ApiResponse, ModelsResponse } from '@/types';
import { transformModels } from '@/lib/utils';

const OPENROUTER_MODELS_URL = 'https://openrouter.ai/api/v1/models';

export async function getFreeModels(): Promise<ModelsResponse> {
  console.log('Fetching data from https://openrouter.ai/api/v1/models');

  const response = await fetch(OPENROUTER_MODELS_URL, {
    headers: {
      'Content-Type': 'application/json',
      // 如果未来需要 API Key，可以在这里添加
      // 'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    console.error(`API request failed with status ${response.status}`);
    throw new Error('Failed to fetch models from OpenRouter API');
  }

  const data = (await response.json()) as ApiResponse;
  const sourceModels = Array.isArray(data.data) ? data.data : [];
  const freeModels = sourceModels.filter((model) => {
    const promptPrice = Number(model.pricing.prompt || 0);
    const completionPrice = Number(model.pricing.completion || 0);
    return promptPrice === 0 && completionPrice === 0;
  });

  return {
    models: transformModels(freeModels),
    last_fetched: new Date().toISOString(),
  };
}
