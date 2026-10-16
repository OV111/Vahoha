export default {
  slug: "role-based-access-control",
  trackId: "mern",
  layerId: "mern-7",
  type: "CODE",
  difficulty: "hard",
  title: "Role-based access control with inheritance and ownership",
  summary:
    "Decide whether a user may perform an action, with inherited roles, wildcards and 'own resource' rules.",
  description:
    "Authentication says who you are; authorization says what you may do. Real apps give roles that build on each other (an admin can do everything an editor can) and rules such as 'editors may update only their own posts'. Getting inheritance and ownership right in one function is the core of every permission system.",
  task:
    "Write <code>createAuthorizer({ roles })</code> returning <code>{ can(user, action, resource) }</code>. <code>roles</code> maps a role name to <code>{ inherits: [roleNames], can: [permissions] }</code> (both optional). A permission is a string: an exact action like <code>'posts:read'</code>, a wildcard <code>'posts:*'</code> (any action that starts with <code>posts:</code>), or <code>'*'</code> (everything). Appending <code>:own</code> (for example <code>'posts:update:own'</code>) means the permission only applies when <code>resource.ownerId === user.id</code>. <code>can(user, action, resource)</code> is true if any permission of any of <code>user.roles</code>, including everything inherited transitively, matches. Role names the user has but that are not defined are ignored.",
  constraints: [
    "Validate when creating: throw <code>Error('Unknown role: NAME')</code> if a role inherits an undefined role, and <code>Error('Role cycle: a -&gt; b -&gt; a')</code> if inheritance loops (path starts at the first repeated role).",
    "An <code>:own</code> permission needs a resource with an <code>ownerId</code>; with no resource it never matches.",
    "Wildcards combine with <code>:own</code>, as in <code>'posts:*:own'</code>.",
    "<code>can</code> returns exactly <code>true</code> or <code>false</code>.",
  ],
  example: `const authz = createAuthorizer({ roles: {
  viewer: { can: ['posts:read'] },
  editor: { inherits: ['viewer'], can: ['posts:create', 'posts:update:own'] },
  admin:  { inherits: ['editor'], can: ['*'] },
} });
authz.can({ id: 1, roles: ['editor'] }, 'posts:update', { ownerId: 1 }); // true
authz.can({ id: 1, roles: ['editor'] }, 'posts:update', { ownerId: 2 }); // false`,
  tags: ["authorization","rbac","security","graphs"],
  estimatedMins: 45,
  xp: 75,
  starterFiles: [
    {
      name: "createAuthorizer.js",
      lang: "js",
      code: `// createAuthorizer.js
function createAuthorizer({ roles }) {
  // your code here
}

module.exports = createAuthorizer;`,
    },
  ],
  testFile: {
    name: "createAuthorizer_test.js",
    lang: "test",
    code: `// createAuthorizer_test.js
const createAuthorizer = require('./createAuthorizer');

test('exact_permissions', () => {
  // see the hidden tests for the full checks
  expect(typeof createAuthorizer).toBe('function');
});`,
  },
  hints: [
    {
      order: 1,
      cost: 0,
      text: "At creation, compute each role's full permission list once with a depth-first walk: keep a <code>path</code> array to detect a cycle and a <code>done</code> map to reuse results. Throw the documented errors while walking.",
    },
    {
      order: 2,
      cost: 5,
      text: "Parse each permission into <code>{ pattern, own }</code> by checking <code>endsWith(':own')</code>. A pattern matches an action if it is <code>'*'</code>, equals the action, or ends with <code>':*'</code> and the action starts with everything before the star.",
    },
    {
      order: 3,
      cost: 10,
      text: "In <code>can</code>, collect permissions across the user's roles and return true if some permission matches the action and (it is not <code>own</code>, or <code>resource.ownerId === user.id</code>). A broader permission simply matches on its own, so it wins over the restricted one.",
    },
  ],
  hiddenTests: [
    {
      name: "exact_permissions",
      code: `const a = createAuthorizer({ roles: { viewer: { can: ['posts:read'] } } });
const u = { id: 1, roles: ['viewer'] };
assert(a.can(u, 'posts:read') === true, 'granted');
assert(a.can(u, 'posts:delete') === false, 'not granted');
assert(a.can(u, 'posts:readall') === false, 'exact means exact');`,
    },
    {
      name: "wildcards",
      code: `const a = createAuthorizer({ roles: { mod: { can: ['comments:*'] }, root: { can: ['*'] } } });
assert(a.can({ id: 1, roles: ['mod'] }, 'comments:delete') === true, 'namespace wildcard');
assert(a.can({ id: 1, roles: ['mod'] }, 'comments:a:b') === true, 'deeper actions');
assert(a.can({ id: 1, roles: ['mod'] }, 'posts:read') === false, 'other namespace');
assert(a.can({ id: 1, roles: ['mod'] }, 'comments') === false, 'the bare namespace is not matched by comments:*');
assert(a.can({ id: 1, roles: ['root'] }, 'anything:at:all') === true, 'star matches everything');`,
    },
    {
      name: "inheritance_is_transitive",
      code: `const a = createAuthorizer({ roles: {
  viewer: { can: ['posts:read'] },
  editor: { inherits: ['viewer'], can: ['posts:create'] },
  admin: { inherits: ['editor'], can: ['users:*'] },
} });
const admin = { id: 1, roles: ['admin'] };
assert(a.can(admin, 'posts:read') && a.can(admin, 'posts:create') && a.can(admin, 'users:ban'), 'admin has everything below it');
assert(a.can({ id: 2, roles: ['editor'] }, 'users:ban') === false, 'editor does not get admin permissions');`,
    },
    {
      name: "own_permissions_need_matching_owner",
      code: `const a = createAuthorizer({ roles: { editor: { can: ['posts:update:own'] } } });
const u = { id: 7, roles: ['editor'] };
assert(a.can(u, 'posts:update', { ownerId: 7 }) === true, 'own resource');
assert(a.can(u, 'posts:update', { ownerId: 8 }) === false, 'someone else\\'s resource');
assert(a.can(u, 'posts:update') === false, 'no resource means no match');
assert(a.can(u, 'posts:update', {}) === false, 'a resource without an owner never matches');`,
    },
    {
      name: "wildcard_with_own",
      code: `const a = createAuthorizer({ roles: { author: { can: ['posts:*:own'] } } });
const u = { id: 3, roles: ['author'] };
assert(a.can(u, 'posts:delete', { ownerId: 3 }) === true, 'any posts action on own resources');
assert(a.can(u, 'posts:delete', { ownerId: 4 }) === false, 'but not on others');`,
    },
    {
      name: "a_broader_permission_wins_over_an_own_restriction",
      code: `const a = createAuthorizer({ roles: {
  editor: { can: ['posts:update:own'] },
  admin: { inherits: ['editor'], can: ['posts:update'] },
} });
assert(a.can({ id: 1, roles: ['admin'] }, 'posts:update', { ownerId: 99 }) === true, 'admin can update anyone\\'s post');
assert(a.can({ id: 1, roles: ['editor'] }, 'posts:update', { ownerId: 99 }) === false, 'editor still cannot');`,
    },
    {
      name: "multiple_roles_and_unknown_roles",
      code: `const a = createAuthorizer({ roles: { a: { can: ['x:one'] }, b: { can: ['x:two'] } } });
const u = { id: 1, roles: ['a', 'b', 'ghost'] };
assert(a.can(u, 'x:one') && a.can(u, 'x:two'), 'permissions from every role apply');
assert(a.can({ id: 1, roles: ['ghost'] }, 'x:one') === false, 'an unknown role grants nothing');
assert(a.can({ id: 1, roles: [] }, 'x:one') === false, 'no roles, no permissions');
assert(a.can({ id: 1 }, 'x:one') === false, 'a user without a roles array has nothing');`,
    },
    {
      name: "validation_of_the_role_graph",
      code: `let e1 = null; let e2 = null; let e3 = null;
try { createAuthorizer({ roles: { a: { inherits: ['nope'] } } }); } catch (e) { e1 = e; }
try { createAuthorizer({ roles: { a: { inherits: ['b'] }, b: { inherits: ['a'] } } }); } catch (e) { e2 = e; }
try { createAuthorizer({ roles: { a: { inherits: ['a'] } } }); } catch (e) { e3 = e; }
assert(e1 && e1.message === 'Unknown role: nope', 'got ' + (e1 && e1.message));
assert(e2 && e2.message === 'Role cycle: a -> b -> a', 'got ' + (e2 && e2.message));
assert(e3 && e3.message === 'Role cycle: a -> a', 'got ' + (e3 && e3.message));`,
    },
    {
      name: "diamond_inheritance_is_not_a_cycle",
      code: `const a = createAuthorizer({ roles: {
  base: { can: ['x:read'] },
  left: { inherits: ['base'] }, right: { inherits: ['base'] },
  top: { inherits: ['left', 'right'] },
} });
assert(a.can({ id: 1, roles: ['top'] }, 'x:read') === true, 'a shared ancestor is fine');`,
    },
  ],
  solution: {
    code: `function createAuthorizer({ roles }) {
  const resolved = new Map();

  function resolve(name, path) {
    if (resolved.has(name)) return resolved.get(name);
    if (!Object.prototype.hasOwnProperty.call(roles, name)) throw new Error('Unknown role: ' + name);
    const at = path.indexOf(name);
    if (at !== -1) throw new Error('Role cycle: ' + path.slice(at).concat(name).join(' -> '));
    const def = roles[name] || {};
    const perms = [];
    for (const parent of def.inherits || []) perms.push(...resolve(parent, path.concat(name)));
    for (const p of def.can || []) {
      const own = p.endsWith(':own');
      perms.push({ pattern: own ? p.slice(0, -4) : p, own });
    }
    resolved.set(name, perms);
    return perms;
  }

  for (const name of Object.keys(roles)) resolve(name, []);

  const matches = (pattern, action) => {
    if (pattern === '*' || pattern === action) return true;
    if (pattern.endsWith(':*')) return action.startsWith(pattern.slice(0, -1));
    return false;
  };

  return {
    can(user, action, resource) {
      for (const roleName of (user && user.roles) || []) {
        const perms = resolved.get(roleName);
        if (!perms) continue;
        for (const perm of perms) {
          if (!matches(perm.pattern, action)) continue;
          if (!perm.own) return true;
          if (resource && resource.ownerId !== undefined && resource.ownerId === user.id) return true;
        }
      }
      return false;
    },
  };
}

module.exports = createAuthorizer;`,
    explanation:
      "Doing the hard graph work once, at creation, keeps can() a simple loop. The resolver is the same depth-first walk used for dependency graphs: the path array catches cycles (and reports them from the first repeated role), the resolved map memoises so a diamond-shaped hierarchy is not mistaken for a cycle and is not recomputed, and unknown parents fail fast at startup instead of silently granting nothing at request time. Permissions are parsed into a pattern and an own flag, and matching is deliberately tiny: star, exact, or a namespace prefix ending in ':*', where keeping the colon in the prefix is what stops 'comments:*' from matching a bare 'comments'. Ownership is checked only for :own permissions, and any matching permission without :own returns true immediately, which is why a broader grant overrides a narrower one without special code.",
  },
};
