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
    height: 36,
    mr: 2,
  })
);

const StyledInput = styled(InputBase)(
  sx({
    fontSize: 18,
    fontStyle: 'italic',
  })
);

const Summary: React.FC = () => {
  const { summary, setSummary } = useEditorStateStore();

  const onSummaryChange = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setSummary(e.target.value);
    },
    [setSummary]
  );

  return (
    <StyledContainer>
      <StyledIndicator orientation="vertical" />
      <StyledInput
        fullWidth
        spellCheck={false}
        autoComplete="off"
        onChange={onSummaryChange}
        value={summary}
        name="summary"
        placeholder="Summary"
        multiline
      />
    </StyledContainer>
  );
};

export default Summary;
