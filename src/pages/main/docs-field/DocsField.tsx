import { Box, Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import classNames from 'classnames';
import { useState } from 'react';

const DocsField = () => {
  const [isDocsOpen, setIsDocsOpen] = useState(false);
  const [isDocsShow, setIsDocsShow] = useState(false);

  const handleClick = () => {
    setIsDocsOpen((isOpen) => !isOpen);
    isDocsShow
      ? setIsDocsShow((isShow) => !isShow)
      : setTimeout(() => setIsDocsShow((isShow) => !isShow), 500);
  };

  return (
    <Box className={classNames('editor__docs', isDocsOpen && 'editor__docs--open')}>
      <Button
        variant="contained"
        disableElevation
        className="editor__button"
        sx={{
          boxShadow: 'none',
          backgroundColor: '#AD7630',
          borderRadius: '0',
          height: '1.9rem',
        }}
        onClick={handleClick}
      >
        <ArrowBackIosIcon
          className={classNames('editor__docs-icon', isDocsOpen && 'editor__docs-icon--open')}
        />{' '}
        DOCS
      </Button>
      {isDocsShow && (
        <Box sx={{ padding: '0.5rem' }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos commodi exercitationem, maxime error,
          quaerat dolorum cum ut saepe consectetur magnam odio atque dignissimos illum assumenda accusamus
          dolorem inventore, eaque tempora minima provident ipsa? Magni rerum iusto sunt blanditiis at quidem
          repudiandae non inventore temporibus exercitationem asperiores aliquam tempore ducimus quam tenetur
          error provident deleniti, doloremque libero, quis officia? Iste quas soluta veritatis sit, quod quo
          deleniti ullam ducimus? Eligendi repellat ducimus itaque porro accusantium inventore et nemo
          praesentium, impedit nobis asperiores voluptatem numquam earum rerum fuga esse perferendis error
          suscipit hic natus at, eos officiis quos quisquam. Corrupti odio autem a iure aperiam animi commodi
          eveniet, laudantium distinctio modi aut dolor maiores nisi enim deserunt consectetur, cum eligendi
          dolores exercitationem dolorem molestias. Asperiores, quidem. Quod aspernatur, veniam molestiae
          adipisci quidem fugiat minima placeat ea similique sed! Incidunt, tempora nisi possimus fugiat iure
          nostrum voluptate ad doloribus placeat quasi, quibusdam quos voluptatem cupiditate quisquam ea
          dignissimos repudiandae nihil deserunt tenetur! Cumque saepe beatae nisi eos alias quas, eligendi
          obcaecati mollitia impedit porro omnis dolorem quasi delectus assumenda amet officiis magnam
          adipisci veniam maxime voluptatem? Sunt similique minima non suscipit nihil, unde mollitia dolores
          quibusdam deserunt consequuntur accusamus quisquam earum reiciendis architecto?
        </Box>
      )}
    </Box>
  );
};

export default DocsField;
