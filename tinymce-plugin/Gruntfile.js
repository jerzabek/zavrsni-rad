const commonjs = require('@rollup/plugin-commonjs')
const replace = require('@rollup/plugin-replace')
const { CheckerPlugin } = require('awesome-typescript-loader');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const includePaths = require('rollup-plugin-includepaths')
const json = require('@rollup/plugin-json')
const path = require('path');
const swag = require('@ephox/swag');

module.exports = (grunt) => {
  const packageData = grunt.file.readJSON('package.json');
  const BUILD_VERSION = packageData.version + '-' + (process.env.BUILD_NUMBER ? process.env.BUILD_NUMBER : '0');
  const libPluginPath = 'lib/main/ts/Main.js';
  const scratchPluginPath = 'scratch/compiled/plugin.js';
  const scratchPluginMinPath = 'src/demo/html/plugins/zavrad.min.js';
  const tsDemoSourceFile = path.resolve('src/demo/ts/Demo.ts');
  const jsDemoDestFile = path.resolve('scratch/compiled/demo.js');

  grunt.initConfig({
    pkg: packageData,

    clean: {
      dirs: ['dist', 'scratch']
    },

    eslint: {
      options: {
        fix: grunt.option('fix')
      },
      plugin: ['src/**/*.ts']
    },

    shell: {
      command: 'tsc'
    },

    rollup: {
      options: {
        treeshake: true,
        format: 'iife',
        onwarn: swag.onwarn,
        plugins: [
          json({
            namedExports: true
          }),
          // relative imports in the current configuration cause issues that are fixed with the includePaths, replace and commonjs plugins
          includePaths({ paths: ["./"] }),
          replace({
            'process.env.NODE_ENV': JSON.stringify('production'),
            'react-dom/client': 'node_modules/react-dom/client',
            preventAssignment: true
          }),
          swag.nodeResolve({
            basedir: __dirname
          }),
          swag.remapImports(),
          commonjs()
        ]
      },
      plugin: {
        files: [
          {
            src: libPluginPath,
            dest: scratchPluginPath
          }
        ]
      }
    },

    uglify: {
      plugin: {
        files: [
          {
            src: scratchPluginPath,
            dest: scratchPluginMinPath
          }
        ]
      }
    },

    concat: {
      license: {
        options: {
          process: (src) => {
            const buildSuffix = process.env.BUILD_NUMBER
              ? '-' + process.env.BUILD_NUMBER
              : '';
            return src.replace(
              /@BUILD_NUMBER@/g,
              packageData.version + buildSuffix
            );
          }
        },
        // scratchPluginMinPath is used twice on purpose, all outputs will be minified for premium plugins
        files: {
          'dist/zavrad/plugin.js': [
            'src/text/license-header.js',
            scratchPluginMinPath
          ],
          'dist/zavrad/plugin.min.js': [
            'src/text/license-header.js',
            scratchPluginMinPath
          ]
        }
      }
    },

    copy: {
      css: {
        files: [
          { src: ['CHANGELOG.txt', 'LICENSE.txt'], dest: 'dist/zavrad', expand: true }
        ]
      }
    },

    webpack: {
      options: {
        mode: 'development',
        watch: true
      },
      dev: {
        entry: tsDemoSourceFile,
        devtool: 'source-map',

        resolve: {
          extensions: ['.ts', '.js']
        },

        module: {
          rules: [
            {
              test: /\.js$/,
              use: ['source-map-loader'],
              enforce: 'pre'
            },
            {
              test: /\.ts$/,
              use: [
                {
                  loader: 'ts-loader',
                  options: {
                    transpileOnly: true,
                    experimentalWatchApi: true
                  }
                }
              ]
            }
          ]
        },

        plugins: [new LiveReloadPlugin(), new CheckerPlugin()],

        output: {
          filename: path.basename(jsDemoDestFile),
          path: path.dirname(jsDemoDestFile)
        }
      }
    }
  });

  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('@ephox/swag');

  grunt.registerTask('version', 'Creates a version file', () => {
    grunt.file.write('dist/zavrad/version.txt', BUILD_VERSION);
  });

  grunt.registerTask('default', [
    'clean',
    'eslint',
    'shell',
    'rollup',
    'uglify',
    'concat',
    'copy',
    'version'
  ]);
};
