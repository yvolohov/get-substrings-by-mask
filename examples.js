/* Extracts substrings from any structurized string using a mask */

const getSubstringsByMask = require('./get-substrings-by-mask');

// Date: yyyy-MM-dd
console.log(
  getSubstringsByMask('{year}-{month}-{day}', '2003-04-20')
);
// { year: '2003', month: '04', day: '20' }

// Date: yyyy-MM-dd
console.log(
  getSubstringsByMask('{century|2}{year}-{month}-{day}', '2003-04-20')
);
// { century: '20', year: '03', month: '04', day: '20' }

// Date: dd/MM/yyyy
console.log(
  getSubstringsByMask('{day}/{month}/{year}', '20/04/2003')
);
// { day: '20', month: '04', year: '2003' }

// Date: ddMMyyyy
console.log(
  getSubstringsByMask('{day|2}{month|2}{year}', '20042003')
);
// { day: '20', month: '04', year: '2003' }

// Date: MM/dd/yyyy
console.log(
  getSubstringsByMask('{month}/{day}/{year}', '04/20/2003')
);
// { month: '04', day: '20', year: '2003' }

// Date: ISO format
console.log(
  getSubstringsByMask(
    '{year}-{month}-{day}T{hour}:{minute}:{second|2}{timezone}',
    '2019-05-24T09:36:28+00:00'
  )
);
// { year: '2019', month: '05', day: '24', hour: '09', minute: '36', second: '28', timezone: '+00:00' }

// Date: GMT string
console.log(
  getSubstringsByMask(
    '{weekday}, {day} {month} {year} {hour}:{minute}:{second} {timezone}',
    'Fri, 24 May 2019 10:39:51 GMT'
  )
);
// { weekday: 'Fri', day: '24', month: 'May', year: '2019', hour: '10', minute: '39', second: '51', timezone: 'GMT' }

// Date: dd-MMM-yyyy hh:mm
console.log(
  getSubstringsByMask('{day}-{month}-{year} {hour}:{minute}', '20-JUN-1990 08:03')
);
// { day: '20', month: 'JUN', year: '1990', hour: '08', minute: '03' }

// URL
console.log(
  getSubstringsByMask(
    'https://{blog}.blogplatform.com/article/{article}/comment/{comment}?{rest}',
    'https://aboutfashion.blogplatform.com/article/120/comment/150?mode=edit'
  )
);
// { blog: 'aboutfashion', article: '120', comment: '150', rest: 'mode=edit' }

// IP address
console.log(
  getSubstringsByMask('{byte1}.{byte2}.{byte3}.{byte4}', '217.20.164.1')
);
// { byte1: '217', byte2: '20', byte3: '164', byte4: '1' }

// latitude & longitude
console.log(
  getSubstringsByMask(
    `{deg1}°{min1}'{sec1}"{dim1} {deg2}°{min2}'{sec2}"{dim2}`,
    `50°26'45.8"N 30°32'44.7"E`
  )
);
// { deg1: '50', min1: '26', sec1: '45.8', dim1: 'N', deg2: '30', min2: '32', sec2: '44.7', dim2: 'E' }
