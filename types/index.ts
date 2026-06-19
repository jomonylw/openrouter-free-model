// 统一存放从 OpenRouter API 获取的原始模型数据结构
export interface OpenRouterV1Model {
  id: string;
  canonical_slug: string;
  hugging_face_id: string | null;
  name: string;
  created: number;
  description: string;
  context_length: number;
  architecture: {
    modality: string;
    input_modalities: string[];
    output_modalities: string[];
    tokenizer: string;
    instruct_type: string | null;
  };
  pricing: {
    prompt: string;
    completion: string;
  };
  supported_parameters: string[];
  reasoning?: {
    mandatory?: boolean;
    default_enabled?: boolean;
  } | null;
}

export interface OpenRouterModel {
  slug: string;
  hf_slug: string;
  updated_at: string;
  created_at: string;
  hf_updated_at: string | null;
  name: string;
  short_name: string;
  author: string;
  description: string;
  model_version_group_id: string | null;
  context_length: number;
  input_modalities: string[];
  output_modalities: string[];
  has_text_output: boolean;
  group: string;
  instruct_type: string | null;
  default_system: string | null;
  default_stops: string[];
  hidden: boolean;
  router: string | null;
  warning_message: string;
  permaslug: string;
  reasoning_config: unknown | null;
  features: unknown | null;
  endpoint: {
    id: string;
    name: string;
    context_length: number;
    model: object;
    model_variant_slug: string;
    model_variant_permaslug: string;
    adapter_name: string;
    provider_name: string;
    provider_info: {
      name: string;
      displayName: string;
      slug: string;
      baseUrl: string;
      dataPolicy: {
        training: boolean;
        retainsPrompts: boolean;
        canPublish: boolean;
        privacyPolicyURL?: string;
        termsOfServiceURL?: string;
      };
      headquarters: string;
      hasChatCompletions: boolean;
      hasCompletions: boolean;
      isAbortable: boolean;
      moderationRequired: boolean;
      editors: string[];
      owners: string[];
      adapterName: string;
      isMultipartSupported: boolean;
      statusPageUrl: string | null;
      byokEnabled: boolean;
      icon: {
        url: string;
      };
      ignoredProviderModels: string[];
    };
    provider_display_name: string;
    provider_slug: string;
    provider_model_id: string;
    quantization: string;
    variant: string;
    is_free: boolean;
    can_abort: boolean;
    max_prompt_tokens: number | null;
    max_completion_tokens: number | null;
    max_prompt_images: number | null;
    max_tokens_per_image: number | null;
    supported_parameters: string[];
    is_byok: boolean;
    moderation_required: boolean;
    data_policy: {
      training: boolean;
      retainsPrompts: boolean;
      canPublish: boolean;
      privacyPolicyURL?: string;
      termsOfServiceURL?: string;
    };
    pricing: {
      prompt: string;
      completion: string;
      image: string;
      request: string;
      web_search: string;
      internal_reasoning: string;
      image_output: string;
      discount: number;
    };
    variable_pricings: unknown[];
    is_hidden: boolean;
    is_deranked: boolean;
    is_disabled: boolean;
    supports_tool_parameters: boolean;
    supports_reasoning: boolean;
    supports_multipart: boolean;
    limit_rpm: number | null;
    limit_rpd: number | null;
    limit_rpm_cf: number | null;
    has_completions: boolean;
    has_chat_completions: boolean;
    features: object;
    provider_region: string | null;
  };
}

// 定义在整个应用中统一使用的模型数据结构 (SimplifiedModel)
export interface Model {
  // 模型核心信息
  id: string; // slug
  company_name: string;
  name: string;
  description: string;
  updated_at: string; // ISO 8601 timestamp
  context_length: number;
  input_modalities: string[];
  output_modalities: string[];

  // 端点信息
  provider_name: string;
  provider_display_name: string;
  quantization: string;
  supports_reasoning: boolean;
  icon_url: string;
}

// API 响应的数据结构
export interface ApiResponse {
  data: OpenRouterV1Model[];
}

export interface ModelsResponse {
  models: Model[];
  last_fetched: string; // ISO 8601 timestamp
}

// 筛选和排序状态的类型
export interface FilterSortState {
  searchTerm: string;
  sortBy: string;
  showReasoningOnly: boolean;
  selectedCompanies: string[];
  selectedProviders: string[];
}

// 公司信息的类型
export interface Company {
  name: string;
  count: number;
}

// 供应商信息的类型
export interface Provider {
  name: string;
  count: number;
}
