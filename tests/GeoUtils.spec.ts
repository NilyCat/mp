import { toEPSG3857, toEPSG4326 } from '../src/GeoUtils'

describe('GeoUtils', () => {
  test('toEPSG3857', () => {
    expect(toEPSG3857(116.397499, 39.90872200000001)).toStrictEqual([
      12957310.31829057, 4852686.861452196
    ])
  })

  test('toEPSG4326', () => {
    expect(toEPSG4326(12957310.31829057, 4852686.861452196)).toStrictEqual([
      116.397499, 39.90872200000001
    ])
  })
})
