const { spawn } = require('child_process')

spawn('electron-mocha -r @babel/register -u tdd --renderer tests/index.js', {
  env: {
    ...process.env,
    BABEL_ENV: 'test',
  },
  stdio: 'inherit',
  shell: true,
}).on('exit', (code) => {
  process.exit(code ?? 0)
})
