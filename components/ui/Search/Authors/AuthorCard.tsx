import { ArrowRightAltRounded } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  styled,
  experimental_sx as sx,
  Button,
} from '@mui/material';
import { green, grey } from '@mui/material/colors';
import { useRouter } from 'next/router';
import React from 'react';
import { GetAuthorsByNameUserFragment } from '../../../../generated/graphql';
import useMe from '../../../../hooks/useMe';
import { cloud } from '../../../../utils/file/cloudinary';
import FollowButton from '../../Button/FollowButton';
import HomeNoteListItem from '../../Home/HomeNoteListItem';

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
  const { me } = useMe();
  const router = useRouter();
  const authorPicture = cloud.image(author.profileImage as string).toURL();

  return (
    <Card sx={{ width: '100%', borderRadius: 2, my: 3 }} variant="outlined">
      <CardHeader
        avatar={<Avatar src={authorPicture} />}
        title={author.fullName}
        subheader={`@${author.username}`}
        subheaderTypographyProps={{
          sx: { cursor: 'pointer', ':hover': { textDecoration: 'underline' } },
          onClick: () => router.push(`/profile/${author.username}`),
        }}
        action={me?.id !== author.id && <FollowButton author={author} />}
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
                onClick={() => router.push(`/profile/${author.username}`)}
              >
                {Number(author.notesCount) - 1 > 0
                  ? `${Number(author.notesCount) - 1} more ${
                      Number(author.notesCount) - 1 === 1 ? 'note' : 'notes'
                    } from @${author.username}`
                  : `See more about @${author.username}`}
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
