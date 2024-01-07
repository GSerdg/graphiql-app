import { IntrospectionSchema, getIntrospectionQuery } from 'graphql';
import { createContext, useContext, useEffect, useState } from 'react';
import { useSelector } from '../shared/useSelector';

interface DocumentationContext {
  documentation: Documentation;
  cached: Record<string, null | IntrospectionSchema>;
  setSchema: React.Dispatch<React.SetStateAction<null | IntrospectionSchema>>;
  setSearchStack: React.Dispatch<React.SetStateAction<string[]>>;
  setCached: React.Dispatch<React.SetStateAction<Record<string, null | IntrospectionSchema>>>;
}

interface Documentation {
  schema: null | IntrospectionSchema;
  searchStack: string[];
  endpoint: string;
}

export function useDocumentationContext() {
  const context = useContext(DocumentationContext);
  if (context === undefined) {
    throw new Error('useDocumentationContext must be used within a DocumentationProvider');
  }
  return context;
}

export const DocumentationContext = createContext<DocumentationContext>({} as DocumentationContext);

export function DocumentationProvider({ children }: { children: JSX.Element }) {
  const [schema, setSchema] = useState<null | IntrospectionSchema>(null);
  const [cached, setCached] = useState<Record<string, null | IntrospectionSchema>>({});
  const [searchStack, setSearchStack] = useState<string[]>([]);
  const { sourceLink } = useSelector((state) => state.graphqlSlice);

  const fetchSchema = async () => {
    if (cached[sourceLink] === undefined) {
      try {
        const res = await fetch(sourceLink, {
          headers: { 'content-type': 'application/json' },
          method: 'POST',
          body: JSON.stringify({ query: getIntrospectionQuery() }),
        });

        const response: { data: { __schema: IntrospectionSchema } } = await res.json();
        const newSchema: null | IntrospectionSchema = response.data.__schema;

        setCached({ ...cached, [sourceLink]: newSchema });
        setSchema(newSchema);
      } catch {
        setSchema(null);
      }
    } else {
      setSchema(cached[sourceLink]);
    }
  };

  useEffect(() => {
    fetchSchema();
    setSearchStack([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sourceLink]);

  return (
    <DocumentationContext.Provider
      value={{
        documentation: {
          schema,
          searchStack,
          endpoint: sourceLink,
        },
        cached,
        setSchema,
        setSearchStack,
        setCached,
      }}
    >
      {children}
    </DocumentationContext.Provider>
  );
}
