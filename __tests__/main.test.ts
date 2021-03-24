import {scalafmt} from '../src/scalafmt'

test('scalafmt', async () => {
  const stdout = await scalafmt('2.7.0', '--version')
  console.assert(stdout.trim() === 'scalafmt 2.7.0')
})
