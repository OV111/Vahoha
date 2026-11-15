SEMVER = /\A(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?(?:\+[0-9A-Za-z.-]+)?\z/

def parse_semver(version)
  match = SEMVER.match(version)
  raise ArgumentError, "Invalid version: #{version}" unless match

  [match[1..3].map(&:to_i), match[4] ? match[4].split(".", -1) : []]
end

def compare_semver(a, b)
  x_nums, x_pre = parse_semver(a)
  y_nums, y_pre = parse_semver(b)
  order = x_nums <=> y_nums
  return order unless order.zero?
  return 0 if x_pre.empty? && y_pre.empty?
  return 1 if x_pre.empty?
  return -1 if y_pre.empty?

  x_pre.zip(y_pre).each do |p, q|
    break if q.nil?

    p_num = p.match?(/\A\d+\z/)
    q_num = q.match?(/\A\d+\z/)
    if p_num && q_num
      order = p.to_i <=> q.to_i
      return order unless order.zero?
    elsif p_num
      return -1
    elsif q_num
      return 1
    elsif p != q
      return p < q ? -1 : 1
    end
  end
  x_pre.length <=> y_pre.length
end
