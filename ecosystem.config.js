const argEnvIndex = process.argv.indexOf('--env')
let argEnv = (argEnvIndex !== -1 && process.argv[argEnvIndex + 1]) || ''

const RUN_ENV_MAP = {
  local: {
    instances: 2,
    max_memory_restart: '250M'
  },
  dev: {
    instances: 2,
    max_memory_restart: '250M'
  },
  prod: {
    instances: 4,
    max_memory_restart: '1000M'
  }
}

if (!(argEnv in RUN_ENV_MAP)) {
  argEnv = 'prod'
}

module.exports = {
    apps: [
        {
            name: 'art-house-holding',
            exec_mode: 'cluster',
            instances: 'max',
            script: 'node_modules/next/dist/bin/next',
            args: 'start',
            env_local: {
                APP_ENV: 'local' // APP_ENV=local
            },
            env_dev: {
                APP_ENV: 'dev' // APP_ENV=dev
            },
            env_prod: {
                APP_ENV: 'prod' // APP_ENV=prod
            }
        }
    ]
}