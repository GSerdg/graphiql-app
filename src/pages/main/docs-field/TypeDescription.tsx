import { Stack } from '@mui/material';
import { useDocumentationContext } from '../../../contexts/docs';
import { Fields, InputFields, MainDescription } from './typesToShow/Components';

export default function TypeDescription() {
  const { documentation } = useDocumentationContext();
  const stackLength = documentation.searchStack.length;
  const typeTosearch = stackLength
    ? documentation.searchStack[stackLength - 1]
    : documentation.schema?.queryType.name;
  const type = documentation.schema?.types.filter((type) => type.name === typeTosearch)[0];

  return (
    type && (
      <Stack style={{ color: 'white' }}>
        <MainDescription {...type} />
        {type.kind === 'OBJECT' && type.fields.length && <Fields fields={[...type.fields]} />}
        {type.kind === 'INPUT_OBJECT' && type.inputFields.length && (
          <InputFields inputFields={[...type.inputFields]} />
        )}
      </Stack>
    )
  );
}
