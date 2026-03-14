import type * as THREE from 'three'

// Module-level refs set by Canvas3D, read by useExport
let _gl: THREE.WebGLRenderer | null = null
let _scene: THREE.Scene | null = null
let _camera: THREE.Camera | null = null

export function setGl(gl: THREE.WebGLRenderer): void { _gl = gl }
export function setScene(scene: THREE.Scene): void { _scene = scene }
export function setCamera(camera: THREE.Camera): void { _camera = camera }
export function getGl(): THREE.WebGLRenderer | null { return _gl }
export function getScene(): THREE.Scene | null { return _scene }
export function getCamera(): THREE.Camera | null { return _camera }
