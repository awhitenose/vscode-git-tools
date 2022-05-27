import * as vscode from 'vscode';
import { GitExtension } from './git';

export function activate(context: vscode.ExtensionContext) {
	const gitExtension = vscode.extensions.getExtension<GitExtension>('vscode.git')?.exports;
	const git = gitExtension?.getAPI(1);
	if (git) {
		let gitStageCommand = vscode.commands.registerCommand('explorerGitTools.gitStage', async (arg) => {
			let repo = git.repositories[0];
			if (repo) {
				repo.add([arg.path]);
			}
		});
		context.subscriptions.push(gitStageCommand);
		let gitUnstageCommand = vscode.commands.registerCommand('explorerGitTools.gitUnstage', async (arg) => {
			let repo = git.repositories[0];
			if (repo) {
				repo.revert([arg.path]);
			}
		});
		context.subscriptions.push(gitUnstageCommand);
	}	
}

export function deactivate() {}
