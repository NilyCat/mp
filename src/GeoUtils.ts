import { transform } from 'ol/proj'

/**
 * 墨卡托投影转成经纬度
 *
 * @param coordinate number[]
 * @returns {number[]}
 */
export function toEPSG4326(...coordinate: number[]): number[] {
  return transform(coordinate, 'EPSG:3857', 'EPSG:4326')
}

/**
 * 经纬度转换成墨卡托投影
 *
 * @param coordinate number[]
 * @returns {number[]}
 */
export function toEPSG3857(...coordinate: number[]): number[] {
  return transform(coordinate, 'EPSG:4326', 'EPSG:3857')
}
