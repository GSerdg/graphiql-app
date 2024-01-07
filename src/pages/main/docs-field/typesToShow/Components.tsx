import { Stack, Typography } from '@mui/material';
import { useDocumentationContext } from '../../../../contexts/docs';
import { IntrospectionField, IntrospectionInputValue, IntrospectionType } from 'graphql';
import './Components.css';

interface simpleType {
  kind: string;
  name?: null | string;
}
export interface NestedType extends Readonly<simpleType> {
  ofType?: null | NestedType;
}

export const returnType = (nestedType: NestedType, features: string[] = []): [string, string[]] => {
  if (nestedType.name) {
    return [nestedType.name, features];
  } else if (nestedType.kind === 'NON_NULL' && nestedType.ofType) {
    features.push('NON_NULL');
    return returnType(nestedType.ofType, features);
  } else if (nestedType.kind === 'LIST' && nestedType.ofType) {
    features.push('LIST');
    return returnType(nestedType.ofType, features);
  }
  return ['', []];
};

export const MainDescription = (props: IntrospectionType) => {
  return (
    <Stack>
      <Typography data-testid={'header'} alignSelf={'center'}>
        {props.name}:{props.kind}
      </Typography>
      {props.description ? <Typography>{props.description}</Typography> : ''}
    </Stack>
  );
};

export const Arguments = (props: { args: IntrospectionInputValue[] }) => {
  const { documentation, setSearchStack } = useDocumentationContext();
  const handleClick = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    if (event.currentTarget.textContent) {
      setSearchStack(documentation.searchStack.concat(event.currentTarget.textContent));
    }
  };
  return (
    <Stack>
      <Typography style={{ paddingLeft: '2rem' }}>Arguments</Typography>
      {props.args.map((argument) => {
        return (
          <Stack key={argument.name} direction={'row'}>
            <span style={{ color: 'yellow' }} data-testid="argument-name">
              {argument.name}
            </span>
            :
            <span data-testid="argument-type" className="interactive" onClick={handleClick}>
              {returnType(argument.type)[0]}
            </span>
          </Stack>
        );
      })}
    </Stack>
  );
};

export const Fields = (props: { fields: IntrospectionField[] }) => {
  const { documentation, setSearchStack } = useDocumentationContext();
  const handleClick = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    if (event.currentTarget.textContent) {
      setSearchStack(documentation.searchStack.concat(event.currentTarget.textContent));
    }
  };

  return (
    <Stack>
      <Typography alignSelf={'center'}>Fields</Typography>
      {props.fields.map((field) => {
        return (
          <Stack key={field.name} style={{ border: '1px solid grey' }}>
            <Stack direction={'row'} alignSelf={'start'} style={{ paddingLeft: '1rem' }}>
              <span data-testid="field-name" style={{ color: 'green' }}>
                {field.name}
              </span>
              :
              <span data-testid="field-type" className="interactive" onClick={handleClick}>
                {returnType(field.type)[0]}
              </span>
            </Stack>
            <Typography> {field.description ? field.description : ''}</Typography>
            {!!field.args.length && <Arguments args={[...field.args]} />}
          </Stack>
        );
      })}
    </Stack>
  );
};

export const InputFields = (props: { inputFields: IntrospectionInputValue[] }) => {
  const { documentation, setSearchStack } = useDocumentationContext();
  const handleClick = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    if (event.currentTarget.textContent) {
      setSearchStack(documentation.searchStack.concat(event.currentTarget.textContent));
    }
  };

  return (
    <Stack>
      <Typography alignSelf={'center'}>Fields</Typography>
      {props.inputFields.map((field) => {
        return (
          <Stack key={field.name}>
            <Stack direction={'row'}>
              <span data-testid="field-name" style={{ color: 'green' }}>
                {field.name}
              </span>
              :
              <span data-testid="field-type" className="interactive" onClick={handleClick}>
                {returnType(field.type)[0]}
              </span>
            </Stack>
            <Typography> {field.description ? field.description : ''}</Typography>
          </Stack>
        );
      })}
    </Stack>
  );
};
