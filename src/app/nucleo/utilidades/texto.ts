// Hasta dos iniciales de un nombre, en mayúscula («Usuario de muestra» → «UM»)
export function iniciales(nombre: string): string {
  return nombre
    .trim()
    .split(/\s+/)
    .filter((parte) => parte.length > 2 || /^\p{Lu}/u.test(parte))
    .slice(0, 2)
    .map((parte) => parte[0].toLocaleUpperCase('es'))
    .join('');
}
