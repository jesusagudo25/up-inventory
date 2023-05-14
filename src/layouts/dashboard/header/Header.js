//@ mui
import { styled,alpha } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton } from '@mui/material';

// components
import Iconify from '../../../components/iconify/Iconify';

//
import AccountPopover from './AccountPopover';

// ----------------------------------------------------------------------
function bgBlur(props) {
  const color = props?.color || '#000000';
  const blur = props?.blur || 6;
  const opacity = props?.opacity || 0.8;
  const imgUrl = props?.imgUrl;

  if (imgUrl) {
    return {
      position: 'relative',
      backgroundImage: `url(${imgUrl})`,
      '&:before': {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 9,
        content: '""',
        width: '100%',
        height: '100%',
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
        backgroundColor: alpha(color, opacity),
      },
    };
  }

  return {
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    backgroundColor: alpha(color, opacity),
  };
}

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({color: theme.palette.background.default}),
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: {
    width: 'calc(100% - 281px)',
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: 64,
  [theme.breakpoints.up('lg')]: {
    minHeight: 92,
    padding: theme.spacing(0, 5),
  },
}));


export default function Header () {
  return (
    <StyledRoot>
      <StyledToolbar>

        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row"
        alignItems={'center'}
        spacing={{
          xs: 0.5,
          sm: 1,
        }}
        >
          <AccountPopover />
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  )
}
