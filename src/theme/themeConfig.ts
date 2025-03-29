import { theme } from 'antd';
import type { ThemeConfig } from 'antd';

const themeConfig: ThemeConfig = {
  token: {
    colorPrimary: '#1890ff',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    colorTextBase: 'rgba(0, 0, 0, 0.85)',
    colorBgBase: '#ffffff',
    borderRadius: 4,
    fontSize: 14,
    fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
  },
  components: {
    Button: {
      colorPrimary: '#1890ff',
      algorithm: true,
    },
    Card: {
      colorBorderSecondary: '#f0f0f0',
    },
  },
  algorithm: theme.defaultAlgorithm,
};

export default themeConfig; 