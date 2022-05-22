import {
  ListItem,
  ListItemText,
  Typography,
  Divider,
  styled,
  experimental_sx as sx,
  Chip,
  Box,
  Avatar,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { useRouter } from 'next/router';
import React from 'react';
import { NotesQueryNoteFragment } from '../../generated/graphql';
import { formatCreatedAt } from '../../utils/date';
import { readingTime } from '../../utils/markdown';

type Props = {
  shouldRenderDivider: boolean;
  note: NotesQueryNoteFragment | null;
};

const StyledInfoText = styled(Typography)(
  sx({
    fontWeight: 300,
    fontSize: 13,
    display: 'inline',
    mb: 2,
    color: grey[800],
  })
);

const StyledDivider = styled(Divider)(
  sx({
    mb: 2,
    mt: 1,
    borderWidth: 0.1,
  })
);

const StyledTags = styled(Chip)(
  sx({
    mt: 1.5,
    p: 0.3,
    display: 'inline',
    cursor: 'pointer',
    mr: 1,
    ':hover': {
      color: grey[900],
    },
  })
);

const StyledSummaryText = styled(Typography)(
  sx({
    wordBreak: 'break-all',
    fontWeight: 400,
  })
);

const StyledAuthorContainer = styled(Box)(
  sx({
    mt: 3,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  })
);

const StyledProfileImage = styled(Avatar)(
  sx({
    width: 24,
    height: 24,
    mr: 1.5,
  })
);

const StyledAuthorName = styled(Typography)(
  sx({
    fontSize: 14,
    color: 'black',
  })
);

const StyledNoteCreatedAtText = styled(Typography)(
  sx({
    ml: 0.5,
    fontSize: 14,
    color: 'GrayText',
  })
);

const HomeNoteListItem: React.FC<Props> = ({ shouldRenderDivider, note }) => {
  const router = useRouter();

  const onNoteClick = React.useCallback(() => {
    router.push(`/notes/${note?.id}`);
  }, [note?.id, router]);

  return (
    <>
      <StyledAuthorContainer>
        <StyledProfileImage src="https://avatars.githubusercontent.com/u/47090177?v=4" />
        <StyledAuthorName>{note?.author.fullName}</StyledAuthorName>
        <StyledNoteCreatedAtText>
          · {formatCreatedAt(note?.createdAt)}
        </StyledNoteCreatedAtText>
      </StyledAuthorContainer>
      <ListItem
        onClick={onNoteClick}
        sx={{ cursor: 'pointer', pt: 0 }}
        disableGutters
      >
        <ListItemText
          primaryTypographyProps={{
            variant: 'subtitle1',
            fontWeight: 800,
            fontSize: 20,
          }}
          primary={note?.title}
          secondary={
            <React.Fragment>
              <StyledSummaryText variant="subtitle2">
                {note?.summary.slice(0, 320)}
                {Number(note?.summary.length) > 320 && '...'}
              </StyledSummaryText>
            </React.Fragment>
          }
        />
      </ListItem>
      <Box mb={3}>
        {note?.tags.map((tag) => (
          <StyledTags label={tag} key={tag} />
        ))}
        <StyledInfoText variant="subtitle2">
          {readingTime(String(note?.markdown))} min read · Based on your reading
          history
        </StyledInfoText>
      </Box>
      {shouldRenderDivider && <StyledDivider />}
    </>
  );
};

export default HomeNoteListItem;
