import * as core from '@actions/core'
import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'
import * as process from 'child_process'
import * as util from 'util'

const exec = util.promisify(process.exec)

const homedir = os.homedir()
const bin = path.join(homedir, 'bin')
const scalafmtPath = path.join(bin, 'scalafmt-native')

const defaultVersion = '3.7.17'

export async function scalafmt(version: string, args: string): Promise<string> {
  await setup()
  if (!version && fs.existsSync('./.scalafmt.conf')) {
    // If version is unspecified, read it from .scalafmt.conf (if present).
    const conf = fs.readFileSync('./.scalafmt.conf', 'utf8')
    const v = conf.match('version\\s+=\\s+(\\S+)')
    if (v && v.length >= 2) {
      version = v[1]
    }
  }
  if (!version) {
    version = defaultVersion
  }
  await install(version)
  return await execute(args)
}

async function setup(): Promise<void> {
  core.startGroup(`Setup`)
  await exec(`mkdir -p ${bin}`)
  core.endGroup()
}

async function install(version: string): Promise<void> {
  core.startGroup(`Install scalafmt-native:${version}`)
  const installerUrl = `https://raw.githubusercontent.com/scalameta/scalafmt/refs/tags/v${defaultVersion}/bin/install-scalafmt-native.sh`
  const cmd = `curl -sL ${installerUrl} | bash -sv -- ${version} ${scalafmtPath} 2>&1`
  const {stdout} = await exec(cmd)
  core.info(stdout)
  core.endGroup()
}

async function execute(args: string): Promise<string> {
  core.startGroup(`scalafmt-native ${args}`)
  try {
    const {stdout} = await exec(`${scalafmtPath} ${args}`)
    core.info(stdout)
    core.endGroup()
    return stdout
  } catch (error) {
    core.info(error.stdout.toString())
    core.endGroup()
    return Promise.reject(error)
  }
}
