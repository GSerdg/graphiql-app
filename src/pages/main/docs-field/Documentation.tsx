import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Autocomplete, Box, Button, Stack, TextField } from '@mui/material';
import { useDocumentationContext } from '../../../contexts/docs';
import { useState } from 'react';
import TypeDescription from './TypeDescription';
import './Documentation.css';

export default function Documentation() {
  const { documentation, setSearchStack } = useDocumentationContext();
  const [searchValue, setSearchValue] = useState<string | null>(null);

  const returnBack = () => {
    setSearchStack(documentation.searchStack.slice(0, -1));
  };

  const showType = (_event: React.SyntheticEvent<Element, Event>, newValue: string | null) => {
    setSearchValue(newValue);
    if (newValue) {
      setSearchStack(documentation.searchStack.concat(newValue));
    }
  };

  return (
    documentation.schema && (
      <Box>
        <Stack direction={'row'} style={{ justifyContent: 'center' }}>
          <Autocomplete
            data-testid="autocomplete"
            className="autocomplete"
            value={searchValue}
            disablePortal
            options={documentation.schema.types.map(({ name }) => name)}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="type" data-testid={'option'} />}
            onChange={showType}
          />
          <Button
            className="back-arrow"
            disabled={!documentation.searchStack.length}
            onClick={returnBack}
            data-testid="return-back"
          >
            <ArrowBackIosNewIcon fontSize="small" />
          </Button>
        </Stack>
        <Box>
          <TypeDescription />
        </Box>
      </Box>
    )
  );
}
