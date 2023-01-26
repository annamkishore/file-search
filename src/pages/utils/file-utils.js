const fs = require("fs").promises
const fs1 = require("fs")
const path = require("path")

let space = count => Array(2 * count).fill("-").join("")

let search = {}
let count = 1
let result = []

async function print(dir) {
  search = {
    dir_test: "/media/kishore/Work/__git/my-work-docs/cncf",
    dir,
    ignoreDirs: ["node_modules", ".next", ".git", ".idea", "output", "vendor", "resources", "bind_linux_amd64.go"],
    needDetails: [".go"]
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
      const maxLineLen = !search.ignoreDirs.includes(file.name) ? await getMaxLineLength(file) : ""
      const max = 40
      let size = `${(file.stat.size/1024).toFixed(1)} kb`.padStart(10)
      let temp = `${space(count)} ${i + 1} ${file.name} ${ignore ? "⛔" : ""}`
      temp = temp.length > max ? temp.slice(0, max-1) + temp.at(-1) : temp.padEnd(max)
      temp += `${isDir ? "" : size} ${maxLineLen}`
      result.push(temp)

      if(ignore){ // ignoring directory contents to process
        continue
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

async function getMaxLineLength(file) {
  let ext = path.extname(file.name)
  if(!ext || !search.needDetails.includes(ext)) {
    return ""
  }

  return await processLineByLine(file.nameWithPath)
}

const readline = require('readline');

async function processLineByLine(fileName) {
  const fileStream = fs1.createReadStream(fileName);

  const rl = readline.createInterface({input: fileStream, crlfDelay: Infinity});

  let maxLineLength = 0
  for await (const line of rl) {
    // console.log(`Line from file: ${line}`);
    if(maxLineLength < line.length) {
      maxLineLength = line.length
      if(maxLineLength > 2200) {
        console.log(line)
      }
    }
  }

  return maxLineLength
}


module.exports = {
  print
}