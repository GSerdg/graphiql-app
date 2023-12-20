import gserg from '/image/gserg.jpg';
import user42022 from '/image/user42022.jpg';
import donstacky from '/image/donstacky.jpg';

export interface TeamType {
  en: DeveloperCard[];
  ru: DeveloperCard[];
}

interface DeveloperCard {
  name: string;
  gitLink: string;
  gitName: string;
  image: string;
  description: string;
}

export const ourTeam: TeamType = {
  en: [
    {
      name: 'SERGEY GREBEL',
      gitLink: 'https://github.com/gserdg',
      gitName: 'gserg',
      image: gserg,
      description:
        "I'm a front-end developer. After studying at RS School, I can now do everything in a Java script!!! Well, or almost everything. And everything that I cannot achieve, I will achieve as I work on future interesting and probably very entertaining projects.",
    },
    {
      name: 'ANDREY KIZILOV',
      gitLink: 'https://github.com/user42022',
      gitName: 'user42022',
      image: user42022,
      description:
        'Student of the RSSCHOOL stage1 stream 2023. With the desire to continue learning on the React framework.',
    },
    {
      name: 'SERGEY RODNYKH',
      gitLink: 'https://github.com/DonStacky',
      gitName: 'donstacky',
      image: donstacky,
      description:
        "Frontend developer without commercial experience. For the last year I have been actively studying frontend development and want to become professional in this field. I'm currently learning React.",
    },
  ],
  ru: [
    {
      name: 'СЕРГЕЙ ГРЕБЕЛЬ',
      gitLink: 'https://github.com/gserdg',
      gitName: 'gserg',
      image: gserg,
      description:
        'Я фронтенд-разработчик. После обучения в RS School я могу делать на JavaScript всё!!! Ну или почти все. И всего, чего я не смогу достичь, я добьюсь, работая над будущими интересными и, наверное, очень занимательными проектами.',
    },
    {
      name: 'АНДРЕЙ КИЗИЛОВ',
      gitLink: 'https://github.com/user42022',
      gitName: 'user42022',
      image: user42022,
      description:
        'Студент RSSCHOOL stage1 потока 2023 года. С желанием продолжить обучение на React framework.',
    },
    {
      name: 'СЕРГЕЙ РОДНЫХ',
      gitLink: 'https://github.com/DonStacky',
      gitName: 'donstacky',
      image: donstacky,
      description:
        'Frontend-разработчик без коммерческого опыта. Последний год я активно изучаю фронтенд-разработку и хочу стать профессионалом в этой области. Сейчас изучаю React.',
    },
  ],
};
