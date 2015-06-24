# Set
# ===

# A mathematical set. Sets are similar to arrays, except there is no assumed
# ordering, and they may only contain unique elements.

# TODO: Use this as a polyfill for the ECMA6 Set object.

define (require) ->
  EventDispatcher = require 'core/event/dispatcher'
  
  class Set extends EventDispatcher
    constructor: (elements = []) ->
      @_elements = []
      @addMany elements

    
# Public API
# ----------

# `add(element)`

# Adds the element to the set. If it already exists in the set, no change is
# made.
    
    add: (element) =>
      if not @contains element
        @_elements.push element
        @dispatchEvent 'Set.ElementAdded', { element: element }
      @

    
# `addMany(elements)`

# Adds all members of the provided array of elements to the set.
    
    addMany: (elements) =>
      for elem in elements
        @add elem
      @

    
# `remove(element)`

# Removes the element from the set. If the element was not already there,
# then no change is made.
    
    remove: (element) =>
      if @contains element
        @_elements.splice @_elements.indexOf(element), 1
        @dispatchEvent 'Set.ElementRemoved', { element: element }
      @

    
# `toggle(element)`

# If the element is a memeber of the set, it is removed, and returns false.
# Otherwise, the element is added, and returns true.
    
    toggle: (element) =>
      if @contains element
        @remove element
      else
        @add element
      @contains element

    
# `empty()`

# Removes all elements from the set.
    
    empty: () =>
      @_elements = []

    
# `elements()`

# Returns the elements of the set as an array.
    
    elements: () =>
      @_elements.slice(0)

    
# `contains(element)`

# Returns true if the element is in the set.
    
    contains: (element) =>
      element in @_elements

    
# `intersection(set)`

# Generates a new set containing all of the elements that are in both this
# and the provided set.
    
    intersection: (set) =>
      intersection = new Set
      for element in set.elements()
        if @contains element
          intersection.add element
      intersection

    
# `union(set)`

# Generates a new set containing all of the elements in both this and the
# provided set.
    
    union: (set) =>
      new Set @elements().concat(set.elements())

    
# `difference(set)`

# Generates a new set containing all elements that are in either this or the
# provided set, but not both.
    
    difference: (set) =>
      diff = @union(set)
      for element in @intersection(set).elements()
        diff.remove element
      diff

    
# `complement(set)`

# Generates a new set containing all of the elements that are in this set,
# but not the provided one.
    
    complement: (set) =>
      complement = new Set(@elements())
      for element in @intersection(set).elements()
        complement.remove element
      complement

    
# `isSubsetOf(set)`

# Returns true of this set is contained entirely in the provided set.
    
    isSubsetOf: (set) =>
      @elements().length == @intersection(set).elements().length

    equals: (set) =>
      @isSubsetOf(set) && set.isSubsetOf(@)

    cardinality: () =>
      @elements().length