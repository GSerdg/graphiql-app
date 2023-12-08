import { ListItem, Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

interface Props {
  gitName: string;
  gitLink: string;
}

export const GitLink = ({ gitName, gitLink }: Props): React.ReactNode => {
  return (
    <ListItem sx={{ padding: '0 0 0.2rem' }}>
      <Link
        href={gitLink}
        sx={{
          display: 'flex',
          alignItems: 'center',
          color: '#fffffc',
          transition: '0.3s',
          ':hover': {
            color: '#b7d9ed',
          },
        }}
        underline="none"
      >
        <GitHubIcon fontSize="small" sx={{ mr: '0.5rem' }} />
        {gitName}
      </Link>
    </ListItem>
  );
};
