import * as core from '@actions/core'
import * as path from 'path'
import * as process from 'child_process'
import * as util from 'util'
import * as os from 'os'

const exec = util.promisify(process.exec)

const homedir = os.homedir()
const bin = path.join(homedir, 'bin')
const scalafmtPath = path.join(bin, 'scalafmt-native')

export async function scalafmt(version: string, args: string): Promise<string> {
  await setup()
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
  const installerUrl =
    'https://raw.githubusercontent.com/scalameta/scalafmt/master/bin/install-scalafmt-native.sh'
  const cmd = `curl -sL ${installerUrl} | bash -sv -- ${version} ${scalafmtPath} 2>&1`
  const {stdout} = await exec(cmd)
  core.info(stdout)
  core.endGroup()
}

async function execute(args: string): Promise<string> {
  core.startGroup(`scalafmt-native ${args} 2>&1`)
  const {stdout} = await exec(`${scalafmtPath} ${args}`)
  core.endGroup()
  core.info(stdout)
  return stdout
}
