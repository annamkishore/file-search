//
// File Search Utility
//

let fileUtils = require("../utils/file-utils")

export default async function fileSearchHandler(req, res) {
  let search = req.query.q
  let result = await fileUtils.print(search)
  res.status(200).json({name: JSON.stringify(result)})
}
