import { useState } from 'react';
import './Editor.scss';
import AsideEditor from './aside-editor/AsideEditor';
import EditorInner from './main-editor/editor-inner/EditorInner';
import EndpointField from './main-editor/endpoint-field/EndpointField';
import EntryField from './main-editor/entry-field/EntryField';
import MainEditor from './main-editor/main-editor/MainEditor';
import ToolBox from './main-editor/toolbox/ToolBox';
import DocsControl from './docs-field/DocsControl';
import AdditionalEditor from './main-editor/additional-editor/AdditionalEditor';
import TabPanel from './main-editor/additional-editor/TabPanel';

const BASE_API = 'https://rickandmortyapi.com/graphql';

export type ValueType = number | boolean;

export default function Editor() {
  const [response, setResponse] = useState('');
  const [endpoint, setEndpoint] = useState(BASE_API);
  const [query, setQuery] = useState('');
  const [variables, setVariables] = useState('');
  const [headers, setHeaders] = useState('');
  const [value, setValue] = useState<ValueType>(false);
  const [isDocsOpen, setIsDocsOpen] = useState(false);

  return (
    <EditorInner>
      <MainEditor isDocsOpen={isDocsOpen}>
        <EndpointField endpoint={endpoint} setEndpoint={setEndpoint} />
        <EntryField setQuery={setQuery} response={query}>
          <ToolBox
            endpoint={endpoint}
            setResponse={setResponse}
            query={query}
            variables={variables}
            headers={headers}
          />
        </EntryField>
        <AdditionalEditor value={value} setValue={setValue}>
          <TabPanel value={variables} setValue={setVariables} tabIndex={value} tabPanelIndex={0} />
          <TabPanel value={headers} setValue={setHeaders} tabIndex={value} tabPanelIndex={1} />
        </AdditionalEditor>
      </MainEditor>
      <AsideEditor isDocsOpen={isDocsOpen}>
        <DocsControl isDocsOpen={isDocsOpen} setIsDocsOpen={setIsDocsOpen} />
        <EntryField response={response} readonly />
      </AsideEditor>
    </EditorInner>
  );
}
