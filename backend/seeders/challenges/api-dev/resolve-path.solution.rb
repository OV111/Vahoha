def resolve_path(cwd, target, home = "/home/user")
  path = target
  path = home + path[1..] if path == "~" || path.start_with?("~/")
  path = "#{cwd}/#{path}" unless path.start_with?("/")
  parts = []
  path.split("/").each do |segment|
    next if segment.empty? || segment == "."

    if segment == ".."
      parts.pop
    else
      parts << segment
    end
  end
  "/" + parts.join("/")
end
