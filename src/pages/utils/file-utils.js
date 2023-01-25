const fs = require("fs").promises

let space = count => Array(2 * count).fill("-").join("")

let search = {}
let count = 1

async function print(dir) {
  search = {
    dir_test: "/media/kishore/Work/__git/my-work-docs/cncf",
    dir,
    ignoreDirs: ["node_modules", ".next", ".git", ".idea"]
  }

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
      if(search.ignoreDirs.includes(file.name)){
        continue;
      }

      // 3. file - print it
      console.log(space(count), i + 1, file.name)

      // 4. dir - traverse it
      if (isDir) {
        count++
        await listFiles(file.nameWithPath)
        count--
      }
    }
  } catch (err) {
    console.error("Error Reading dir: ", err)
    return err
  }
}

module.exports = {
  print
}