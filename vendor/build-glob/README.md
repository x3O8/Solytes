# Build glob adapter

The root npm override replaces `fast-glob` with this local adapter.
`vite-plugin-dynamic-import` is its sole upstream consumer in this dependency tree
and uses `sync(patterns, { cwd })` to discover source imports.
The adapter delegates this call to maintained `tinyglobby`, with directory expansion
disabled to preserve fast-glob's file-only behavior.

This removes `fast-glob → micromatch → braces` and the unpatched
GHSA-vfj7-8cjw-p6xm parser from the dependency tree. It does not rename, vendor or
suppress an affected copy of braces. Unsupported options fail the build explicitly.
Glob length, nesting and pattern count are bounded before parsing.

This is not a general-purpose fast-glob replacement. When updating the upstream
plugin or adding any other fast-glob consumer, verify callers use this interface
and run `npm run test:security`, the production build, and `npm audit`
(including development dependencies).

Vite also embeds a brace parser in its file watcher. Its default
`disableGlobbing: true` keeps that parser inactive; the security tests verify this
against the installed Vite server with deeply nested brace input. Keep watch paths
literal rather than enabling glob watches.
