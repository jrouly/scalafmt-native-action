import {scalafmt} from '../src/scalafmt'

test('scalafmt', async () => {
  await scalafmt('2.7.0')
})
