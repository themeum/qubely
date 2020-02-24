/**
 * Check if two properties are equal or not
 * Check deep equal object|array
 */

export function _equal(value, other) {
    const isEqual = (value, other) => {

        // Get the value type
        const type = Object.prototype.toString.call(value);
    
        // If the two objects are not the same type, return false
        if (type !== Object.prototype.toString.call(other)) return false;
    
        // If items are not an object or array, return false
        if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false;
    
        // Compare the length of the length of the two items
        const valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
        const otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
        if (valueLen !== otherLen) return false;
    
        // Compare two items
        const compare = (item1, item2) => {
    
            // Get the object type
            var itemType = Object.prototype.toString.call(item1);
    
            // If an object or array, compare recursively
            if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
                if (!isEqual(item1, item2)) return false;
            }
    
            // Otherwise, do a simple comparison
            else {
    
                // If the two items are not the same type, return false
                if (itemType !== Object.prototype.toString.call(item2)) return false;
    
                // Else if it's a function, convert to a string and compare
                // Otherwise, just compare
                if (itemType === '[object Function]') {
                    if (item1.toString() !== item2.toString()) return false;
                } else {
                    if (item1 !== item2) return false;
                }
    
            }
        };
    
        // Compare properties
        if (type === '[object Array]') {
            for (var i = 0; i < valueLen; i++) {
                if (compare(value[i], other[i]) === false) return false;
            }
        } else {
            for (var key in value) {
                if (value.hasOwnProperty(key)) {
                    if (compare(value[key], other[key]) === false) return false;
                }
            }
        }
    
        // If nothing failed, return true
        return true;
    
    };
    return isEqual(value, other);
};

/**
 * Object Deep copy 
 */

export function _copy(obj) {
    const cloneObject = (obj) => {
        var clone = {};
        for(var i in obj) {
            if(obj[i] != null &&  typeof(obj[i])=="object")
                clone[i] = cloneObject(obj[i]);
            else
                clone[i] = obj[i];
        }
        return clone;
    }
    return cloneObject(obj)
}

/**
 * Create unit uuid4 
 */
export function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }