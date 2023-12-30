interface ExecuteQueryType {
  endpoint: string;
  query: string;
  variables: string;
  headers: string;
}

export async function executeQuery({ endpoint, query, variables, headers }: ExecuteQueryType) {
  console.log('endpoint:', endpoint);
  console.log('query:', query);
  console.log('variables', variables);
  console.log('headers', headers);

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });
  const json = await response.json();

  return json;
}
