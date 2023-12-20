import { Box, Stack, Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import classNames from 'classnames';
import { useState } from 'react';

const AsideEditorSmall = () => {
  const [isDocsOpen, setIsDocsOpen] = useState(false);

  const handleClick = () => {
    setIsDocsOpen((isOpen) => !isOpen);
  };

  const getFlexGrow = () => {
    return isDocsOpen ? 0 : 1;
  };

  return (
    <Stack direction="row" sx={{ flexGrow: 1, maxHeight: { xs: '40vh' } }}>
      <Box
        sx={{
          transition: '0.5s',
          backgroundColor: '#292D30',
          flexGrow: { xs: getFlexGrow(), sm: '1' },
          width: { xs: 0, sm: '80px' },
          height: '100%',
          border: '1px solid #48515B',
          borderTop: { xs: 'none' },
          borderRight: 'none',
          overflowY: 'auto',
        }}
      ></Box>
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
        <Box className={classNames('editor__docs-content', isDocsOpen && 'editor__docs-content--open')}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi alias soluta laudantium, dolore
          blanditiis aliquam veritatis ex! Ab voluptas doloribus perferendis, provident nostrum ad incidunt
          quaerat tempora laboriosam dolore nemo! Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Facilis dolore, vero fugiat at ab tenetur explicabo saepe! Repellendus perspiciatis vel repudiandae
          officiis omnis iste, odio magni dicta esse repellat eum quis consequuntur! Expedita nisi tempora
          quisquam totam, iure quia, quos id facere esse adipisci iusto accusantium commodi reiciendis illum
          dolores recusandae repellendus, maxime repellat officiis. Assumenda iusto suscipit asperiores totam?
          Consectetur numquam voluptatum nostrum fugiat a facere eveniet! Voluptatibus earum amet culpa sequi,
          labore reprehenderit provident ut vitae incidunt molestias minus? Ut sed inventore libero nesciunt
          quo quos rem officiis ratione. Ducimus, nulla expedita in repellat accusamus, quia id, fugiat
          excepturi quidem voluptatibus explicabo error esse aliquam voluptas sequi alias rem similique fugit
          sapiente provident soluta deleniti. Id repellendus eveniet, voluptas quas minus accusantium modi
          facilis sequi voluptatibus minima soluta est ipsa iste libero porro, similique iure sunt sit
          voluptate, enim itaque illo autem. Asperiores soluta, nesciunt vero officia eligendi quos?
          Reiciendis quas voluptatem rem illum harum eius tenetur architecto sed illo inventore, asperiores
          consectetur recusandae assumenda deserunt facere quod iusto nihil temporibus beatae cupiditate iure
          explicabo. Dolore, quo deserunt! Impedit earum numquam deserunt nobis dolore animi, et quos facilis
          nihil iste iure asperiores excepturi fugit at aut aspernatur perspiciatis.
        </Box>
      </Box>
    </Stack>
  );
};

export default AsideEditorSmall;
