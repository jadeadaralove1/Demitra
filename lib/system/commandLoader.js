import fs from "fs"
import path from "path"
import chalk from "chalk"
import { parse } from "@babel/parser"

const __dirname = path.dirname(new URL(import.meta.url).pathname)

// Carpeta de comandos
const commandsFolder = path.join(__dirname, "../../commands")

// Map global de comandos y plugins
global.comandos = new Map()
global.plugins = {}

// Función principal para cargar todos los comandos
async function seeCommands(dir = commandsFolder) {
  const items = fs.readdirSync(dir)
  for (const fileOrFolder of items) {
    const fullPath = path.join(dir, fileOrFolder)

    if (fs.lstatSync(fullPath).isDirectory()) {
      await seeCommands(fullPath) // carga recursiva
      continue
    }

    if (!fileOrFolder.endsWith(".js")) continue

    const code = fs.readFileSync(fullPath)
    try {
      parse(code.toString(), { sourceType: "module", plugins: ["topLevelAwait"] })
    } catch (err) {
      console.error(chalk.red(`❌ Error de sintaxis en ${fileOrFolder}:\n${err.message}`))
      continue
    }

    try {
      const imported = await import(`${fullPath}?update=${Date.now()}`)
      const comando = imported.default
      const pluginName = fileOrFolder.replace(".js", "")
      global.plugins[pluginName] = imported

      if (!comando?.command || typeof comando.run !== "function") continue

      comando.command.forEach(cmd => {
        global.comandos.set(cmd.toLowerCase(), {
          pluginName,
          run: comando.run,
          category: comando.category || "uncategorized",
          isOwner: comando.isOwner || false,
          isAdmin: comando.isAdmin || false,
          botAdmin: comando.botAdmin || false,
          before: imported.before || null,
          after: imported.after || null,
          info: comando.info || {}
        })
      })
    } catch (e) {
      console.error(chalk.red(`❌ Error cargando el plugin ${fileOrFolder}:`), e)
    }
  }
}

// Función para recargar comandos manualmente
global.reloadCommands = async () => {
  global.comandos.clear()
  await seeCommands()
  console.log(chalk.green("[✔] Comandos recargados"))
}

export default seeCommands