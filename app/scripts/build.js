import { spawn } from 'child_process'

spawn('webpack --mode production', {
  env: {
    ...process.env,
    NODE_ENV: 'production',
  },
  stdio: 'inherit',
  shell: true,
}).on('exit', (code) => {
  process.exit(code ?? 0)
})
