INTERPOLATION = /\$(\$|\{([A-Za-z_][A-Za-z0-9_]*)(?:(:?[-?])([^}]*))?\})/

def interpolate(template, env)
  template.gsub(INTERPOLATION) do
    escaped = Regexp.last_match(1)
    name = Regexp.last_match(2)
    op = Regexp.last_match(3)
    arg = Regexp.last_match(4)
    next "$" if escaped == "$"

    value = env[name]
    unset = value.nil?
    empty = unset || value == ""
    case op
    when ":-" then empty ? arg : value
    when "-" then unset ? arg : value
    when ":?", "?"
      missing = op == ":?" ? empty : unset
      raise(arg.to_s.empty? ? "#{name} is required" : arg) if missing

      value
    else unset ? "" : value
    end
  end
end
