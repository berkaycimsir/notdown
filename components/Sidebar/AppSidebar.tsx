import {
  AirRounded,
  ArticleOutlined,
  ArticleRounded,
  BookmarksOutlined,
  BookmarksRounded,
  EditOutlined,
  EditRounded,
  Face,
  Notifications,
  NotificationsNoneRounded,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Divider,
  experimental_sx as sx,
  IconButton,
  styled,
  SvgIconTypeMap,
  Tooltip,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { useRouter } from 'next/router';
import React from 'react';
import HomeFilled from '../../assets/svg/homeFilled.svg';
import HomeOutlined from '../../assets/svg/homeOutlined.svg';
import { CustomModalTypes, useModalContext } from '../../contexts/modal';
import useMe from '../../hooks/useMe';

const SIDEBAR_BORDER_COLOR = 'rgba(230, 230, 230, 1)';
const ROUTER_ICON_DIMENSIONS = { width: 28, height: 28 };
const ROUTER_ICON_STYLES = {
  filled: {
    ...ROUTER_ICON_DIMENSIONS,
    color: '#454545',
  },
  outlined: {
    ...ROUTER_ICON_DIMENSIONS,
    color: grey[600],
  },
};

type MaterialIconType = OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
  muiName: string;
};

type RouteIcon = {
  name: string;
  pathname: string;
  filled: MaterialIconType | any;
  outlined: MaterialIconType | any;
};

const RouterIcons: Array<RouteIcon> = [
  {
    name: 'Home',
    pathname: '/',
    filled: <HomeFilled />,
    outlined: <HomeOutlined />,
  },
  {
    name: 'Notifications',
    pathname: '/notifications',
    filled: <Notifications sx={ROUTER_ICON_STYLES.filled} />,
    outlined: (
      <NotificationsNoneRounded
        strokeWidth="0.1px"
        sx={ROUTER_ICON_STYLES.outlined}
      />
    ),
  },
  {
    name: 'Bookmarks',
    pathname: '/bookmarks',
    filled: <BookmarksRounded sx={ROUTER_ICON_STYLES.filled} />,
    outlined: <BookmarksOutlined sx={ROUTER_ICON_STYLES.outlined} />,
  },
  {
    name: 'Stories',
    pathname: '/stories',
    filled: <ArticleRounded sx={ROUTER_ICON_STYLES.filled} />,
    outlined: <ArticleOutlined sx={ROUTER_ICON_STYLES.outlined} />,
  },
  {
    name: 'New',
    pathname: '/new',
    filled: <EditRounded sx={ROUTER_ICON_STYLES.filled} />,
    outlined: <EditOutlined sx={ROUTER_ICON_STYLES.outlined} />,
  },
];

const StyledSidebar = styled(Box)(
  sx({
    width: 'auto',
    height: '100vh',
    borderRight: `1px solid ${SIDEBAR_BORDER_COLOR}`,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    py: 5,
    px: 2,
  })
);

const StyledBrandIcon = styled(AirRounded)({
  color: 'rgba(41, 41, 41, 1)',
});

const StyledLastRouterIconDivider = styled(Divider)(
  sx({
    borderColor: SIDEBAR_BORDER_COLOR,
    width: 28,
    mt: 2,
  })
);

const StyledRouterIconButton = styled(IconButton, {
  shouldForwardProp: (prop: any) => prop !== '$isLastIcon',
})<{ $isLastIcon: boolean }>(({ $isLastIcon }) => {
  return sx({
    mt: 2,
    mb: $isLastIcon ? 2 : 0,
  });
});

const StyledProfileImage = styled(Avatar)({
  width: 36,
  height: 36,
});

const AppSidebar: React.FC = () => {
  const router = useRouter();
  const { me } = useMe();
  const { showModal } = useModalContext();

  const onRouteIconClick = React.useCallback(
    (pathname: string) => {
      if (me || pathname === '/') {
        router.push(pathname);
      } else {
        showModal({ type: CustomModalTypes.SIGN_IN, showCloseButton: true });
      }
    },
    [me, router, showModal]
  );

  return (
    <StyledSidebar>
      <StyledBrandIcon fontSize="large" />

      <div style={{ flex: 1 }} />

      {RouterIcons.map(({ name, pathname, filled, outlined }, index) => {
        const isLastIcon = index === RouterIcons.length - 1;

        return (
          <React.Fragment key={pathname}>
            {isLastIcon && <StyledLastRouterIconDivider />}
            <Tooltip placement="left" title={name}>
              <StyledRouterIconButton
                onClick={() => onRouteIconClick(pathname)}
                $isLastIcon={isLastIcon}
                disableTouchRipple
                key={pathname}
              >
                {router.pathname === pathname ? filled : outlined}
              </StyledRouterIconButton>
            </Tooltip>
          </React.Fragment>
        );
      })}

      <div style={{ flex: 1 }} />

      <Tooltip title="Profile" placement="left">
        <IconButton onClick={() => onRouteIconClick('/profile')} size="small">
          {me ? (
            <StyledProfileImage src="https://avatars.githubusercontent.com/u/47090177?v=4" />
          ) : (
            <Face sx={{ fontSize: 28 }} />
          )}
        </IconButton>
      </Tooltip>
    </StyledSidebar>
  );
};

export default AppSidebar;
