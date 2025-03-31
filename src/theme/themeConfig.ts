import { theme } from 'antd';
import type { ThemeConfig } from 'antd';
import { colors, fontSizes, borderRadius, fontFamily } from './tokens';

const themeConfig: ThemeConfig = {
  token: {
    colorPrimary: colors.primary,
    colorSuccess: colors.success,
    colorWarning: colors.warning,
    colorError: colors.error,
    colorTextBase: colors.textPrimary,
    colorBgBase: colors.bgPrimary,
    borderRadius: parseInt(borderRadius.md),
    fontSize: parseInt(fontSizes.sm),
    fontFamily: fontFamily,
  },
  components: {
    Button: {
      colorPrimary: colors.primary,
      colorPrimaryHover: colors.primary,
      algorithm: true,
      colorBgContainer: 'transparent',
      colorText: '#ffffff',
      paddingInline: 12,
    },
    Card: {
      colorBorderSecondary: colors.borderColor,
    },
    Layout: {
      headerBg: colors.headerBackground,
      siderBg: colors.sidebarBackground,
    },
    Menu: {
      darkItemBg: 'transparent',
      darkItemColor: colors.menuText,
      darkItemHoverBg: 'rgba(255, 255, 255, 0.1)',
      darkItemSelectedBg: colors.menuActiveBg,
      darkItemSelectedColor: colors.menuActive,
    },
    Typography: {
      colorTextHeading: '#ffffff',
      colorText: '#ffffff',
      colorTextDescription: 'rgba(255, 255, 255, 0.65)',
      fontWeightStrong: 600,
      titleMarginBottom: 0,
      titleMarginTop: 0,
    }
  },
  algorithm: theme.darkAlgorithm,
};

export default themeConfig; 