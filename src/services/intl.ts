export default function IntlService() {
  const locale = "en";

  return {
    formatDate(
      date: Date | number,
      options?: Intl.DateTimeFormatOptions
    ): string {
      return new Intl.DateTimeFormat(locale, options).format(date);
    },
  };
}
