
import fs from 'fs'

export class File {

  static remove(path: string): any {
    if (fs.statSync(path)) {
      fs.unlinkSync(path)
      return true
    } else {
      return false
    }
  }
}