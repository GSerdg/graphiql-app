import { useRouteError } from 'react-router-dom';

export default function ErrorComponent() {
  const error = useRouteError();
  console.error(error);

  return <div>Error component</div>;
}
