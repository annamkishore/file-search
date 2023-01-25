//
// File Search Utility
//

let fileUtils = require("../utils/file-utils")

export default async function fileSearchHandler(req, res) {
  let search = req.query.q
  try {
    // /media/kishore/Work/__git/lpm/go-source/src/lpm
    let result = await fileUtils.print(search)
    res.status(200).json({result})
  }catch(error) {
    res.status(400).json({error})
  }
}
