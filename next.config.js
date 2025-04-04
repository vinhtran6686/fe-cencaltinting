/** @type {import('next').NextConfig} */
const path = require('path');
const fs = require('fs');

// Create a simple stub for missing modules
const createStub = (modulePath) => {
  const dir = path.dirname(modulePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  if (!fs.existsSync(modulePath)) {
    fs.writeFileSync(modulePath, 'export default {};');
  }
};

// Ensure the stubs exist
const ensureStubs = () => {
  const stubs = [
    './node_modules/rc-util/es/utils/get.js',
    './node_modules/rc-picker/es/locale/common.js',
    './node_modules/@rc-component/util/es/Dom/canUseDom.js',
  ];
  
  stubs.forEach(createStub);
};

// Create stubs
ensureStubs();

const nextConfig = {
  reactStrictMode: true, 
  // Environment variables available at build time
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_API_TIMEOUT: process.env.NEXT_PUBLIC_API_TIMEOUT,
    NEXT_PUBLIC_AUTH_ENABLED: process.env.NEXT_PUBLIC_AUTH_ENABLED,
    NEXT_PUBLIC_FEATURE_NOTIFICATIONS: process.env.NEXT_PUBLIC_FEATURE_NOTIFICATIONS,
  },
  // Add packages that need to be transpiled
  transpilePackages: [
    'rc-util', 
    'rc-picker', 
    'antd', 
    '@ant-design/icons', 
    '@ant-design/cssinjs',
    'rc-cascader',
    'rc-tree',
    'rc-table',
    '@rc-component/util'
  ],
  
  // Configure webpack to resolve the missing module
  webpack: (config, { isServer }) => {
    // Add fallbacks for missing modules
    config.resolve.alias = {
      ...config.resolve.alias,
      'rc-util/es/utils/get': path.resolve(__dirname, './node_modules/rc-util/es/utils/get.js'),
      'rc-picker/es/locale/common': path.resolve(__dirname, './node_modules/rc-picker/es/locale/common.js'),
      '@rc-component/util/es/Dom/canUseDom': path.resolve(__dirname, './node_modules/@rc-component/util/es/Dom/canUseDom.js'),
    };
    
    // Force certain modules to be resolved from lib instead of es
    config.resolve.mainFields = ['module', 'main', 'browser'];
    
    return config;
  },
}

module.exports = nextConfig 