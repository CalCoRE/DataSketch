# Utilities
# =========

# Provides generic utility functions.

define (require) ->
  $ = require 'jquery'

  Utils = {
    
# `ensureDefaults(data, defaults)`

# Merges `defaults` into `data` and returns the result. Neither object is
# modified in the process.
    
    ensureDefaults: (data, defaults) ->
      $.extend(true, {}, defaults, data)

    
# `validateString(string, validaiton)`

# Tests a string against the provided validation. Validation can be of three
# types:
    
    validateString: (string, validation) ->
      if typeof string isnt 'string'
        throw new Error('Object to be validated is not a string.')

      switch typeof validation
        when 'string'
          
# * string: basic equality is used to test the string.
          
          return string == validation
        when 'function'
          
# * function: the function is called, with the test string passed as
#   the only argument.
          
          return validation(string)
        when 'object'
          if validation instanceof RegExp
# * regex: the regex test method is run on the test string.
            return validation.test(string)
      

# If the validation is none of these, or if the test string itself is not
# actually a string, then the validation will return `null`.
      
      throw new Error('Validation is not acceptable type.')

    
# `guid4()`

# Generates a random uuid.
    
    guid4: () ->
      'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace /[xy]/g, (c) ->
        r = Math.floor(Math.random()*16)
        v = if c == 'x' then r else (r & 0x3 | 0x8)
        return v.toString(16)

    
# `guidReString()`

# Returns a string for use in regular expressions to match a guid.
# A regular expression itself is not returned, as the string may be needed
# in conjunction with other components of a RegExp.
    
    guidReString: () ->
      "[A-Fa-f0-9]{8}-(?:[A-Fa-f0-9]{4}-){3}[A-Fa-f0-9]{12}"

    
# `slugify(str)`

# Converts a string to a slug format, replacing whitespace with underscores
# and removing any non-alphanumeric characters
    
    slugify: (str) ->
      str.toLowerCase().replace(/\s+/g, '_').replace(/[^\w]/g, '')

    
# `promiseErrorHandler(Error e)`

# Provides a uniform way of handling errors that arise from promises.
    
    promiseErrorHandler: (e) ->
      console.log e.message, e.stack

    promiseRequire: (paths) ->
      if !(paths instanceof Array)
        paths = [paths]
      new Promise (resolve, reject) ->
        require paths, () ->
          resolve arguments
        , (err) ->
          reject err
    
# `posMod(x, n)`

# Mathematical mod is always positive, and the value of -1 % 5 should be 4.
# JavaScript (and most other programming languages) return a negative number
# (in the previous example, -1 % 5 = -1). Often times, particularly when
# cycling through an array of items, you want to use the positive mod value,
# which this method provides.
    
    posMod: (x, n) ->
      while x < 0
        x += n
      x % n

    isEmpty: (a) ->
      !a? or
        (a instanceof Array and a.length == 0) or
        ((typeof a == "string" or a instanceof String) and a == '')

    
# `sortValue(a, b, ascending = true)`

# Provides a default numeric value for use in sort callbacks. Note that a and
# b need to be comparable via the default `<` and `>` interpretations.
    
    sortValue: (a, b, ascending = true) ->
      if !a? and !b?
        val = 0
      else if !a?
        val = 1
      else if !b?
        val = -1
      else
        val = if a > b then 1 else (if a < b then -1 else 0)
      if !ascending
        val = val * -1
      val

# `sortValueIgnoreArticles(a, b, ascending = true)`

# Provides a default numeric value for use in sort callbacks. Unlike
# `Utils.sortValue`, this method will detect strings and will ignore initial
# "the" or "a" in the strings, allowing for easy comparison of titles.
    
    sortValueIgnoreArticles: (a, b, ascending = true) ->
      if typeof a == "string" or a instanceof String
        a = a.replace(/^((the)|a)\s+/i, "")
      if typeof b == "string" or b instanceof String
        b = b.replace(/^((the)|a)\s+/i, "")
      Utils.sortValue a, b, ascending

    zeropad: (str, size) =>
      s = str + ""
      while s.length < size
        s = "0" + s
      s
  }