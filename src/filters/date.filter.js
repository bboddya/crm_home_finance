import store from '../store'

export default function dateFilter(value, formar = 'date') {
  /* let date = this.date;  *///значение даты из data
  let options = {}; //записываются

  if (formar.includes("date")) {
    options.day = "2-digit";
    options.month = "long";
    options.year = "numeric";
  }
  if (formar.includes("time")) {
    options.hour = "2-digit";
    options.minute = "2-digit";
    options.second = "2-digit";
  }

  const locale = store.getters.info.locale || 'ru-RU' //изменение языка даты
  return new Intl.DateTimeFormat(locale, options).format(new Date(value));
}