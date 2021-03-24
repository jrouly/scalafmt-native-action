import * as core from '@actions/core'
import {scalafmt} from './scalafmt'

async function run(): Promise<void> {
  try {
    const version: string = core.getInput('version', {required: true})
    const args: string = core.getInput('arguments', {required: true})

    await scalafmt(version, args)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
