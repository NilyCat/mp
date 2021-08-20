import { isEmpty } from '@nily/utils'

export interface GeoPoint {
  // 经度
  longitude: number
  // 纬度
  latitude: number
}

export interface EPSG3857Point {
  x: number
  y: number
}

export interface GeoRect {
  // 矩形区域的西南角
  sw: GeoPoint
  // 矩形区域的东北角
  ne: GeoPoint
}

export type GeoPolygon = GeoPoint[]

// Radius of WGS84 sphere
export const GEO_RADIUS = 6378137
export const GEO_HALF_SIZE = Math.PI * GEO_RADIUS
export const GEO_MAX_SAFE_Y = GEO_RADIUS * Math.log(Math.tan(Math.PI / 2))

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
 * @param rect 矩形对象
 */
export function isPointInRect(point: GeoPoint, rect: GeoRect): boolean {
  if (isEmpty(rect)) {
    return false
  }

  return (
    point.longitude >= rect.sw.longitude &&
    point.latitude >= rect.sw.latitude &&
    point.longitude <= rect.ne.longitude &&
    point.latitude <= rect.ne.latitude
  )
}

/**
 * 获取多边形对象外部最大矩形
 *
 * @param polygon 多边形对象
 */
export function getPolygonRect(polygon: GeoPolygon): GeoRect {
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

export function getPolygonCenter(polygon: GeoPolygon): GeoPoint {
  return getRectCenter(getPolygonRect(polygon))
}

export function getPolygonScale(
  polygon: GeoPolygon,
  scalesMap: Record<string | number, number>
): number {
  const rect = getPolygonRect(polygon)
  const ne = toEPSG3857(rect.ne)
  const sw = toEPSG3857(rect.sw)

  // 获取长边
  const l = Math.max(Math.abs(ne.x - sw.x), Math.abs(ne.y - sw.y))

  return getScale(l, Object.values(scalesMap), Object.keys(scalesMap).map(Number))
}

function getScale(target: number, maps: number[], scales: number[]): number {
  const len = maps.length

  // 不超出最大缩放等级
  if (target < maps[0]) {
    // 不低于最小缩放等级
    if (target < maps[len - 1]) {
      return scales[len - 1]
    }

    for (let index = 0; index < len - 1; index++) {
      const curr = maps[index]
      const next = maps[index + 1]

      if (target >= next && target < curr) {
        return scales[index + 1] + (target - next) / (curr - next)
      }
    }
  }

  return scales[0]
}

export function toEPSG3857(point: GeoPoint): EPSG3857Point {
  const x = (GEO_HALF_SIZE * point.longitude) / 180
  let y = GEO_RADIUS * Math.log(Math.tan((Math.PI * (+point.latitude + 90)) / 360))

  if (y > GEO_MAX_SAFE_Y) {
    y = GEO_MAX_SAFE_Y
  } else if (y < -GEO_MAX_SAFE_Y) {
    y = -GEO_MAX_SAFE_Y
  }

  return {
    x,
    y
  }
}

export function getRectCenter(rect: GeoRect): GeoPoint {
  return {
    longitude: (rect.ne.longitude + rect.sw.longitude) / 2,
    latitude: (rect.ne.latitude + rect.sw.latitude) / 2
  }
}
