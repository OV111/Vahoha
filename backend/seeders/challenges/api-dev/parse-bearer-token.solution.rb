def parse_bearer(header)
  return nil unless header.is_a?(String)

  match = %r{\ABearer +([A-Za-z0-9\-._~+/]+=*)\z}i.match(header.strip)
  match && match[1]
end
