# 📋 Setup Guide - NPM Package Template

Пошаговое руководство по использованию этого шаблона для создания нового npm-пакета.

## 1️⃣ Подготовка проекта

### Клонирование/копирование шаблона

```bash
# Из одной папки в другую
cp -r typography-rules ../my-new-package
cd ../my-new-package
```

## 2️⃣ Обновление информации о пакете

### package.json

```json
{
  "name": "@yalla/my-new-package",           // ← Измените имя пакета
  "description": "What your package does",    // ← Добавьте описание
  "repository": {
    "url": "https://github.com/.../my-new-package"  // ← Обновите URL репозитория
  },
  "keywords": ["keyword1", "keyword2"],       // ← Добавьте ключевые слова
  "author": "Your Name"                       // ← Ваше имя
}
```

### README.md

Обновите содержание README.md с информацией о вашем пакете:
- Описание функциональности
- Примеры использования
- API документация

## 3️⃣ Установка зависимостей

```bash
npm install
```

## 4️⃣ Структура проекта

```
.
├── src/
│   ├── index.ts           ← Главный entry point
│   ├── utils/             ← Утилиты (опционально)
│   └── types.ts           ← Типы TypeScript (опционально)
├── dist/                  ← Сгенерированный вывод (создается при build)
├── package.json           ← Конфигурация пакета
├── tsconfig.json          ← TypeScript config
├── tsconfig.build.json    ← TypeScript config для build
├── tsup.config.ts         ← Tsup bundler config
├── prettier.config.mjs    ← Prettier formatter config
├── .eslintrc.json         ← ESLint config
├── vitest.config.ts       ← Testing config
└── README.md              ← Documentation
```

## 5️⃣ Разработка

### Запуск в режиме разработки с горячей перезагрузкой

```bash
npm run dev
```

### Проверка типов

```bash
npm run type-check
```

### Linting кода

```bash
# Проверка
npm run lint

# Автоматическое исправление
npm run lint:fix
```

### Форматирование кода

```bash
npm run format
```

## 6️⃣ Тестирование

### Запуск тестов

```bash
npm run test
```

### UI для тестов

```bash
npm run test:ui
```

### Создание файла с тестами

Создайте файл `src/example.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { yourFunction } from './index';

describe('yourFunction', () => {
  it('should work correctly', () => {
    const result = yourFunction();
    expect(result).toBeDefined();
  });
});
```

## 7️⃣ Добавление исходного кода

### Основной файл (src/index.ts)

```typescript
/**
 * Описание функции
 * @param param - Параметр
 * @returns Результат
 */
export function yourFunction(param?: string): string {
  return `Hello ${param ?? 'World'}`;
}

// Экспортируйте все public API
export * from './utils';
export type * from './types';
```

### Структурируйте код

```
src/
├── index.ts              ← Main exports
├── core/
│   ├── utils.ts
│   └── helpers.ts
├── types.ts              ← Type definitions
└── constants.ts          ← Constants
```

## 8️⃣ Сборка

### Production build

```bash
npm run build
```

Это создаст:
- `dist/index.js` - CommonJS версия
- `dist/index.mjs` - ES Modules версия
- `dist/index.d.ts` - Type definitions

## 9️⃣ Публикация

### Перед публикацией

1. Проверьте версию в `package.json`
2. Запустите `npm run build`
3. Убедитесь, что все тесты проходят: `npm test`
4. Убедитесь, что нет ошибок lint: `npm run lint`

### Локально

```bash
# Проверить что будет опубликовано
npm pack

# Удалить архив
rm *.tgz
```

### На NPM

```bash
# Логин в NPM (первый раз)
npm login

# Публикация
npm publish

# Для scoped пакета нужно явно указать
npm publish --access public
```

## 🔟 Полезные команды для daily работы

```bash
# Быстрая разработка
npm run dev                    # Watch mode

# Перед commit
npm run lint:fix             # Исправить ошибки
npm run format               # Форматировать код
npm run test                 # Запустить тесты

# Перед публикацией
npm run build                # Собрать
npm run type-check           # Проверить типы
npm test                     # Тесты еще раз
```

## 📝 Советы

1. **Versioning**: Используйте [Semantic Versioning](https://semver.org/)
   - `MAJOR.MINOR.PATCH` (1.2.3)
   - Увеличивайте MAJOR при breaking changes
   - MINOR при новых features
   - PATCH при bug fixes

2. **Exports**: Всегда экспортируйте типы
   ```typescript
   export type { MyType } from './types';
   export { myFunction } from './utils';
   ```

3. **Tree-shaking**: Tsup автоматически оптимизирует output

4. **Документация**: Добавьте JSDoc комментарии
   ```typescript
   /**
    * Описание функции
    * @param name - Имя пользователя
    * @returns Приветствие
    * @example
    * greet('John') // Returns "Hello John"
    */
   export function greet(name: string): string {
     return `Hello ${name}`;
   }
   ```

## ❓ Troubleshooting

### `npm publish` не работает

- Проверьте что вы залогинены: `npm whoami`
- Проверьте что пакет уникален: `npm search @yalla/my-package`
- Проверьте версию в package.json

### Типы не находятся

- Убедитесь что `"types"` поле в package.json указывает на правильный файл
- Проверьте что `dist/index.d.ts` существует после build
- Убедитесь что используется `export type` для типов

### Build не работает

- Удалите node_modules и переустановите: `rm -rf node_modules && npm install`
- Очистите dist: `rm -rf dist`
- Запустите build заново: `npm run build`
