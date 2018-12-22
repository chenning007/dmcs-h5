export function KeytoName(key) {
  switch (key) {
    case '1':
      return '首页';
    case '2':
      return 'DMCS简介';
    case '3':
      return '解决方案';
    case '4':
      return '科研成果';
    case '5':
      return '设计案例';
    case '6':
      return '合作方式';
    case '7':
      return '软件下载';
    case '8':
      return '资料下载';
    case '9':
      return '合作规则';
    default:
      return '首页';
  }
}

export function KeytoModule(key) {
  switch (key) {
    case '2':
      return 'b';
    case '3':
      return 'c';
    case '4':
      return 'd';
    case '5':
      return 'e';
    case '6':
      return 'f';
    case '7':
      return 'g';
    case '8':
      return 'h';
    case '9':
      return 'i';
    default:
      return 'a';
  }
}

export function ModuleToModuleid(Module) {
  switch (Module) {
    case 'aa':
      return '1010';
    case 'ab':
      return '1020';
    case 'ac':
      return '1030';
    case 'ad':
      return '1040';
    case 'ae':
      return '1050';
    case 'b':
      return '2000';
    case 'c':
      return '3000';
    case 'd':
      return '4000';
    case 'e':
      return '5000';
    case 'f':
      return '6000';
    case 'g':
      return '7000';
    case 'h':
      return '8000';
    case 'i':
      return '9000';
    default:
      return '0';
  }
}
