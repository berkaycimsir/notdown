import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const timeAgo = (date: string): string => {
  return dayjs(date).fromNow();
};

export const formatCreatedAt = (date: string): string => {
  const currentYear = dayjs().year();
  const year = dayjs(date).get('year');
  return dayjs(date).format(`MMM DD${year !== currentYear ? ', YYYY' : ''}`);
};
