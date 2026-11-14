
import * as fs from 'fs';
import * as path from 'path';
import { debug, error as logError, log, warn as logWarn } from './logger';
import { runGit, runGitCapture } from './runGit';
import {
   selectCopilotModel,
   generateCopilotCommitMessage
} from './generateCopilotCommitMessage';

export type FileAction = 'Add' | 'Update' | 'Delete' | 'none';

export interface CommitSingleFileOptions {
   /** Absolute path to the git repository root. */
   repoPath: string;
   /** Repository-relative path of the file. */
   relativePath: string;
   /** Optional stop predicate checked between git invocations. */
   shouldStop?: () => boolean;
}

export interface CommitSingleFileResult {
   committed: boolean;
   action: FileAction;
   message?: string;
   reason?: string;
}

export const findRepoRoot = (filePath: string): string | null => {
   log('findRepoRoot: start', filePath);

   let dir = path.dirname(filePath);
   const { root } = path.parse(dir);
   let steps = 0;

   while (dir !== root) {
      const marker = path.join(dir, '.git');

      if (fs.existsSync(marker)) {
         log('findRepoRoot: resolved', { filePath, repoPath: dir, steps });
         return dir;
      }

      dir = path.dirname(dir);
      steps++;
   }

   log('findRepoRoot: no .git found above', filePath, { steps });
   return null;
};

const classifyStatus = (code: string): FileAction => {
   const x = code[0] ?? ' ';
   const y = code[1] ?? ' ';

   if (x === '?' && y === '?') return 'Add';
   if (x === ' ' && y === 'D') return 'Delete';
   if (x === 'D' && (y === ' ' || y === 'D')) return 'Delete';
   if (x === 'A') return 'Add';
   if (x !== ' ' || y !== ' ') return 'Update';

   return 'none';
};

const detectStatus = async (
   repoPath: string,
   relativePath: string
): Promise<FileAction> => {
   const out = await runGitCapture(
      ['status', '--porcelain', '--', relativePath],
      { cwd: repoPath }
   );

   const firstLine = out
      .split('\n')
      .map((line) => line.trimEnd())
      .find((line) => line.length >= 3);

   if (!firstLine) {
      debug('commitSingleFile.detectStatus: no porcelain entry', {
         repoPath,
         relativePath
      });

      return 'none';
   }

   const action = classifyStatus(firstLine.slice(0, 2));

   debug('commitSingleFile.detectStatus: classified', {
      repoPath,
      relativePath,
      code: firstLine.slice(0, 2),
      action
   });

   return action;
};

export const commitSingleFile = async (
   options: CommitSingleFileOptions
): Promise<CommitSingleFileResult> => {
   const { repoPath, relativePath, shouldStop } = options;

   log('commitSingleFile: start', { repoPath, relativePath });

   const action = await detectStatus(repoPath, relativePath);

   if (action === 'none') {
      return {
         committed: false,
         action,
         reason: 'no-changes'
      };
   }

   if (shouldStop?.()) {
      return {
         committed: false,
         action,
         reason: 'stopped'
      };
   }

   try {
      if (action === 'Delete') {
         await runGit(['rm', '--', relativePath], {
            cwd: repoPath
         });
      } else {
         await runGit(['add', '--', relativePath], {
            cwd: repoPath
         });
      }
   } catch (err) {
      logError('commitSingleFile: staging failed', err);
      throw err;
   }

   if (shouldStop?.()) {
      return {
         committed: false,
         action,
         reason: 'stopped'
      };
   }

   try {
      const model = await selectCopilotModel();

      const message = await generateCopilotCommitMessage(
         repoPath,
         relativePath,
         action,
         model
      );

      if (shouldStop?.()) {
         return {
            committed: false,
            action,
            reason: 'stopped'
         };
      }

      log('commitSingleFile: generated message', {
         relativePath,
         message
      });

      await runGit(['commit', '-m', message], {
         cwd: repoPath
      });

      log('commitSingleFile: success', {
         repoPath,
         relativePath,
         action,
         message
      });

      return {
         committed: true,
         action,
         message
      };
   } catch (err) {
      logError('commitSingleFile: commit failed', {
         repoPath,
         relativePath,
         action,
         err
      });

      throw err;
   }
};
