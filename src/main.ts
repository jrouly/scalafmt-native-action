import * as core from '@actions/core'
import {install} from './install'

async function run(): Promise<void> {
  try {
    const version: string = core.getInput('scalafmt-version', {required: true})
    core.info(`Installing scalafmt-native ${version}`)
    await install(version)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
