// 导出一个函数 接受两个参数，一个是要显示的内容，一个是显示的最大字数，如果现实的内容超过最大字数，就显示省略号
export default function roughlyShow(content: string, max: number): string {
  if (content.length > max) {
    return `${content.slice(0, max)}...`;
  }
  return content;
}
