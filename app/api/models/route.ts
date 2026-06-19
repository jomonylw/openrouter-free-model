import { getFreeModels } from '@/lib/models';

/**
 * GET 请求处理函数
 * @param request Next.js 的请求对象
 * @returns 包含模型列表的 JSON 响应
 */
export async function GET() {
  // 设置缓存策略：每 12 小时 (43200 秒) 重新验证一次数据
  // 设置缓存策略：每 1 小时 (3600 秒) 重新验证一次数据
  const cacheControl = 'public, s-maxage=3600, stale-while-revalidate=86400';

  try {
    const data = await getFreeModels();

    // 返回成功响应
    return new Response(
      JSON.stringify(data),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': cacheControl,
        },
      },
    );
  } catch (error) {
    // 处理网络错误或其他异常
    console.error('Error fetching models:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': cacheControl,
      },
    });
  }
}
