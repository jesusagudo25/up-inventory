
// @mui
import { Box, Drawer} from '@mui/material';

// components
import Logo from '../../../components/logo/logo';
import NavSection from '../../../components/nav-bar/NavSection';
import navConfig from './Config';

// ----------------------------------------------------------------------


export default function Nav () {

    const renderContent = (
        <>
          <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
            <Logo />
          </Box>
    
          <NavSection data={navConfig} />
    
        </>
      );

      return (
        <Box
          component="nav"
          sx={{
            flexShrink: { lg: 0 },
            width: { lg: 280 },
          }}
        >
            <Drawer
              open
              variant="permanent"
              PaperProps={{
                sx: {
                  width: 280,
                  bgcolor: 'background.default',
                  borderRightStyle: 'dashed',
                },
              }}
            >
              {renderContent}
            </Drawer>
        </Box>
      );
}
