import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { MoreHorizRounded } from '@mui/icons-material';
import { styled, experimental_sx as sx } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useEditorStateStore } from '../../store/editor-state';

const IndicatorStyles = {
  minWidth: 200,
  overflow: 'visible',
  mt: 1.5,
  pb: 1.5,
  px: 2,
  '&:before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    top: 0,
    right: 10,
    width: 14,
    border: '1px solid #ddd',
    borderBottom: 'none',
    borderRight: 'none',
    height: 14,
    bgcolor: 'background.paper',
    transform: 'translateY(-50%) rotate(45deg)',
    zIndex: 0,
  },
};

const StyledButton = styled(Typography)(
  sx({
    mt: 1.5,
    color: grey[700],
    cursor: 'pointer',
    ':hover': {
      color: grey[900],
    },
  })
);

type Props = {
  onSaveButtonClick: (e: any, isPublished: boolean) => void;
};

const MoreOptions: React.FC<Props> = ({ onSaveButtonClick }) => {
  const { clear } = useEditorStateStore();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <IconButton aria-describedby={id} onClick={handleClick} size="small">
        <MoreHorizRounded />
      </IconButton>
      <Popover
        PaperProps={{
          variant: 'outlined',
          sx: IndicatorStyles,
        }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <StyledButton
          onClick={(e) => onSaveButtonClick(e, true)}
          variant="subtitle2"
        >
          Publish
        </StyledButton>
        <StyledButton onClick={() => clear()} variant="subtitle2">
          Clear editor
        </StyledButton>
      </Popover>
    </div>
  );
};

export default MoreOptions;
