import { isEmpty } from '@nily/utils'

export interface GeoPoint {
  // 经度
  longitude: number
  // 纬度
  latitude: number
}

export interface GeoBounds {
  // 矩形区域的西南角
  sw: GeoPoint
  // 矩形区域的东北角
  ne: GeoPoint
}

export type GeoPolygon = GeoPoint[]

/**
 * 定位点是否位于多边形对象内
 *
 * @param point 点对象
 * @param polygon 多边形对象
 */
export function isPointInPolygon(point: GeoPoint, polygon: GeoPolygon): boolean {
  if (isEmpty(polygon)) {
    return false
  }

  // 判断是否在外部最大矩形内
  const rect = getPolygonRect(polygon)

  if (!isPointInRect(point, rect)) {
    return false
  }

  /**
   * 判断是否在多边形内部
   * 计算定位点水平射线与多边形有多少个交点
   * 交点数量为偶数不在范围内, 奇数则在范围内
   */
  const n = polygon.length
  const precision = 2e-10 // 浮点类型计算时候与 0 比较时候的容差
  let count = 0 // 交点数量

  let p1: GeoPoint = polygon[0]
  let p2: GeoPoint

  for (let i = 1; i <= n; ++i) {
    p2 = polygon[i % n]

    if (
      point.latitude < Math.min(p1.latitude, p2.latitude) ||
      point.latitude > Math.max(p1.latitude, p2.latitude)
    ) {
      p1 = p2
      continue
    }

    if (
      point.latitude > Math.min(p1.latitude, p2.latitude) &&
      point.latitude < Math.max(p1.latitude, p2.latitude)
    ) {
      if (point.longitude <= Math.max(p1.longitude, p2.longitude)) {
        if (p1.latitude == p2.latitude && point.longitude >= Math.min(p1.longitude, p2.longitude)) {
          return true
        }

        if (p1.longitude == p2.longitude) {
          if (p1.longitude == point.longitude) {
            return true
          } else {
            ++count
          }
        } else {
          const x =
            ((point.latitude - p1.latitude) * (p2.longitude - p1.longitude)) /
              (p2.latitude - p1.latitude) +
            p1.longitude

          if (Math.abs(point.longitude - x) < precision) {
            return true
          }

          if (point.longitude < x) {
            ++count
          }
        }
      }
    } else {
      if (point.latitude == p2.latitude && point.longitude <= p2.longitude) {
        const p3 = polygon[(i + 1) % n]

        if (
          point.latitude >= Math.min(p1.latitude, p3.latitude) &&
          point.latitude <= Math.max(p1.latitude, p3.latitude)
        ) {
          ++count
        } else {
          count += 2
        }
      }
    }

    p1 = p2
  }

  return count % 2 !== 0
}

/**
 * 定位点是否在矩形内
 *
 * @param point 点对象
 * @param bounds 矩形对象
 */
export function isPointInRect(point: GeoPoint, bounds: GeoBounds): boolean {
  if (isEmpty(bounds)) {
    return false
  }

  return (
    point.longitude >= bounds.sw.longitude &&
    point.latitude >= bounds.sw.latitude &&
    point.longitude <= bounds.ne.longitude &&
    point.latitude <= bounds.ne.latitude
  )
}

/**
 * 获取多边形对象外部最大矩形
 *
 * @param polygon 多边形对象
 */
export function getPolygonRect(polygon: GeoPolygon): GeoBounds {
  const longitudes = polygon.map(p => p.longitude)
  const latitudes = polygon.map(p => p.latitude)

  return {
    sw: {
      longitude: Math.min(...longitudes),
      latitude: Math.min(...latitudes)
    },
    ne: {
      longitude: Math.max(...longitudes),
      latitude: Math.max(...latitudes)
    }
  }
}
