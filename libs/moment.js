import moment from 'moment';

export default function formatDate(isoString) {
  return moment(isoString).format('DD/MM/YYYY HH:mm:ss');
}
