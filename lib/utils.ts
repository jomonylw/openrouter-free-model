import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { OpenRouterV1Model, Model } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function transformModels(models: OpenRouterV1Model[]): Model[] {
  return models.map((model) => {
    const nameParts = model.name.split(':');
    const company_name =
      nameParts.length > 1
        ? nameParts[0].trim()
        : model.id.split('/')[0]?.trim() || '';
    const name =
      nameParts.length > 1
        ? nameParts.slice(1).join(':').trim()
        : model.name.trim();

    return {
      id: model.id.replace(/:free$/, ''),
      company_name,
      name: name.replace(/\s*\(free\)$/i, '').trim(),
      description: model.description,
      updated_at: new Date(model.created * 1000).toISOString(),
      context_length: model.context_length,
      input_modalities: model.architecture.input_modalities,
      output_modalities: model.architecture.output_modalities,
      provider_name: company_name,
      provider_display_name: company_name,
      quantization: '',
      supports_reasoning:
        Boolean(model.reasoning?.mandatory) ||
        Boolean(model.reasoning?.default_enabled) ||
        model.supported_parameters.includes('reasoning') ||
        model.supported_parameters.includes('include_reasoning'),
      icon_url: '',
    };
  });
}

/**
 * 通用的排序工具函数
 * @param models 模型数组
 * @param sortBy 排序字段
 * @returns 排序后的模型数组
 */
export function sortModels(models: Model[], sortBy: string): Model[] {
  const [field, direction] = sortBy.split(':');
  const dir = direction === 'asc' ? 1 : -1;

  return [...models].sort((a, b) => {
    const aValue = a[field as keyof Model];
    const bValue = b[field as keyof Model];

    if (field === 'updated_at') {
      const dateA = new Date(aValue as string).getTime();
      const dateB = new Date(bValue as string).getTime();
      return (dateA - dateB) * dir;
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return aValue.localeCompare(bValue) * dir;
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return (aValue - bValue) * dir;
    }

    // 默认回退到 0
    return 0;
  });
}

/**
 * 生成筛选列表（如公司、供应商列表）
 * @param models 模型数组
 * @param groupByField 分组字段
 * @returns 包含名称和数量的列表
 */
export function generateFilterList(
  models: Model[],
  groupByField: 'company_name' | 'provider_name',
) {
  const counts = models.reduce(
    (acc, model) => {
      const key = model[groupByField];
      if (key) {
        acc[key] = (acc[key] || 0) + 1;
      }
      return acc;
    },
    {} as Record<string, number>,
  );

  return Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}
