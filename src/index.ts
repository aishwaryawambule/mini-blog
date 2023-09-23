import { initDb } from './initializers/database'
import { app } from './app'
import { PORT } from './config'
import { log } from './utils/log'

;(async function () {

  try {
    // initialize database connection
    const dbConn = await initDb();

    // initialize server
    const server = app.listen(PORT, function () {
      log.info(`Server is started at port: ${PORT}`);
    })

    // graceful shutdown
    process.on('SIGTERM', () => {
        server.close(async () => {
          await dbConn?.disconnect();
          process.exit(0);
        })
      })

  } catch (err) {
    log.error("Error:", err);
    process.exit();
  }
})()
