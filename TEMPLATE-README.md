# NPM Package Template - Quick Reference

> This is your reusable template for creating npm packages with TypeScript, ESLint, Prettier, and Vitest.

## 🚀 Quick Start for New Packages

### Option 1: Use the setup script (Recommended)

**On Windows:**
```bash
./setup-new-package.bat "my-awesome-package"
cd my-awesome-package
npm install
npm run dev
```

**On macOS/Linux:**
```bash
bash setup-new-package.sh "my-awesome-package"
cd my-awesome-package
npm install
npm run dev
```

### Option 2: Manual copy

1. Copy the entire `package-template` folder
2. Rename it to your package name
3. Update `package.json` with your package details
4. Update `README.md` with your package description
5. Run `npm install`

## 📁 What's Included

```
✅ TypeScript configuration (tsconfig.json)
✅ Build tool (tsup for ESM + CJS)
✅ Code formatting (Prettier)
✅ Linting (ESLint with TypeScript support)
✅ Testing framework (Vitest)
✅ Editor config (.editorconfig)
✅ NPM configuration (.npmrc)
✅ Git configuration (.gitignore)
✅ Scripts for development workflow
✅ Sample code and tests
```

## 📝 Important Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Project metadata and dependencies |
| `tsconfig.json` | TypeScript compiler options |
| `tsup.config.ts` | Build configuration |
| `.eslintrc.json` | Linting rules |
| `prettier.config.mjs` | Code formatting rules |
| `vitest.config.ts` | Testing configuration |

## 📖 Key npm Scripts

```bash
npm run dev           # Development mode with watch
npm run build         # Build for production
npm run lint          # Check code style
npm run lint:fix      # Auto-fix code style
npm run format        # Format code with Prettier
npm run type-check    # TypeScript type checking
npm run test          # Run unit tests
npm run test:ui       # Interactive test UI
```

## 🔄 Workflow

1. **Development**
   ```bash
   npm run dev
   # Your code is watched and rebuilt automatically
   ```

2. **Before commit**
   ```bash
   npm run lint:fix
   npm run format
   npm test
   ```

3. **Build for production**
   ```bash
   npm run build
   ```

4. **Publish to NPM**
   ```bash
   npm publish
   ```

## 📦 What Gets Published to NPM

Only files in the `dist/` directory and metadata files (package.json, README.md, LICENSE) are published.

Configuration is controlled by `.npmignore` file.

## 🎯 Default Configuration Highlights

- **TypeScript**: Strict mode enabled for type safety
- **Modules**: Outputs both ES Modules and CommonJS
- **Node Target**: ES2022
- **Formatting**: Tabs, 100 char line width
- **Testing**: Global vitest API, node environment
- **Code Style**: TypeScript ESLint with sensible defaults

## 📚 For More Details

See [SETUP.md](./SETUP.md) for detailed step-by-step instructions and troubleshooting.

## 💡 Tips

1. Always update the `name` field in package.json for new packages
2. Keep your version in sync with semantic versioning (MAJOR.MINOR.PATCH)
3. Use meaningful commit messages
4. Write tests for your code
5. Document your API with JSDoc comments

## 📄 License

MIT
