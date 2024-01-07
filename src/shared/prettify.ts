export default function convertPrettifyText(query: string) {
  const text = query;
  const checkText: string[] = [];

  text.match(/{|}/g)?.forEach((item) => {
    if (item === '{') {
      checkText.push(item);
    } else if (item === '}' && (checkText.length === 0 || checkText.pop() !== '{')) {
      throw new Error('prettifyMissingError');
    }
  });

  if (checkText.length > 0) {
    throw new Error('prettifyMissingError');
  }

  const textString = text
    .trim()
    .replace(/\s*{\s*/g, '{')
    .replace(/\s*}\s*/g, '}')
    .replace(/\s*:\s*/g, ':')
    .replace(/\s*,\s*/g, ',')
    .replace(/\s+/g, '\n');

  let nestingLevel = 0;
  let isInside = false;
  let string = '';

  for (let i = 0; i < textString.length; i++) {
    let nextWord: string | undefined;

    if (i < textString.length - 1) {
      nextWord = textString[i + 1];
    }

    switch (textString[i]) {
      case '{':
        nestingLevel += 1;

        if (nestingLevel === 1 && i === 0) {
          nextWord === '}'
            ? (string += textString[i] + '\n')
            : (string += textString[i] + '\n' + ' '.repeat(nestingLevel * 2));
        } else if (i > 0) {
          nextWord === '}'
            ? (string += textString[i] + '\n' + ' '.repeat((nestingLevel - 1) * 2))
            : (string += textString[i] + '\n' + ' '.repeat(nestingLevel * 2));
        }
        break;

      case '\n':
        if (nextWord === '(') {
          break;
        }

        if (isInside && i > 0) {
          textString[i - 1] === '(' || nextWord === ')' ? (string += '') : (string += ' ');
        } else if (nestingLevel === 0) {
          string += ' ';
        } else {
          string += textString[i] + ' '.repeat(nestingLevel * 2);
        }
        break;

      case '}':
        nestingLevel -= 1;

        if (i === textString.length - 1) {
          string += textString[i];
        } else {
          nextWord !== '}'
            ? (string += textString[i] + '\n' + ' '.repeat(nestingLevel * 2))
            : (string += textString[i] + '\n' + ' '.repeat((nestingLevel - 1) * 2));
        }
        break;

      case ':':
        string += textString[i] + ' ';
        break;

      case ',':
        string += textString[i] + ' ';
        break;

      default:
        textString[i] === '(' && (isInside = true);
        textString[i] === ')' && (isInside = false);

        nextWord === '{'
          ? (string += textString[i] + ' ')
          : nextWord === '}'
            ? (string += textString[i] + '\n' + ' '.repeat((nestingLevel - 1) * 2))
            : (string += textString[i]);
        break;
    }
  }
  return string;
}
