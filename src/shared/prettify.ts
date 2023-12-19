export default function getPrettifyText(query: string) {
  const text = query;
  const checkText: string[] = [];

  // Проверяем на наличие ошибок в расстановке скобок
  text.match(/{|}/g)?.forEach((item) => {
    if (item === '{') {
      checkText.push(item);
    } else if (item === '}' && (checkText.length === 0 || checkText.pop() !== '{')) {
      throw new Error('Missing opening or closing parenthesis');
    }
  });

  if (checkText.length > 0) {
    throw new Error('Missing opening or closing parenthesis');
  }

  const textArray = text
    .split('\n')
    .map((item) =>
      item
        .trim()
        .replace(/{\s+/g, '{')
        .replace(/\s+{/g, '{')
        .replace(/\s+}/g, '}')
        .replace(/}\s+/g, '}')
        .replace(/\s+/g, '\n')
    );

  let spaces = 2;
  let count = 0;
  const textConvert = textArray.map((item) => {
    let string = '';

    if (item.length > 0 && item[0] !== '}' && item[0] !== '{') {
      string += '\n' + ' '.repeat(spaces - 2);
    }

    for (let i = 0; i < item.length; i++) {
      switch (item[i]) {
        case '{':
          count += 1;

          if (count === 1 && i === item.length - 1) {
            string += item[i];
          } else if ((i === 0 && item.length > 1) || item[i - 1] === '}') {
            string += item[i] + '\n' + ' '.repeat(spaces);
          } else if (i === item.length - 1) {
            string += ' ' + item[i];
          } else {
            string += ' ' + item[i] + '\n' + ' '.repeat(spaces);
          }
          spaces += 2;
          break;

        case '\n':
          string += item[i] + ' '.repeat(spaces - 2);
          break;

        case '}':
          count -= 1;
          spaces -= 2;
          string += '\n' + ' '.repeat(spaces - 2) + item[i];

          if (count === 0) {
            string += '\n';
          } else if (i < item.length - 1) {
            if (item[i + 1] === '}') {
              break;
            } else {
              string += '\n' + ' '.repeat(spaces - 2);
            }
          }
          break;

        default:
          if (count === 0) {
            throw new Error('Parameters must be enclosed in quotes');
          }
          string += item[i];
          break;
      }
    }
    return string;
  });
  return textConvert.join('');
}
