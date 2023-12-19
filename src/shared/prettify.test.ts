import { describe, expect, it } from 'vitest';
import getPrettifyText from './prettify';

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
      getPrettifyText(`{allFilms{films{title}}}`);
    }).not.toThrowError();

    expect(() => {
      getPrettifyText(`{allFilms{films{title}}`);
    }).toThrowError('Missing opening or closing parenthesis');
    expect(() => {
      getPrettifyText(`{allFilms films{title}}}`);
    }).toThrowError('Missing opening or closing parenthesis');
  });

  it('should throw an error if a parenthesis not enclosed in quotes', () => {
    expect(() => {
      getPrettifyText(`allFilms{films{title}}`);
    }).toThrowError('Parameters must be enclosed in quotes');
  });

  it('should format edge cases', () => {
    expect(getPrettifyText('')).toBe('');
    expect(getPrettifyText('{}')).toBe('{\n  \n}\n');
    expect(getPrettifyText('{{}}')).toBe('{\n   {\n    \n  }\n}\n');
    expect(getPrettifyText('{}{}')).toBe('{\n  \n}\n{\n  \n}\n');
  });

  it('should add or remove spaces.', () => {
    expect(
      getPrettifyText(`{
allFilms {
films {
title
}
}
}
`)
    ).toBe(prettifyText);

    expect(
      getPrettifyText(`{
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
    expect(getPrettifyText(text)).toBe(prettifyText);
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
      getPrettifyText(`{
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
      getPrettifyText(
        `{allFilms{films{
      title
    }
  }
}
`
      )
    ).toBe(prettifyText);
    expect(getPrettifyText(`{   allFilms    { films{      title}  }}`)).toBe(prettifyText);
  });
});
