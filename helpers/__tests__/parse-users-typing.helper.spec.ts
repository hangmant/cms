import { parseUsersTyping } from '../parse-users-typing.helper'

describe(parseUsersTyping.name, () => {
  it('should parse 1 user', () => {
    expect(parseUsersTyping([{ _id: '1', name: 'dante' }])).toEqual('<b>dante</b> is typing...')
  })

  it('should parse 2 users', () => {
    expect(
      parseUsersTyping([
        { _id: '1', name: 'dante' },
        { _id: '2', name: 'hemerson' },
      ])
    ).toEqual('<b>dante</b> and <b>hemerson</b> are typing...')
  })

  it('should parse multiple users', () => {
    expect(
      parseUsersTyping([
        { _id: '1', name: 'dante' },
        { _id: '2', name: 'hemerson' },
        { _id: '3', name: 'otroyo' },
      ])
    ).toEqual('<b>dante</b>, <b>hemerson</b> and <b>otroyo</b> are typing...')
  })
})
