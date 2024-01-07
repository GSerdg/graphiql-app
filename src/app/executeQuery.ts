interface ExecuteQueryType {
  endpoint: string;
  query: string;
  variables: string;
  headers: string;
}

export async function executeQuery({ endpoint, query, variables, headers }: ExecuteQueryType) {
  let requestHeaders = { 'Content-Type': 'application/json' };
  try {
    if (headers) {
      requestHeaders = { ...requestHeaders, ...JSON.parse(headers) };
    }
  } catch (error) {
    return `Headers are invalid JSON: ${(error as Error).message}`;
  }

  let requestVariables = {};
  try {
    if (variables) {
      requestVariables = JSON.parse(variables);
    }
  } catch (error) {
    return `Variables are invalid JSON: ${(error as Error).message}`;
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      ...requestHeaders,
    },
    body: JSON.stringify({ query, variables: requestVariables }),
  });
  const json = await response.json();
  const result = JSON.stringify(json, null, 2);

  return result;
}
