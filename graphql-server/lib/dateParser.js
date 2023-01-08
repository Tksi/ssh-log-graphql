import dayjs from 'dayjs';
import 'dayjs/locale/ja.js';
dayjs.locale('ja');

// range引数から、dateオブジェクト作成
export const dateParser = ({ from, to }) => {
  const TODAY = () => new Date(new Date().toLocaleDateString());

  const TOMORROW = (BASEDATE = new Date()) => {
    const tomorrow = new Date(BASEDATE);
    tomorrow.setDate(BASEDATE.getDate() + 1);
    return tomorrow;
  };

  const fromDate = from === 'TODAY' ? TODAY() : dayjs(from).toDate();

  to ??= 'TOMORROW';
  const toDate = to === 'TOMORROW' ? TOMORROW(fromDate) : dayjs(to).toDate();

  return { fromDate, toDate };
};

// range引数から、からmongoDB用のfilterを作成
export const range2filter = ({ from, to }) => {
  const { fromDate, toDate } = dateParser({ from, to });

  return {
    $and: [{ date: { $gte: fromDate } }, { date: { $lt: toDate } }],
  };
};
