SATISFIES_VERSION = /\A(\d+)\.(\d+)\.(\d+)(-[0-9A-Za-z.-]+)?(\+[0-9A-Za-z.-]+)?\z/
WILDCARDS = ["", "x", "X", "*"].freeze

def parse_partial(text)
  parts = text.split(".", -1)
  raise ArgumentError, "Invalid range: #{text}" if parts.length > 3

  nums = []
  parts.each do |part|
    break if WILDCARDS.include?(part)
    raise ArgumentError, "Invalid range: #{text}" unless part.match?(/\A\d+\z/)

    nums << part.to_i
  end
  nums
end

def within(v, lo, hi)
  (v <=> lo) >= 0 && (v <=> hi).negative?
end

def comparator(token)
  op = token[/\A(\^|~|>=|<=|>|<|=)/] || ""
  nums = parse_partial(token[op.length..])
  return ->(_v) { true } if nums.empty?

  lo = (nums + [0, 0, 0]).first(3)

  if op == "^"
    hi = if nums[0].positive? || nums.length == 1
           [nums[0] + 1, 0, 0]
         elsif nums[1].positive? || nums.length == 2
           [0, nums[1] + 1, 0]
         else
           [0, 0, nums[2] + 1]
         end
    return ->(v) { within(v, lo, hi) }
  end
  if ["~", "", "="].include?(op)
    return ->(v) { v == lo } if nums.length == 3 && op != "~"

    hi = nums.length == 1 ? [nums[0] + 1, 0, 0] : [nums[0], nums[1] + 1, 0]
    return ->(v) { within(v, lo, hi) }
  end
  raise ArgumentError, "Operator #{op} needs a full version: #{token}" unless nums.length == 3

  case op
  when ">=" then ->(v) { (v <=> lo) >= 0 }
  when "<=" then ->(v) { (v <=> lo) <= 0 }
  when ">" then ->(v) { (v <=> lo).positive? }
  else ->(v) { (v <=> lo).negative? }
  end
end

def satisfies(version, range)
  match = SATISFIES_VERSION.match(version)
  raise ArgumentError, "Invalid version: #{version}" unless match
  return false if match[4]

  v = match[1..3].map(&:to_i)
  # "".split returns [] in Ruby, but an empty range is one alternative that allows anything.
  alternatives = range.split("||", -1)
  alternatives = [""] if alternatives.empty?
  alternatives.any? do |alternative|
    alternative.split.all? { |token| comparator(token).call(v) }
  end
end
