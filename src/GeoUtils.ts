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
   * 算法参考：https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html
   */
  let inside = false
  const len = polygon.length
  const x = point.longitude
  const y = point.latitude

  for (let i = 0, j = len - 1; i < len; j = i++) {
    const xi = polygon[i].longitude
    const yi = polygon[i].latitude
    const xj = polygon[j].longitude
    const yj = polygon[j].latitude

    const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi

    if (intersect) {
      inside = !inside
    }
  }

  return inside
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
