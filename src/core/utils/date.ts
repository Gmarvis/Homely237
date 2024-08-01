const formatDate = new Intl.DateTimeFormat('en-GB', {
  year: 'numeric',
  month: 'long',
  day: '2-digit'
  //   hour: 'numeric',
  //   minute: 'numeric',
  //   timeZone: 'Europe/London'
});

const relativeTime = new Intl.RelativeTimeFormat('en', { style: 'short' });

class DateFormatter {
  formatDate(date: string | Date) {
    if (typeof date === 'string') {
      return formatDate.format(new Date(date));
    }
    return formatDate.format(date as Date);
  }

  getRange(startDate: string | Date, endDate: string | Date) {
    return formatDate.formatRange(new Date(startDate), new Date(endDate));
  }
  getCurrentDate() {
    return formatDate.format(new Date()); // return the current date
  }

  getDateDeference(startDate: string | Date, endDate: string | Date) {
    const diffTime = new Date(startDate).getTime() - new Date(endDate).getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return this.getRelativeTime(diffDays);
  }

  getRelativeTime(days: number) {
    return relativeTime.format(days, 'month');
  }
}

const dateFormatter = new DateFormatter();
export { dateFormatter };
