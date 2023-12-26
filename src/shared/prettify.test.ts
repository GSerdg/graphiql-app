import { describe, expect, it } from 'vitest';
import convertPrettifyText from './prettify';

const prettifyText = `{
  allFilms {
    films {
      title
    }
  }
}`;

describe('Prettify', () => {
  it('should throw an error if a parenthesis is missing', () => {
    expect(() => {
      convertPrettifyText(`{allFilms{films{title}}}`);
    }).not.toThrowError();

    expect(() => {
      convertPrettifyText(`{allFilms{films{title}}`);
    }).toThrowError('prettifyMissingError');
    expect(() => {
      convertPrettifyText(`{allFilms films{title}}}`);
    }).toThrowError('prettifyMissingError');
  });

  it('should format edge cases', () => {
    expect(convertPrettifyText('')).toBe('');
    expect(convertPrettifyText('{}')).toBe('{\n}');
    expect(convertPrettifyText('{{}}')).toBe('{\n  {\n  }\n}');
    expect(convertPrettifyText('{}{}')).toBe('{\n}\n{\n}');
    expect(convertPrettifyText('{\n}{\n}')).toBe('{\n}\n{\n}');
    expect(convertPrettifyText('{}\n{}')).toBe('{\n}\n{\n}');
    expect(convertPrettifyText('{}{{}}')).toBe('{\n}\n{\n  {\n  }\n}');
    expect(convertPrettifyText('{}{\n{}}')).toBe('{\n}\n{\n  {\n  }\n}');
    expect(convertPrettifyText('{\n}{{}}')).toBe('{\n}\n{\n  {\n  }\n}');
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
}`;

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

  it('should format named queries', () => {
    expect(
      convertPrettifyText(
        `query Name{allFilms{films{
        title
      }
    }
  }
  `
      )
    ).toBe('query Name ' + prettifyText);
    expect(
      convertPrettifyText(
        `query Name{   allFilms    { films{      title}  }}query Name{   allFilms    { films{      title}  }}`
      )
    ).toBe('query Name ' + prettifyText + '\n' + 'query Name ' + prettifyText);
  });

  it('should handle a request with characters: "()", ":", ","', () => {
    const text = `{
  person(id: "cGVvcGxlOjE=", name: "Luke")
}`;

    expect(convertPrettifyText(`{person(id:"cGVvcGxlOjE=",name:"Luke")}`)).toBe(text);
    expect(
      convertPrettifyText(`{person
    (   id :    "cGVvcGxlOjE="   ,   name   :   "Luke"  )}`)
    ).toBe(text);
    expect(
      convertPrettifyText(`{person(
        id
        :
        "cGVvcGxlOjE=",
        name:
        "Luke"
        )
      }`)
    ).toBe(text);
  });

  it('other formatting', () => {
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
    expect(
      convertPrettifyText(`query getPersons
    {
      person(
        id: "cGVvcGxlOjE=",
        name: "Luke") 
    {
        name birthYear {title
    }{
    title(id: "id") 
    {
          title
        }
      }
    }
    }
    {  person(id: "cGVvcGxlOjE=", name: "Luke")}`)
    ).toBe(`query getPersons {
  person(id: "cGVvcGxlOjE=", name: "Luke") {
    name
    birthYear {
      title
    }
    {
      title(id: "id") {
        title
      }
    }
  }
}
{
  person(id: "cGVvcGxlOjE=", name: "Luke")
}`);
  });
});
