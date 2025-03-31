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
      algorithm: true,
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
    }
  },
  algorithm: theme.darkAlgorithm,
};

export default themeConfig; 