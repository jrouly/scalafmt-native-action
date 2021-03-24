import * as core from '@actions/core'
import {scalafmt} from './scalafmt'

async function run(): Promise<void> {
  try {
    const version: string = core.getInput('version', {required: true})
    const args: string = core.getInput('arguments', {required: true})
    core.info(`Installing scalafmt-native ${version} ${args}`)
    await scalafmt(version)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
