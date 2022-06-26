import {
  ArrowRight,
  ArrowRightAltRounded,
  ArrowRightOutlined,
  MoreHorizRounded,
} from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Typography,
  styled,
  experimental_sx as sx,
  Button,
} from '@mui/material';
import { green, grey } from '@mui/material/colors';
import React from 'react';
import { GetAuthorsByNameUserFragment } from '../../../../generated/graphql';
import { cloud } from '../../../../utils/file/cloudinary';
import HomeNoteListItem from '../../Home/HomeNoteListItem';

const StyledButton = styled(LoadingButton)(
  sx({
    textTransform: 'none',
    borderRadius: 12,
    background: green[600],
    mt: 1,
    mr: 1,
    ':hover': {
      background: green[600],
      opacity: 0.9,
    },
  })
);

const StyledMoreNotesButton = styled(Button)(
  sx({
    textTransform: 'none',
    borderRadius: 12,
    pr: 3,
    pl: 0.3,
    mt: -4,
  })
);

type Props = {
  author: GetAuthorsByNameUserFragment;
};

const AuthorCard: React.FC<Props> = ({ author }) => {
  const authorPicture = cloud.image(author.profileImage as string).toURL();

  return (
    <Card sx={{ width: '100%', borderRadius: 2, my: 3 }} variant="outlined">
      <CardHeader
        avatar={<Avatar src={authorPicture} />}
        title={author.fullName}
        subheader={`@${author.username}`}
        subheaderTypographyProps={{
          sx: { cursor: 'pointer', ':hover': { textDecoration: 'underline' } },
        }}
        action={
          <StyledButton
            disableElevation
            disableFocusRipple
            disableRipple
            disableTouchRipple
            size="small"
            variant="contained"
          >
            Follow
          </StyledButton>
        }
      />
      <Divider />
      <CardContent>
        {author.latestNote ? (
          <Box p={1}>
            <Typography
              sx={{
                color: grey[800],
                fontFamily: 'Roboto',
              }}
              variant="subtitle1"
            >
              Latest from {author.fullName}
            </Typography>
            <Box pl={1}>
              <HomeNoteListItem
                shouldRenderDivider={false}
                note={author.latestNote}
              />
              <StyledMoreNotesButton
                disableTouchRipple
                color="secondary"
                variant="text"
                size="small"
                endIcon={<ArrowRightAltRounded />}
              >
                {Number(author.notesCount) - 1} more{' '}
                {Number(author.notesCount) - 1 === 1 ? 'note' : 'notes'} from @
                {author.username}
              </StyledMoreNotesButton>
            </Box>
          </Box>
        ) : (
          <Box p={1}>
            <Typography
              sx={{
                color: grey[700],
                fontFamily: 'Roboto',
              }}
              variant="subtitle1"
            >
              The author hasn&apos;t posted any notes yet. Follow him now to get
              noticed when he posted new one!
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default AuthorCard;
