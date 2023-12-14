import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { calculateLines } from '../../../../app/calculateLines';

interface EditorTextareaProps {
  children?: React.ReactNode;
  index?: number;
  value?: number;
  height: number;
}

const EditorTextarea = ({ children, index = 0, value = 0, height }: EditorTextareaProps) => {
  const [linesQty, setLinesQty] = useState(1);
  // const [query, setQuery] = useState('');

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newLinesQty = calculateLines(event.target.value);
    setLinesQty(newLinesQty);
    // setQuery(event.target.value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexGrow: 1,
        alignItems: 'stretch',
        maxHeight: `${height}vh`,
        overflow: 'auto',
      }}
      hidden={value !== index}
    >
      {value === index && (
        <>
          <Box
            sx={{
              borderRadius: '0 0 0 8px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {Array(linesQty)
              .fill(null)
              .map((_, index) => {
                return (
                  <Typography
                    sx={{
                      padding: '0 1rem 0 0.5rem',
                      fontSize: '0.9rem',
                      lineHeight: '1.4rem',
                      textAlign: 'right',
                      color: '#666666',
                      width: '2.5rem',
                    }}
                    key={index}
                  >
                    {index + 1}
                  </Typography>
                );
              })}
          </Box>
          <textarea className="editor__query" onChange={handleTextareaChange} />
          {children}
        </>
      )}
    </Box>
  );
};

export { EditorTextarea };
