# 📋 New Package Creation Checklist

Use this checklist when creating a new npm package from the template.

## Pre-Setup

- [ ] Decide on package name (e.g., `@yalla/my-package`)
- [ ] Create GitHub repository (if needed)
- [ ] Decide on package scope and namespace

## Using Setup Script (Recommended)

### Windows
```bash
.\setup-new-package.bat "my-package-name"
cd my-package-name
npm install
```

### macOS/Linux
```bash
bash setup-new-package.sh "my-package-name"
cd my-package-name
npm install
```

## Manual Setup

### 1. Create Package Directory
- [ ] Copy template to new location: `cp -r package-template my-new-package`
- [ ] Navigate to new package: `cd my-new-package`

### 2. Update package.json
- [ ] Update `"name"` field to `@yalla/my-new-package`
- [ ] Update `"description"` with package description
- [ ] Update `"repository.url"` with GitHub URL
- [ ] Update `"homepage"` with GitHub URL
- [ ] Update `"bugs.url"` with GitHub URL
- [ ] Add `"keywords"` relevant to your package

### 3. Update Documentation
- [ ] Replace [README.md](README.md) with your package documentation
- [ ] Update installation example with your package name
- [ ] Add usage examples
- [ ] Add feature list
- [ ] Update author name in LICENSE

### 4. Initial Setup
- [ ] Run `npm install` to install dependencies
- [ ] Verify everything works: `npm run build`
- [ ] Run tests: `npm test`

### 5. Start Development
- [ ] Run `npm run dev` for development mode
- [ ] Create your code in `src/`
- [ ] Write tests in `src/*.test.ts`
- [ ] Export public API from `src/index.ts`

## During Development

- [ ] Write JSDoc comments for all public functions
- [ ] Add unit tests for your code
- [ ] Keep TypeScript strict
- [ ] Use type exports for types: `export type { MyType }`
- [ ] Run `npm run lint:fix` before commits
- [ ] Run `npm run format` before commits

## Before Publishing

### Final Checks
- [ ] Update version in `package.json` (follow semantic versioning)
- [ ] Run `npm run build` - should complete without errors
- [ ] Run `npm run test` - all tests should pass
- [ ] Run `npm run lint` - no linting errors
- [ ] Run `npm run type-check` - no type errors
- [ ] Review `dist/` output contains all necessary files

### Documentation
- [ ] README.md is complete and accurate
- [ ] Examples in README are correct
- [ ] All exported items are documented
- [ ] CHANGELOG.md is updated (if using)

### Git
- [ ] All changes are committed
- [ ] Tag version in git: `git tag v0.0.1`
- [ ] Push to GitHub

### Publishing
- [ ] Logged into npm: `npm whoami`
- [ ] For scoped package, publish as public: `npm publish --access public`
- [ ] Verify package on npmjs.com

## After Publishing

- [ ] Test installation: `npm install @yalla/my-package`
- [ ] Verify types are available
- [ ] Add announcement/release notes if needed
- [ ] Update package documentation with npm link

## Useful npm Commands Reference

```bash
# Development
npm run dev              # Watch mode
npm run build            # Production build
npm run type-check       # TypeScript check

# Code quality
npm run lint             # Check code style
npm run lint:fix         # Auto-fix issues
npm run format           # Format with Prettier

# Testing
npm test                 # Run tests
npm run test:ui          # Interactive test UI

# Publishing
npm publish              # Publish to npm
npm pack                 # Create package tarball (for testing)
```

## Package.json Key Fields

```json
{
  "name": "@yalla/my-package",          // Your package name
  "version": "0.0.1",                    // Follow semver
  "description": "...",                  // Clear description
  "main": "./dist/index.js",             // CommonJS entry
  "module": "./dist/index.mjs",          // ES Module entry
  "types": "./dist/index.d.ts",          // TypeScript types
  "exports": {...},                      // Modern exports
  "files": ["dist", "..."],              // What to publish
  "keywords": [...],                     // For discovery
  "engines": {"node": ">=18"},           // Node version
  "scripts": {...},                      // npm scripts
  "devDependencies": {...}               // Dev tools
}
```

## Common Issues & Solutions

### Build fails with TypeScript errors
- Run `npm install` to ensure dependencies are installed
- Check `tsconfig.json` and `tsconfig.build.json` are correct

### Types not found after build
- Verify `dist/index.d.ts` exists
- Check `tsconfig.build.json` has `"emitDeclarationOnly": true`

### ESLint errors
- Run `npm run lint:fix` to auto-fix common issues
- Check `.eslintrc.json` rules

### Tests don't run
- Verify test files end with `.test.ts` or `.spec.ts`
- Check `vitest.config.ts` configuration

## Next Steps After Template Setup

1. Read [SETUP.md](SETUP.md) for detailed guide
2. Read [TEMPLATE-README.md](TEMPLATE-README.md) for quick reference
3. Start coding in `src/index.ts`
4. Write tests in `src/*.test.ts`
5. Build and test: `npm run build && npm test`
