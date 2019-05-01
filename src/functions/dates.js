
 const transformDate = (date) => {
  const dateISO = new Date(date);
  const dateTransformed = dateISO.getFullYear()+'-' + (dateISO.getMonth()+1) + '-' + dateISO.getDate();
  return (dateTransformed)
}

export default transformDate

