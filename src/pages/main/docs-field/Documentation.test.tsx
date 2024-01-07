import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { DocumentationProvider } from '../../../contexts/docs';
import DocsField from './DocsField';
import { MockWrapper } from '../../../test/testUtils';
import RICK_MORTY_SCHEMA from '../../../test/schemes/rick-and-morty';
import { NestedType, returnType } from './typesToShow/Components';

const Mocktest = () => {
  return (
    <MockWrapper>
      <DocumentationProvider>
        <DocsField isDocsOpen={true} />
      </DocumentationProvider>
    </MockWrapper>
  );
};

const mockSchema = RICK_MORTY_SCHEMA;

const rootTypeName = mockSchema.queryType.name;

const getTypeFromName = (typeName: string) => mockSchema.types.filter((type) => type.name === typeName)[0];

describe('Documentation section', () => {
  it('should display controls', async () => {
    render(<Mocktest />);

    const autocomplete = await screen.findByTestId('autocomplete');
    const backButton = await screen.findByTestId('return-back');

    expect(autocomplete).toBeInTheDocument();
    expect(backButton).toBeInTheDocument();
  });
  it('should display Root type at the start', async () => {
    render(<Mocktest />);

    const argumentsName = await screen.findAllByTestId(/argument-name/);
    const fieldsName = await screen.findAllByTestId(/field-name/);
    const argumentsType = await screen.findAllByTestId(/argument-type/);
    const filedsType = await screen.findAllByTestId(/field-type/);

    expect(fieldsName.map(({ textContent }) => textContent).sort()).toEqual(
      getTypeFromName(rootTypeName)
        .fields?.map((field) => field.name)
        .sort()
    );
    expect(filedsType.map(({ textContent }) => textContent).sort()).toEqual(
      getTypeFromName(rootTypeName)
        .fields?.map((field) => returnType(field.type)[0])
        .sort()
    );
    expect(argumentsName.map(({ textContent }) => textContent).sort()).toEqual(
      getTypeFromName(rootTypeName)
        .fields?.reduce<{ name: string }[]>((acc, cur) => {
          return acc.concat(cur.args);
        }, [])
        .map((arg) => arg.name)
        .sort()
    );
    expect(argumentsType.map(({ textContent }) => textContent).sort()).toEqual(
      getTypeFromName(rootTypeName)
        .fields?.reduce<{ type: NestedType }[]>((acc, cur) => {
          return acc.concat(cur.args);
        }, [])
        .map((arg) => returnType(arg.type)[0])
        .sort()
    );
  });

  it('Should show selected type', async () => {
    const typeToSelect = 'Character';
    render(<Mocktest />);

    const fieldsType = await screen.findAllByTestId(/field-type/);
    const fieldType = fieldsType.filter(({ textContent }) => textContent === typeToSelect)[0];
    userEvent.click(fieldType);
    const header = await screen.findByTestId('header');
    const newHeader = await within(header).findByText(new RegExp(typeToSelect));

    expect(newHeader).toBeInTheDocument();
  });
  it('Should show previous type on click the return button', async () => {
    const typeToSelect = 'Character';
    render(<Mocktest />);

    const fieldsType = await screen.findAllByTestId(/field-type/);
    const fieldType = fieldsType.filter(({ textContent }) => textContent === typeToSelect)[0];
    userEvent.click(fieldType);
    const header = await screen.findByTestId('header');
    const newHeader = await within(header).findByText(new RegExp(typeToSelect));

    const backArrow = await screen.findByTestId('return-back');
    userEvent.click(backArrow);
    await within(header).findByText(new RegExp(rootTypeName));
    expect(newHeader).toBeInTheDocument();
  });
});
