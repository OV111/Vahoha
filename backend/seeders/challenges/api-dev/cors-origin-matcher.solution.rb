def is_origin_allowed(origin, allow_list)
  return false unless origin.is_a?(String) && !origin.empty?

  allow_list.any? do |entry|
    next true if entry == "*"

    star = entry.index("*.")
    next entry == origin if star.nil?

    prefix = entry[0...star]
    suffix = entry[(star + 1)..]
    next false if origin.length < prefix.length + suffix.length
    next false unless origin.start_with?(prefix) && origin.end_with?(suffix)

    origin[prefix.length...(origin.length - suffix.length)].match?(/\A[a-z0-9-]+(\.[a-z0-9-]+)*\z/i)
  end
end
