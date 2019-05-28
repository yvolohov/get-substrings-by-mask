const INCORRECT_MASK = 0;
const LOW_LEVEL = 1;
const HIGH_LEVEL = 2;

function getSubstringsByMask(mask, string, suppressErrors=true) {
  try {
    const disassembledMask = _disassembleMask(mask);
    _checkMask(disassembledMask);

    const collapsedMask = _collapseMask(disassembledMask);
    const positions = _calculatePositions(collapsedMask, string);

    return _extractSubstrings(collapsedMask, positions, string);
  }
  catch (error) {
    if (!suppressErrors) {
      throw error;
    }
    return null;
  }
}

function _extractSubstrings(mask, positions, string) {
  const substrings = {};

  for (let idx = 0; idx < mask.length; idx++) {
    let maskSegment = mask[idx];

    if (typeof maskSegment === 'string') {
      continue;
    }

    let currentPosition = positions[idx];
    let stringSegment = string.substring(
      currentPosition.start,
      currentPosition.end + 1
    );
    let substringStartPosition = 0;

    for (let vidx = 0; vidx < maskSegment.length; vidx++) {
      let maskSubSegment = maskSegment[vidx];
      let substringEndPosition = (maskSubSegment.len > -1)
        ? substringStartPosition + maskSubSegment.len
        : stringSegment.length;

      let substring = stringSegment.substring(
        substringStartPosition,
        substringEndPosition
      );
      substrings[maskSubSegment.key] = substring;
      substringStartPosition = substringEndPosition;
    }
  }
  return substrings;
}

function _calculatePositions(mask, string) {
  const positions = _calculateConstantsPositions(mask, string);
  _calculateVariablesPositions(positions, string.length);
  return positions;
}

function _calculateConstantsPositions(mask, string) {
  const positions = [];
  let startPosition = 0;

  for (let idx = 0; idx < mask.length; idx++) {
    let currentElement = mask[idx];

    if (typeof currentElement !== 'string') {
      positions.push(null);
      continue;
    }

    let foundIndex = string.indexOf(currentElement, startPosition);

    if (foundIndex === -1) {
      throw new Error(`The string doesn't match to the mask`);
    }

    positions.push({
      start: foundIndex,
      end: foundIndex + (currentElement.length - 1)
    });
    startPosition = foundIndex + currentElement.length;
  }
  return positions;
}

function _calculateVariablesPositions(positions, strLength) {
  for (let idx = 0; idx < positions.length; idx++) {
    let currentPosition = positions[idx];

    if (currentPosition !== null) {
      continue;
    }

    let isFirstElement = (idx === 0);
    let isLastElement = (idx === positions.length - 1);
    let previousElement = (!isFirstElement) ? positions[idx - 1] : {end: -1};
    let nextElement = (!isLastElement) ? positions[idx + 1] : {start: strLength};

    positions[idx] = {
      start: previousElement.end + 1,
      end: nextElement.start - 1
    };
  }
}

function _collapseMask(mask) {
  const collapsedMask = [];

  for (let idx = 0; idx < mask.length; idx++) {
    let currentElement = mask[idx];

    if (typeof currentElement === 'string') {
      collapsedMask.push(currentElement);
      continue;
    }

    let lastCollapsedElement = (collapsedMask.length > 0)
      ? collapsedMask[collapsedMask.length - 1] : '';

    let keyObject = {
      key: currentElement[0],
      len: (currentElement.length > 1) ? Number(currentElement[1]) : -1
    };

    if (Array.isArray(lastCollapsedElement)) {
      lastCollapsedElement.push(keyObject);
    }
    else {
      collapsedMask.push([keyObject]);
    }
  }
  return collapsedMask;
}

function _checkMask(mask) {
  const keys = {};

  for (let idx = 0; idx < mask.length; idx++) {
    let currentElement = mask[idx];

    if (typeof currentElement === 'string') {
      continue;
    }

    let key = currentElement[0];
    let valueLength = (currentElement.length > 1) ? currentElement[1] : 0;

    if (key.length === 0) {
      throw new Error(`A key can't be an empty string`);
    }

    if (key in keys) {
      throw new Error(`Found a duplicated key: ${key}`);
    }

    if (Number.isNaN(Number(valueLength))) {
      throw new Error(`Incorrect value length: ${valueLength}`);
    }
    keys[key] = key;
  }
}

function _disassembleMask(mask) {
  const metaSymbols = '{|}';
  const parts = [];
  let currentLevel = 2;
  let part = '';

  for (let idx = 0; idx < mask.length; idx++) {
    let currentSymbol = mask.charAt(idx);

    if (metaSymbols.indexOf(currentSymbol) === -1) {
      part += currentSymbol;
      continue;
    }

    let newLevel = _checkLevel(currentLevel, currentSymbol);

    if (newLevel === INCORRECT_MASK) {
      throw new Error(`Mask has an error at index: ${idx}`);
    }

    if (currentLevel === HIGH_LEVEL && newLevel === LOW_LEVEL) {
      if (part.length > 0) {
        parts.push(part);
      }
      parts.push([]);
    }
    else if (currentLevel === LOW_LEVEL) {
      let lastPart = parts[parts.length - 1];
      lastPart.push(part);
    }

    part = '';
    currentLevel = newLevel;
  }

  if (part.length > 0) {
    parts.push(part);
    part = '';
  }
  return parts;
}

function _checkLevel(currentLevel, currentMetasymbol) {
  let result = currentLevel;

  if (currentMetasymbol === '{' && currentLevel === 2) {
    result = LOW_LEVEL;
  }
  else if (currentMetasymbol === '{' && currentLevel === 1) {
    result = INCORRECT_MASK;
  }
  else if (currentMetasymbol === '}' && currentLevel === 2) {
    result = INCORRECT_MASK;
  }
  else if (currentMetasymbol === '}' && currentLevel === 1) {
    result = HIGH_LEVEL;
  }
  else if (currentMetasymbol === '|' && currentLevel === 2) {
    result = INCORRECT_MASK;
  }
  return result;
}

module.exports = getSubstringsByMask;
