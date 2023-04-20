import codeCoverageTasks from '@cypress/code-coverage/task.js'
import wp from '@cypress/webpack-preprocessor'
import { defineConfig } from 'cypress'
import { rm } from 'fs/promises'

export default defineConfig({
  video: false,
  defaultCommandTimeout: 10000,
  viewportWidth: 1280,
  viewportHeight: 1024,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      on(
        'file:preprocessor',
        wp({
          webpackOptions: {
            module: {
              rules: [
                {
                  test: /.js$/,
                  exclude: /node_modules/,
                  use: {
                    loader: 'babel-loader',
                    options: {
                      presets: [['@babel/preset-env', { targets: 'defaults' }]],
                    },
                  },
                },
              ],
            },
          },
        })
      ),
        codeCoverageTasks(on, config)
      on('task', {
        /**
         * @param {string} path
         */
        async rm(path) {
          await rm(path, { recursive: true, force: true })
          return null
        },
      })
      return config
    },
    baseUrl: 'http://localhost:8080',
  },
})
