const { spawn } = require('child_process')

spawn(
  'npx electron-mocha -r @babel/register -u tdd --script ./vendor/first/cvsscalc31.js --renderer tests/index.js',
  {
    env: {
      ...process.env,
      BABEL_ENV: 'test',
    },
    stdio: 'inherit',
    shell: true,
  }
).on('exit', (code) => {
  process.exit(code ?? 0)
})
