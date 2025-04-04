/** @type {import('next').NextConfig} */
const path = require('path');
const fs = require('fs');

// Danh sách các module Node.js cần mô phỏng trong môi trường trình duyệt
const nodeModules = [
  'fs', 'path', 'os', 'crypto', 'stream', 'http', 'https', 'zlib', 'util', 
  'url', 'assert', 'tty', 'module', 'constants', 'querystring', 'punycode', 'child_process'
];

// Tạo danh sách các phụ thuộc có thể gây vấn đề
const problematicDependencies = [
  'rc-util',
  'rc-picker',
  'antd',
  '@ant-design/icons',
  '@ant-design/cssinjs',
  'rc-cascader',
  'rc-tree',
  'rc-table',
  '@rc-component/util',
  'babel-plugin-macros',
  'cosmiconfig',
  'resolve-from',
  'import-fresh',
  'resolve',
  'path-type',
  'find-up',
  'pkg-dir',
  'locate-path',
  'p-locate',
  'p-limit',
  'p-try',
  'graceful-fs',
  'find-root'
];

// Tạo stub đơn giản cho các module bị thiếu
const createStub = (modulePath) => {
  const dir = path.dirname(modulePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  if (!fs.existsSync(modulePath)) {
    fs.writeFileSync(modulePath, 'export default {};');
  }
};

// Các file stub cần thiết 
const ensureStubs = () => {
  const stubs = [
    './node_modules/rc-util/es/utils/get.js',
    './node_modules/rc-picker/es/locale/common.js',
    './node_modules/@rc-component/util/es/Dom/canUseDom.js',
  ];
  
  stubs.forEach(createStub);
};

// Tạo các stub
ensureStubs();

// Tạo stub cho path-type
const pathTypeStub = `
'use strict';
const { promisify } = require('util');

exports.isFile = () => Promise.resolve(false);
exports.isDirectory = () => Promise.resolve(false);
exports.isSymlink = () => Promise.resolve(false);
exports.isFileSync = () => false;
exports.isDirectorySync = () => false;
exports.isSymlinkSync = () => false;
`;

// Tạo stub cho find-root
const findRootStub = `
'use strict';
var path = require('path');

function defaultCheck (dir) {
  return true;
}

module.exports = function findRoot (start, check) {
  if (typeof start === 'function') {
    check = start;
    start = process.cwd();
  }
  
  if (typeof check !== 'function') {
    check = defaultCheck;
  }
  
  return start;
}
`;

// Tạo thư mục và file stub cho path-type
const pathTypeDir = path.dirname('./node_modules/path-type/index.js');
if (!fs.existsSync(pathTypeDir)) {
  fs.mkdirSync(pathTypeDir, { recursive: true });
}
fs.writeFileSync('./node_modules/path-type/index.js', pathTypeStub);

// Tạo thư mục và file stub cho find-root
const findRootDir = path.dirname('./node_modules/find-root/index.js');
if (!fs.existsSync(findRootDir)) {
  fs.mkdirSync(findRootDir, { recursive: true });
}
fs.writeFileSync('./node_modules/find-root/index.js', findRootStub);

const stubAllNodeModules = () => {
  // Tạo danh sách các module cần giả lập
  const modulesToStub = [
    'find-root',
    'path-type',
    'resolve-from',
    'import-fresh',
    'cosmiconfig',
    'gatsby-plugin-emotion',
    'gatsby-plugin-typegen',
    'next-babel-plugin-emotion-next'
  ];
  
  // Các mẫu stub tương ứng với từng module
  const moduleStubs = {
    'find-root': `
'use strict';
module.exports = function findRoot(start, check) {
  return start || process.cwd();
};`,
    'path-type': `
'use strict';
exports.isFile = () => Promise.resolve(false);
exports.isDirectory = () => Promise.resolve(false);
exports.isSymlink = () => Promise.resolve(false);
exports.isFileSync = () => false;
exports.isDirectorySync = () => false;
exports.isSymlinkSync = () => false;`,
    'resolve-from': `
'use strict';
module.exports = function resolveFrom(fromDir, moduleId) { return moduleId; };
module.exports.silent = function(fromDir, moduleId) { return moduleId; };`,
    'import-fresh': `
'use strict';
module.exports = function importFresh(modulePath) { return {}; }`,
    'cosmiconfig': `
'use strict';
module.exports = function cosmiconfig() {
  return {
    search: () => Promise.resolve(null),
    load: () => Promise.resolve(null),
    loadSync: () => null,
  };
};
module.exports.cosmiconfigSync = function() {
  return {
    search: () => null,
    load: () => null,
  };
};`,
    'gatsby-plugin-emotion': `export default {};`,
    'gatsby-plugin-typegen': `export default {};`,
    'next-babel-plugin-emotion-next': `export default {};`
  };
  
  // Tạo các file stub
  Object.entries(moduleStubs).forEach(([moduleName, stubContent]) => {
    const filePath = `./node_modules/${moduleName}/index.js`;
    const dir = path.dirname(filePath);
    
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(filePath, stubContent);
    console.log(`Created stub for ${moduleName}`);
  });
  
  // Nếu là module cosmiconfig, cần tạo thêm các stub cho các file con
  const cosmiDir = './node_modules/babel-plugin-macros/node_modules/cosmiconfig/dist';
  if (!fs.existsSync(cosmiDir)) {
    fs.mkdirSync(cosmiDir, { recursive: true });
  }
  
  fs.writeFileSync(`${cosmiDir}/readFile.js`, `
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFile = function(filepath) { return Promise.resolve(''); };
exports.readFileSync = function(filepath) { return ''; };
`);
  
  console.log('Created stub for cosmiconfig readFile');
};

// Gọi hàm tạo stub cho tất cả các module
stubAllNodeModules();

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
  transpilePackages: problematicDependencies,
  
  // Cấu hình webpack toàn diện
  webpack: (config, { isServer, webpack }) => {
    // Thêm fallback cho các module bị thiếu
    config.resolve.alias = {
      ...config.resolve.alias,
      'rc-util/es/utils/get': path.resolve(__dirname, './node_modules/rc-util/es/utils/get.js'),
      'rc-picker/es/locale/common': path.resolve(__dirname, './node_modules/rc-picker/es/locale/common.js'),
      '@rc-component/util/es/Dom/canUseDom': path.resolve(__dirname, './node_modules/@rc-component/util/es/Dom/canUseDom.js'),
      'find-root': path.resolve(__dirname, './node_modules/find-root/index.js'),
      'path-type': path.resolve(__dirname, './node_modules/path-type/index.js'),
    };
    
    // Force certain modules to be resolved from lib instead of main
    config.resolve.mainFields = ['browser', 'module', 'main'];
    
    // Chỉ áp dụng các fallback cho môi trường trình duyệt, không áp dụng cho server
    if (!isServer) {
      // Tạo fallbacks cho tất cả các Node.js core modules
      const fallback = {};
      nodeModules.forEach(mod => {
        fallback[mod] = false;
      });
      
      config.resolve.fallback = {
        ...config.resolve.fallback,
        ...fallback
      };
      
      // Tắt tính năng optimization.minimize để dễ debug
      config.optimization.minimize = false;
      
      // Thêm các plugin để xử lý các request động
      config.plugins.push(
        new webpack.DefinePlugin({
          'process.browser': 'true',
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        }),
        new webpack.IgnorePlugin({
          resourceRegExp: /^(fs|path|os|crypto|stream|http|https|zlib|util|url|assert|tty|constants)$/,
          contextRegExp: /.*node_modules.*/,
        }),
        new webpack.NormalModuleReplacementPlugin(
          /node:fs/,
          resource => {
            resource.request = resource.request.replace(/^node:/, '');
          }
        )
      );
      
      // Tắt cache để tránh vấn đề với các module đã được cache
      config.cache = false;
    }
    
    return config;
  },
}

module.exports = nextConfig 