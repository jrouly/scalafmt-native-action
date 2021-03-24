import * as core from '@actions/core'
import {install} from './install'

async function run(): Promise<void> {
  try {
    const version: string = core.getInput('version', {required: true})
    const args: string = core.getInput('arguments', {required: true})
    core.info(`Installing scalafmt-native ${version} ${args}`)
    await install(version)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
