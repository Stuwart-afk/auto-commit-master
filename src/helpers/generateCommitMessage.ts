
type CommitType =
   | 'feat'
   | 'fix'
   | 'docs'
   | 'refactor'
   | 'perf'
   | 'test'
   | 'build'
   | 'ci'
   | 'chore';

const getCommitType = (fileName: string, action?: string): CommitType => {
   const name = fileName.toLowerCase();

   // Documentation
   if (
      name.endsWith('.md') ||
      name.endsWith('.mdx') ||
      name.includes('license')
   ) {
      return 'docs';
   }

   // Tests
   if (
      name.includes('.test.') ||
      name.includes('.spec.') ||
      name.includes('__tests__')
   ) {
      return 'test';
   }

   // Build and dependency files
   if (
      name === 'package.json' ||
      name === 'yarn.lock' ||
      name === 'package-lock.json' ||
      name === 'webpack.config.js' ||
      name === 'tsconfig.json'
   ) {
      return 'build';
   }

   // CI configuration
   if (
      name.includes('.github/') ||
      name.includes('.gitlab-ci')
   ) {
      return 'ci';
   }

   // Infer from file action
   switch (action?.toLowerCase()) {
      case 'add':
         return 'feat';
      case 'update':
         return 'refactor';
      case 'delete':
         return 'chore';
      default:
         return 'chore';
   }
};

const getScope = (file: string): string | undefined => {
   const normalized = file.replace(/\\/g, '/');
   const parts = normalized.split('/').filter(Boolean);

   if (parts.length < 2) {
      return undefined;
   }

   const directory = parts[parts.length - 2];

   return directory
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '-');
};

export const generateCommitMessage = (
   file: string,
   action?: string
): string => {
   const fileName = file
      .replace(/\\/g, '/')
      .split('/')
      .pop()
      ?.replace(/^[_-]+/, '') || 'changes';

   const type = getCommitType(file, action);
   const scope = getScope(file);

   let description = 'update';

   switch (action?.toLowerCase()) {
      case 'add':
         description = 'add';
         break;
      case 'update':
         description = 'update';
         break;
      case 'delete':
         description = 'remove';
         break;
   }

   const subject = `${description} ${fileName}`;

   return scope
      ? `${type}(${scope}): ${subject}`
      : `${type}: ${subject}`;
};
