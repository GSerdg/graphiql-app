import gserg from '/image/gserg.jpg';
import user42022 from '/image/user42022.jpg';
import donstacky from '/image/donstacky.jpg';

interface DeveloperCard {
  name: 'developerName1' | 'developerName2' | 'developerName3';
  gitLink: string;
  gitName: string;
  image: string;
  description: 'developerDescription1' | 'developerDescription2' | 'developerDescription3';
}

export const ourTeam: DeveloperCard[] = [
  {
    name: 'developerName1',
    gitLink: 'https://github.com/gserdg',
    gitName: 'gserg',
    image: gserg,
    description: 'developerDescription1',
  },
  {
    name: 'developerName2',
    gitLink: 'https://github.com/user42022',
    gitName: 'user42022',
    image: user42022,
    description: 'developerDescription2',
  },
  {
    name: 'developerName3',
    gitLink: 'https://github.com/DonStacky',
    gitName: 'donstacky',
    image: donstacky,
    description: 'developerDescription3',
  },
];
