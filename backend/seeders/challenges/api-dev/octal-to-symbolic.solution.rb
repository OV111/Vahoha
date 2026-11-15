def octal_to_symbolic(mode)
  text = mode.to_s
  return nil unless text.match?(/\A[0-7]{3}\z/)

  text.chars.map do |c|
    d = c.to_i
    ((d & 4).zero? ? "-" : "r") + ((d & 2).zero? ? "-" : "w") + ((d & 1).zero? ? "-" : "x")
  end.join
end
