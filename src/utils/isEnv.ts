// 检测环境, fase生产环境, true开发环境
export const isDevEnv = (): boolean => {
  console.log(process.env.NODE_ENV);

  return process.env.NODE_ENV !== 'production';
};
