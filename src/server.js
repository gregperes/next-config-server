const express = require('express')
const next = require('next')
const configServer = require('cloud-config-client')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(async () => {
  const server = express()

  server.get("*", (req, res) => {
    return handle(req, res)
  })

  const port = process.env.PORT || 3000
  const configServerAppName = ''
  const configServerUrl = ''
  const configServerUser = ''
  const configServerPassword = ''

  const configuration = await configServer.load({
    rejectUnauthorized: false,
      name: configServerAppName,
      endpoint: configServerUrl,
      profiles: this.env,
      auth: {
        user: configServerUser,
        pass: configServerPassword
      }
  })

  console.log(configuration)

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})