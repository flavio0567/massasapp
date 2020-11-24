import moment from 'moment';

function padout(number: number): any {
  return number < 10 ? `0${number}` : number;
}

function Easter(Y: number): any {
  const C = Math.floor(Y / 100);
  const N = Y - 19 * Math.floor(Y / 19);
  const K = Math.floor((C - 17) / 25);
  let I = C - Math.floor(C / 4) - Math.floor((C - K) / 3) + 19 * N + 15;
  I -= 30 * Math.floor(I / 30);
  I -=
    Math.floor(I / 28) *
    (1 -
      Math.floor(I / 28) *
        Math.floor(29 / (I + 1)) *
        Math.floor((21 - N) / 11));
  let J = Y + Math.floor(Y / 4) + I + 2 - C + Math.floor(C / 4);
  J -= 7 * Math.floor(J / 7);
  const L = I - J;
  const M = 3 + Math.floor((L + 40) / 44);
  const D = L + 28 - 31 * Math.floor(M / 4);

  return `${padout(M)}${padout(D)}`;
}

export default function getHoliday(date: string): any {
  const consultar = date;
  const feriados: { data: any; descricao: string }[] = [];
  const ano = moment(consultar, 'DD/MM/YYYY').year();
  const pascoa = moment(ano + Easter(ano));

  feriados.push({
    data: moment(`${ano}0101`).format('DD/MM/YYYY'),
    descricao: 'Confraternização Universal',
  });
  feriados.push({
    data: moment(pascoa).subtract(48, 'days').format('DD/MM/YYYY'),
    descricao: '2ºferia Carnaval',
  });
  feriados.push({
    data: moment(pascoa).subtract(47, 'days').format('DD/MM/YYYY'),
    descricao: 'Carnaval',
  });
  feriados.push({
    data: moment(pascoa).format('DD/MM/YYYY'),
    descricao: 'Páscoa',
  });
  feriados.push({
    data: moment(pascoa).subtract(2, 'days').format('DD/MM/YYYY'),
    descricao: '6ºfeira Santa',
  });
  feriados.push({
    data: moment(pascoa).add(60, 'days').format('DD/MM/YYYY'),
    descricao: 'Corpus Cirist',
  });
  feriados.push({
    data: moment(`${ano}0421`).format('DD/MM/YYYY'),
    descricao: 'Tiradentes',
  });
  feriados.push({
    data: moment(`${ano}0501`).format('DD/MM/YYYY'),
    descricao: 'Dia do Trabalhador',
  });
  feriados.push({
    data: moment(`${ano}0907`).format('DD/MM/YYYY'),
    descricao: 'Dia da Independência',
  });
  feriados.push({
    data: moment(`${ano}1012`).format('DD/MM/YYYY'),
    descricao: 'N. S. Aparecida',
  });
  feriados.push({
    data: moment(`${ano}1102`).format('DD/MM/YYYY'),
    descricao: 'Todos os santos',
  });
  feriados.push({
    data: moment(`${ano}1225`).format('DD/MM/YYYY'),
    descricao: 'Natal',
  });

  // const retorno = feriados.map((n: string, i: number) => {
  //   if (n.data === consultar) {
  //     return n;
  //   }
  // });

  return feriados;
}
