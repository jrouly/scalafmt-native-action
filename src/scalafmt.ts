import * as core from '@actions/core'
import * as path from 'path'
import * as os from 'os'

const homedir = os.homedir()
const bin = path.join(homedir, 'bin')

export async function scalafmt(version: string): Promise<void> {
  core.info(`bin directory: ${bin}`)
  core.info(`version: ${version}`)

  return
}
