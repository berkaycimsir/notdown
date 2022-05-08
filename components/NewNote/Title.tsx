import React from 'react';
import {
  Box,
  Divider,
  experimental_sx as sx,
  InputBase,
  styled,
} from '@mui/material';
import { useEditorStateStore } from '../../store/editor-state';

const StyledContainer = styled(Box)(
  sx({
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    mb: 2,
  })
);

const StyledIndicator = styled(Divider)(
  sx({
    borderWidth: 2,
    borderStartEndRadius: 8,
    borderEndEndRadius: 8,
    height: 54,
    mr: 2,
  })
);

const StyledInput = styled(InputBase)(
  sx({
    fontSize: 32,
    fontStyle: 'italic',
  })
);

const Title: React.FC = () => {
  const { title, setTitle } = useEditorStateStore();

  const onTitleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setTitle(e.target.value);
    },
    [setTitle]
  );

  return (
    <StyledContainer>
      <StyledIndicator orientation="vertical" />
      <StyledInput
        fullWidth
        spellCheck={false}
        autoComplete="off"
        onChange={onTitleChange}
        value={title}
        name="title"
        placeholder="Title"
      />
    </StyledContainer>
  );
};

export default Title;
