import { useState } from 'react';
import './Editor.scss';
import AsideEditor from './aside-editor/AsideEditor';
import EditorInner from './main-editor/editor-inner/EditorInner';
import EndpointField from './main-editor/endpoint-field/EndpointField';
import EntryField from './main-editor/input-field/EntryField';
import InputField from './main-editor/input-field/InputField';
import MainEditor from './main-editor/main-editor/MainEditor';
import ToolBox from './main-editor/toolbox/ToolBox';
import DocsControl from './docs-field/DocsControl';

const BASE_API = 'https://rickandmortyapi.com/graphql';

export default function Editor() {
  const [response, setResponse] = useState('');
  const [endpoint, setEndpoint] = useState(BASE_API);
  const [isDocsOpen, setIsDocsOpen] = useState(false);

  return (
    <EditorInner>
      <MainEditor isDocsOpen={isDocsOpen}>
        <EndpointField endpoint={endpoint} setEndpoint={setEndpoint} />
        <InputField slice="query">
          <ToolBox endpoint={endpoint} setResponse={setResponse} />
        </InputField>
      </MainEditor>
      <AsideEditor isDocsOpen={isDocsOpen}>
        <DocsControl isDocsOpen={isDocsOpen} setIsDocsOpen={setIsDocsOpen} />
        <EntryField response={response} readonly />
      </AsideEditor>
    </EditorInner>
  );
}
