import { expect } from 'chai'
import sortObjectKeys from '../lib/shared/sortObjectKeys'

suite('sortObjectKeys', function () {
  const examples = [
    {
      json: {
        e: null,
        d: {},
        a: 'a',
        c: {},
        b: [
          {
            c: {
              z: 42,
              y: 'my string',
              x: true,
            },
            a: {},
          },
          43,
          42,
        ],
      },

      string: `{
  "a": "a",
  "b": [
    {
      "a": {},
      "c": {
        "x": true,
        "y": "my string",
        "z": 42
      }
    },
    43,
    42
  ],
  "c": {},
  "d": {},
  "e": null
}`,
    },
  ]

  examples.forEach((example, i) => {
    test(`Example #${i + 1} is correctly sorted`, function () {
      expect(
        JSON.stringify(
          sortObjectKeys(new Intl.Collator(), example.json),
          null,
          2
        )
      ).to.equal(example.string)
    })
  })
})
