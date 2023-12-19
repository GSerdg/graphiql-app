import { describe, expect, it } from 'vitest';
import convertPrettifyText from './prettify';

const prettifyText = `{
  allFilms {
    films {
      title
    }
  }
}
`;

describe('Input slice', () => {
  it('should throw an error if a parenthesis is missing', () => {
    expect(() => {
      convertPrettifyText(`{allFilms{films{title}}}`);
    }).not.toThrowError();

    expect(() => {
      convertPrettifyText(`{allFilms{films{title}}`);
    }).toThrowError('Missing opening or closing parenthesis');
    expect(() => {
      convertPrettifyText(`{allFilms films{title}}}`);
    }).toThrowError('Missing opening or closing parenthesis');
  });

  it('should throw an error if a parenthesis not enclosed in quotes', () => {
    expect(() => {
      convertPrettifyText(`allFilms{films{title}}`);
    }).toThrowError('Parameters must be enclosed in quotes');
  });

  it('should format edge cases', () => {
    expect(convertPrettifyText('')).toBe('');
    expect(convertPrettifyText('{}')).toBe('{\n  \n}\n');
    expect(convertPrettifyText('{{}}')).toBe('{\n   {\n    \n  }\n}\n');
    expect(convertPrettifyText('{}{}')).toBe('{\n  \n}\n{\n  \n}\n');
  });

  it('should add or remove spaces.', () => {
    expect(
      convertPrettifyText(`{
allFilms {
films {
title
}
}
}
`)
    ).toBe(prettifyText);

    expect(
      convertPrettifyText(`{
  allFilms {
        films {
    title
  }
}
        }
`)
    ).toBe(prettifyText);
  });

  it('should remove empty lines', () => {
    const text = `{
          
allFilms {

        
films {
title
}
}
       
}
`;
    expect(convertPrettifyText(text)).toBe(prettifyText);
  });

  it('should format multiple parameters', () => {
    const text = `{
  allFilms {
    films {
      title
      id
      director
      releaseDate
    }
  }
}
`;

    expect(
      convertPrettifyText(`{
        allFilms {
          films {
            title id
      director
                  releaseDate
          }
        }
      }
      `)
    ).toBe(text);
  });

  it('should other formatting', () => {
    expect(
      convertPrettifyText(
        `{allFilms{films{
      title
    }
  }
}
`
      )
    ).toBe(prettifyText);
    expect(convertPrettifyText(`{   allFilms    { films{      title}  }}`)).toBe(prettifyText);
  });
});
