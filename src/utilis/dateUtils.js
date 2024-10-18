// to get the full month name
export const getFullMonth = () => {
    const date = new Date();
    const monthsFull = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 
      'August', 'September', 'October', 'November', 'December'
    ];
    return monthsFull[date.getMonth()];
  };
// to get date form form when created
  export const formatDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  //to reverse deadline date from yyy-mm-dd to dd-mm-yyy
  export const formatedDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  
  //  function to get the formatted date string
  export const getFormattedDate = () => {
    const date = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
    const dayName = days[date.getDay()]; // Get day name
    const monthName = months[date.getMonth()]; // Get abbreviated month name
    const day = date.getDate(); // Get day number
    const year = date.getFullYear(); // Get year
  
    const suffix = getDaySuffix(day); // Get suffix for day
  
    return `Today is ${dayName}, ${monthName} ${day}${suffix}, ${year}`;
  };
  
  //  function to get the correct day suffix (st, nd, rd, th)
  const getDaySuffix = (day) => {
    if (day >= 11 && day <= 13) return 'th'; // Special case for 11th, 12th, 13th
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };
  