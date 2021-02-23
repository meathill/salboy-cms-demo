import moment from 'moment';

export function datetime(datetime) {
  if (!datetime) {
    return '';
  }
  return moment(datetime).format('YYYY-MM-DD HH:mm:ss');
}
