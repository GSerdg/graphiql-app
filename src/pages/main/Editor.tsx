import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from 'react';
import './Editor.scss';
import AsideEditorMiddle from './aside-editor/AsideEditorMiddle';
import AsideEditorSmall from './aside-editor/AsideEditorSmall';
import EditorInner from './main-editor/editor-inner/EditorInner';
import EndpointField from './main-editor/endpoint-field/EndpointField';
import EntryField from './main-editor/input-field/EntryField';
import InputField from './main-editor/input-field/InputField';
import MainEditor from './main-editor/main-editor/MainEditor';
import ToolBox from './main-editor/toolbox/ToolBox';

const md = 900;
const BASE_API = 'https://rickandmortyapi.com/graphql';

export default function Editor() {
  const matches = useMediaQuery(`(min-width:${md}px)`);
  const [response, setResponse] = useState('');
  const [endpoint, setEndpoint] = useState(BASE_API);

  return (
    <EditorInner>
      <MainEditor>
        <EndpointField endpoint={endpoint} setEndpoint={setEndpoint} />
        <InputField slice="query">
          <ToolBox endpoint={endpoint} setResponse={setResponse} />
        </InputField>
      </MainEditor>
      {matches && (
        <AsideEditorMiddle>
          <EntryField response={response} readonly />
        </AsideEditorMiddle>
      )}
      {!matches && (
        <AsideEditorSmall>
          <EntryField response={response} readonly />
        </AsideEditorSmall>
      )}
    </EditorInner>
  );
}
