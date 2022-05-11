import React from 'react';
import {
  Typography,
  InputBase,
  experimental_sx as sx,
  styled,
  Box,
  Chip,
  Tooltip,
} from '@mui/material';
import { grey, red } from '@mui/material/colors';
import { useEditorStateStore } from '../../store/editor-state';

const StyledInfoText = styled(Typography)(
  sx({
    color: 'GrayText',
  })
);

const StyledSaveButton = styled(Typography)(
  sx({
    mt: 1.5,
    color: grey[700],
    fontSize: 14,
    cursor: 'pointer',
    display: 'inline',
    ':hover': {
      color: grey[900],
    },
  })
);

const StyledCancelButton = styled(Typography)(
  sx({
    mt: 1.5,
    ml: 2,
    color: red[300],
    fontSize: 14,
    display: 'inline',
    cursor: 'pointer',
    ':hover': {
      color: red[700],
    },
  })
);

const StyledInput = styled(InputBase)(
  sx({
    fontSize: 14,
    mt: 2,
    fontStyle: 'italic',
  })
);

const StyledChip = styled(Chip)(
  sx({
    mt: 1,
    mr: 1,
    fontWeight: 800,
  })
);

type Props = {
  setEditingTags: React.Dispatch<React.SetStateAction<boolean>>;
};

const Tags: React.FC<Props> = ({ setEditingTags }) => {
  const [tagValue, setTagValue] = React.useState('');
  const { tags, setTags } = useEditorStateStore();

  const onTagValueChange = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setTagValue(e.target.value);
    },
    [setTagValue]
  );

  const onPressEnter = React.useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      if (e.key === 'Enter') {
        const alreadyExists = tags.find((tag) => tag === tagValue);
        if (alreadyExists) return;
        setTags([...tags, tagValue]);
        setTagValue('');
      }
    },
    [setTags, tagValue, tags]
  );

  const onDeleteTag = React.useCallback(
    (tag: string) => {
      setTags(tags.filter((val) => val !== tag));
    },
    [setTags, tags]
  );

  const onCancelClick = React.useCallback(() => {
    setEditingTags(false);
    setTags([]);
  }, [setEditingTags, setTags]);

  return (
    <Box px={1} py={3} width={300}>
      <StyledInfoText variant="subtitle2">
        Add or change tags (up to 5) so readers know what your story is about:
      </StyledInfoText>

      <Box mt={tags.length !== 0 ? 1 : 0}>
        {tags.map((tag: string, i) => (
          <StyledChip
            color={i % 2 === 0 ? 'primary' : 'secondary'}
            variant="outlined"
            onDelete={() => onDeleteTag(tag)}
            size="small"
            label={tag}
            key={i}
          />
        ))}

        {tags.length !== 5 && (
          <StyledInput
            fullWidth
            spellCheck={false}
            autoComplete="off"
            onKeyDown={onPressEnter}
            autoFocus
            onChange={onTagValueChange}
            placeholder="Press enter after typing"
            value={tagValue}
          />
        )}
      </Box>

      <Box mt={2}>
        <StyledSaveButton onClick={() => setEditingTags(false)}>
          Save
        </StyledSaveButton>

        <StyledCancelButton onClick={onCancelClick}>Cancel</StyledCancelButton>
      </Box>
    </Box>
  );
};

export default Tags;
