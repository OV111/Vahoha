def split_args(cmd)
  args = []
  current = +""
  in_token = false
  quote = nil
  i = 0
  while i < cmd.length
    c = cmd[i]
    if quote
      if c == quote
        quote = nil
      elsif c == "\\" && quote == '"' && i + 1 < cmd.length && ['"', "\\"].include?(cmd[i + 1])
        i += 1
        current << cmd[i]
      else
        current << c
      end
    elsif c == '"' || c == "'"
      quote = c
      in_token = true
    elsif c == "\\" && i + 1 < cmd.length
      i += 1
      current << cmd[i]
      in_token = true
    elsif c.match?(/\s/)
      if in_token
        args << current
        current = +""
        in_token = false
      end
    else
      current << c
      in_token = true
    end
    i += 1
  end
  raise ArgumentError, "Unclosed quote" if quote

  args << current if in_token
  args
end
