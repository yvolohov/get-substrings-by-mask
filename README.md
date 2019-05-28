### 1. Installation
```
npm install --save get-substrings-by-mask
```

### 2. Usage

#### 2.1. Import the function
```js
const getSubstringsByMask = require('get-substrings-by-mask');
```

#### 2.2.  Description
```js
const substings = getSubstringsByMask(mask, string, [suppressErrors=true]);
```
**Arguments:**
- mask (String): a mask;
- string (String): a string for extracting substrings;
- suppressErrors (Boolean): return null or throw error on error;

**Returns**
- (Object|null): an object with substrings;

### 3. Samples of usage

#### 3.1. yyyy-MM-dd date
```js
console.log(
  getSubstringsByMask('{year}-{month}-{day}', '2003-04-20')
);

// { year: '2003', month: '04', day: '20' }
```
#### 3.2. yyyy-MM-dd date with century
```js
console.log(
  getSubstringsByMask('{century|2}{year}-{month}-{day}', '2003-04-20')
);

// { century: '20', year: '03', month: '04', day: '20' }
```

#### 3.3. dd/MM/yyyy date
```js
console.log(
  getSubstringsByMask('{day}/{month}/{year}', '20/04/2003')
);

// { day: '20', month: '04', year: '2003' }
```

#### 3.4. ddMMyyyy date
```js
console.log(
  getSubstringsByMask('{day|2}{month|2}{year}', '20042003')
);

// { day: '20', month: '04', year: '2003' }
```

#### 3.5. MM/dd/yyyy date
```js
console.log(
  getSubstringsByMask('{month}/{day}/{year}', '04/20/2003')
);

// { month: '04', day: '20', year: '2003' }
```

#### 3.6. ISO date
```js
console.log(
  getSubstringsByMask(
    '{year}-{month}-{day}T{hour}:{minute}:{second|2}{timezone}',
    '2019-05-24T09:36:28+00:00'
  )
);

// { year: '2019', month: '05', day: '24', hour: '09', minute: '36', second: '28', timezone: '+00:00' }
```

#### 3.7. JavaScript date
```js
console.log(
  getSubstringsByMask(
    '{weekday}, {day} {month} {year} {hour}:{minute}:{second} {timezone}',
    'Fri, 24 May 2019 10:39:51 GMT'
  )
);

// { weekday: 'Fri', day: '24', month: 'May', year: '2019', hour: '10', minute: '39', second: '51', timezone: 'GMT' }
```

#### 3.8. dd-MMM-yyyy hh:mm date
```js
console.log(
  getSubstringsByMask('{day}-{month}-{year} {hour}:{minute}', '20-JUN-1990 08:03')
);

// { day: '20', month: 'JUN', year: '1990', hour: '08', minute: '03' }
```

#### 3.9. URL
```js
console.log(
  getSubstringsByMask(
    'https://{blog}.blogplatform.com/article/{article}/comment/{comment}?{rest}',
    'https://aboutfashion.blogplatform.com/article/120/comment/150?mode=edit'
  )
);

// { blog: 'aboutfashion', article: '120', comment: '150', rest: 'mode=edit' }
```

#### 3.10. IP address
```js
console.log(
  getSubstringsByMask('{byte1}.{byte2}.{byte3}.{byte4}', '217.20.164.1')
);

// { byte1: '217', byte2: '20', byte3: '164', byte4: '1' }
```

#### 3.11. latitude & longitude
```js
console.log(
  getSubstringsByMask(
    `{deg1}°{min1}'{sec1}"{dim1} {deg2}°{min2}'{sec2}"{dim2}`,
    `50°26'45.8"N 30°32'44.7"E`
  )
);

// { deg1: '50', min1: '26', sec1: '45.8', dim1: 'N', deg2: '30', min2: '32', sec2: '44.7', dim2: 'E' }
```
