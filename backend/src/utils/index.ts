export const validateRut = (rut: string): boolean => {
    // Validar formato (sin puntos, con guion)
    const rutRegex = /^\d{7,8}-[\dkK]$/;
    if (!rutRegex.test(rut)) return false;

    // Separar el número y el dígito verificador
    const [numero, dv] = rut.split('-');
    const rutNumeros = numero.split('').reverse().map(n => parseInt(n, 10));

    // Calcular dígito verificador usando módulo 11
    let suma = 0;
    let multiplicador = 2;

    for (const num of rutNumeros) {
        suma += num * multiplicador;
        multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }

    const dvCalculado = 11 - (suma % 11);
    const dvEsperado = dvCalculado === 11 ? '0' : dvCalculado === 10 ? 'K' : dvCalculado.toString();

    return dvEsperado.toUpperCase() === dv.toUpperCase();
};
