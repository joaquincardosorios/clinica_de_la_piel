export function formatRut(rut: string): string {
    const newRut = rut.replace(/\./g,'').replace(/\-/g, '').trim().toLowerCase();
    const lastDigit = newRut.slice(-1);
    const rutDigit = newRut.slice(0, -1)
    let format = '';
    let i
    for (i = rutDigit.length; i > 3; i -= 3) {
        format += '.'.concat(rutDigit.slice(i-3,i))
    }
    format = rutDigit.slice(0, i) + format;
    return format.concat('-').concat(lastDigit);
}