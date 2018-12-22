export function ShowTitle(valueSelect) {
  switch (valueSelect) {
    case 'aa':
      return '第一窗口/第一模块(设计案例)';
    case 'ab':
      return '第一窗口/第二模块(解决方案)';
    case 'ac':
      return '第一窗口/第三模块(科研成果)';
    case 'ad':
      return '第一窗口/第四模块(合作方式)';
    case 'ae':
      return '第一窗口/第零模块(流动图片)';
    case 'b':
      return '第二窗口(DMCS简介)';
    case 'c':
      return '第三窗口(解决方案)';
    case 'd':
      return '第四窗口(科研成果)';
    case 'e':
      return '第五窗口(设计案例)';
    case 'f':
      return '第六窗口(合作方式)';
    case 'g':
      return '第七窗口(软件下载)';
    case 'h':
      return '第八窗口(资料下载)';
    case 'i':
      return '第九窗口(合作规则)';
    default:
      return '请选择窗口及模块';
  }
}
