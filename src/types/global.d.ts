/**
 * 全局类型定义
 */

declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}

declare module '*.less' {
  const content: Record<string, string>;
  export default content;
}

declare module '*.svg' {
  const content: React.FC<React.SVGProps<SVGSVGElement>>;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

interface Window {
  // 全局配置
  __APP_CONFIG__?: {
    apiBaseUrl: string;
    uploadUrl: string;
    version: string;
  };
}
