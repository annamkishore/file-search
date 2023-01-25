const fs = require("fs").promises

let space = count => Array(2 * count).fill("-").join("")

let search = {}
let count = 1
let result = []

async function print(dir) {
  search = {
    dir_test: "/media/kishore/Work/__git/my-work-docs/cncf",
    dir,
    ignoreDirs: ["node_modules", ".next", ".git", ".idea", "output", "vendor", "resources"]
  }
  result = []
  return await listFiles(search.dir)
}

async function listFiles(dir) {
  try {
    let list = await fs.readdir(dir)

    // 1. list files
    for (let i = 0; i < list.length; i++) {
      let file = {name: list[i], nameWithPath: `${dir}/${list[i]}`}

      file.stat = await fs.stat(file.nameWithPath)
      let isDir = file.stat.isDirectory(file.name)

      // 2. ignore these file/directorie(s)
      const ignore = search.ignoreDirs.includes(file.name)

      // 3. file - print it
      let size = `(${(file.stat.size/1024).toFixed(1)} kb)`
      let temp = `${space(count)} ${i + 1} ${file.name} ${isDir ? "" : size} ${ignore ? " (ignored..)" : ""}`;
      result.push(temp)

      if(ignore){
        continue;
      }

      // 4. dir - traverse it
      if (isDir) {
        count++
        await listFiles(file.nameWithPath)
        count--
      }
    }

    return result
  } catch (err) {
    console.error("Error Reading dir: ", err)
    throw err
  }
}

module.exports = {
  print
}