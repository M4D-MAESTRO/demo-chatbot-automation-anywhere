class Formatter {
  static dateToMMYYYYFormat(date: Date): string {
    const mes = date.getMonth() + 1;
    const ano = date.getFullYear();
    const aux = mes < 10 ? `0${mes}/${ano}` : `${mes}/${ano}`;

    return aux;
  }

  static dateToYYYYMMDDFormat(date: Date): string {
    const mes = date.getMonth() + 1;
    const ano = date.getFullYear();

    const dia = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const aux = mes < 10 ? `${ano}-0${mes}-${dia}` : `${ano}-${mes}-${dia}`;

    return aux;
  }
}

export default Formatter;
