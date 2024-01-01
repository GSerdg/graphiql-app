import { ListItem, Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

interface GitLinkProps {
  gitName: string;
  gitLink: string;
}

export const GitLink = ({ gitName, gitLink }: GitLinkProps) => {
  return (
    <ListItem sx={{ padding: '0 0 0.1rem' }}>
      <Link
        href={gitLink}
        sx={{
          display: 'flex',
          alignItems: 'center',
          color: '#fffffc',
          fontSize: '0.9rem',
          transition: '0.3s',
          ':hover': {
            color: '#AD7630',
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
