import GitHubIcon from '@mui/icons-material/GitHub';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import MuiLink from '@mui/material/Link';

interface DeveloperCardProps {
  name: string;
  gitLink: string;
  gitName: string;
  image: string;
  description: string;
}

export const DeveloperCard = ({ name, gitLink, gitName, image, description }: DeveloperCardProps) => {
  return (
    <Card
      sx={{
        maxWidth: '16em',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <CardMedia
        sx={{
          height: '10em',
          width: '10em',
          borderRadius: '50%',
          marginTop: '1em',
        }}
        image={image}
      />
      <CardContent>
        <Typography sx={{ textAlign: 'center', fontSize: '1em' }}>{name}</Typography>
        <Typography sx={{ textAlign: 'center', fontSize: '1em' }}>Developer</Typography>
        <MuiLink
          href={gitLink}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#2196f3',
            fontSize: '0.9em',
            transition: '0.3s',
            ':hover': {
              color: '#1769aa',
            },
          }}
          underline="none"
        >
          <GitHubIcon fontSize="small" sx={{ mr: '0.5em' }} />
          {gitName}
        </MuiLink>
        <Typography sx={{ marginTop: '1em', fontSize: '0.9em' }}>{description}</Typography>
      </CardContent>
    </Card>
  );
};
