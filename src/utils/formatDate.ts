export const FormatDate = (date: string) => {
  const DateISOFormat = new Date(date)
  const day = DateISOFormat.getDate()
  const month =
    Number(DateISOFormat.getMonth()) < 9
      ? '0' + (Number(DateISOFormat.getMonth()) + 1)
      : Number(DateISOFormat.getMonth()) + 1
  const year = DateISOFormat.getFullYear()

  return day + '.' + month + '.' + year
}
