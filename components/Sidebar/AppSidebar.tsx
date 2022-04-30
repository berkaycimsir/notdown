import {
  AirRounded,
  ArticleOutlined,
  ArticleRounded,
  BookmarksOutlined,
  BookmarksRounded,
  EditOutlined,
  EditRounded,
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
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { useRouter } from 'next/router';
import React from 'react';
import HomeFilled from '../../assets/svg/homeFilled.svg';
import HomeOutlined from '../../assets/svg/homeOutlined.svg';

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
  pathname: string;
  filled: MaterialIconType | any;
  outlined: MaterialIconType | any;
};

const RouterIcons: Array<RouteIcon> = [
  {
    pathname: '/',
    filled: <HomeFilled />,
    outlined: <HomeOutlined />,
  },
  {
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
    pathname: '/bookmarks',
    filled: <BookmarksRounded sx={ROUTER_ICON_STYLES.filled} />,
    outlined: <BookmarksOutlined sx={ROUTER_ICON_STYLES.outlined} />,
  },
  {
    pathname: '/stories',
    filled: <ArticleRounded sx={ROUTER_ICON_STYLES.filled} />,
    outlined: <ArticleOutlined sx={ROUTER_ICON_STYLES.outlined} />,
  },
  {
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

  const onRouteIconClick = React.useCallback(
    (pathname: string) => {
      router.push(pathname);
    },
    [router]
  );

  return (
    <StyledSidebar>
      <StyledBrandIcon fontSize="large" />

      <div style={{ flex: 1 }} />

      {RouterIcons.map(({ pathname, filled, outlined }, index) => {
        const isLastIcon = index === RouterIcons.length - 1;

        return (
          <React.Fragment key={pathname}>
            {isLastIcon && <StyledLastRouterIconDivider />}
            <StyledRouterIconButton
              onClick={() => onRouteIconClick(pathname)}
              $isLastIcon={isLastIcon}
              disableTouchRipple
              key={pathname}
            >
              {router.pathname === pathname ? filled : outlined}
            </StyledRouterIconButton>
          </React.Fragment>
        );
      })}

      <div style={{ flex: 1 }} />

      <IconButton size="small">
        <StyledProfileImage src="https://avatars.githubusercontent.com/u/47090177?v=4" />
      </IconButton>
    </StyledSidebar>
  );
};

export default AppSidebar;
