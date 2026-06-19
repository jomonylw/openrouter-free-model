import React from 'react';
import { ModelView } from '@/components/model-view';
import { ModelsResponse } from '@/types';
import { unstable_noStore as noStore } from 'next/cache';
import { getFreeModels } from '@/lib/models';

async function getModels(): Promise<ModelsResponse> {
  noStore();
  return getFreeModels();
}

export default async function Home() {
  const initialData = await getModels();

  return <ModelView initialData={initialData} />;
}
