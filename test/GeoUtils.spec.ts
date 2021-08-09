import { getPolygonRect, isPointInRect, GeoPolygon, isPointInPolygon } from '../src/GeoUtils'

describe('GeoUtils', () => {
  const polygon: GeoPolygon = [
    { longitude: 122.141711, latitude: 37.429029 },
    { longitude: 122.14177, latitude: 37.428574 },
    { longitude: 122.141911, latitude: 37.427878 },
    { longitude: 122.142322, latitude: 37.426145 },
    { longitude: 122.142632, latitude: 37.424939 },
    { longitude: 122.142748, latitude: 37.424528 },
    { longitude: 122.142908, latitude: 37.424113 },
    { longitude: 122.142921, latitude: 37.424084 },
    { longitude: 122.144167, latitude: 37.42431 },
    { longitude: 122.144269, latitude: 37.423391 },
    { longitude: 122.145071, latitude: 37.423399 },
    { longitude: 122.145075, latitude: 37.423251 },
    { longitude: 122.145082, latitude: 37.423227 },
    { longitude: 122.145099, latitude: 37.423207 },
    { longitude: 122.14513, latitude: 37.423187 },
    { longitude: 122.145162, latitude: 37.423172 },
    { longitude: 122.145201, latitude: 37.423166 },
    { longitude: 122.145889, latitude: 37.423201 },
    { longitude: 122.14597, latitude: 37.423213 },
    { longitude: 122.146027, latitude: 37.423235 },
    { longitude: 122.146086, latitude: 37.423266 },
    { longitude: 122.146149, latitude: 37.423304 },
    { longitude: 122.146199, latitude: 37.423358 },
    { longitude: 122.146227, latitude: 37.423399 },
    { longitude: 122.146254, latitude: 37.423462 },
    { longitude: 122.146274, latitude: 37.423538 },
    { longitude: 122.146292, latitude: 37.423723 },
    { longitude: 122.146251, latitude: 37.425162 },
    { longitude: 122.146257, latitude: 37.425555 },
    { longitude: 122.146236, latitude: 37.425651 },
    { longitude: 122.146216, latitude: 37.425735 },
    { longitude: 122.145868, latitude: 37.426691 },
    { longitude: 122.145724, latitude: 37.427114 },
    { longitude: 122.145528, latitude: 37.427839 },
    { longitude: 122.145438, latitude: 37.428153 },
    { longitude: 122.145427, latitude: 37.428166 },
    { longitude: 122.145408, latitude: 37.428177 },
    { longitude: 122.145386, latitude: 37.428185 },
    { longitude: 122.145356, latitude: 37.428187 },
    { longitude: 122.145336, latitude: 37.428186 },
    { longitude: 122.143165, latitude: 37.427829 },
    { longitude: 122.142805, latitude: 37.429198 },
    { longitude: 122.141711, latitude: 37.429029 }
  ]
  const bounds = {
    ne: {
      longitude: 122.146292,
      latitude: 37.429198
    },
    sw: {
      longitude: 122.141711,
      latitude: 37.423166
    }
  }

  test('polygon rect', () => {
    expect(getPolygonRect(polygon)).toStrictEqual(bounds)
  })

  test('point should in rect', () => {
    expect(
      isPointInRect(
        {
          longitude: 122.14177,
          latitude: 37.428574
        },
        bounds
      )
    ).toBe(true)
  })

  test('point should not in rect', () => {
    expect(
      isPointInRect(
        {
          longitude: 132.14177,
          latitude: 37.428574
        },
        bounds
      )
    ).toBe(false)
  })

  test('point should not in polygon', () => {
    const arr = [
      [132.14177, 37.423504],
      [122.143551, 37.423504],
      [122.143658, 37.428301],
      [122.14751, 37.426512],
      [122.141984, 37.426256],
      [122.144023, 37.424058],
      [122.143298, 37.427948]
    ]

    expect(
      arr.map(p => isPointInPolygon({ longitude: p[0], latitude: p[1] }, polygon))
    ).toStrictEqual(Array.from({ length: arr.length }).fill(false))
  })

  test('point should in polygon', () => {
    const arr = [
      [122.142467, 37.428292],
      [122.144398, 37.426222],
      [122.145428, 37.424245]
    ]

    expect(
      arr.map(p => isPointInPolygon({ longitude: p[0], latitude: p[1] }, polygon))
    ).toStrictEqual(Array.from({ length: arr.length }).fill(true))
  })
})
