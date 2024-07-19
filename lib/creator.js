import downloadGitRepo from 'download-git-repo';
import { loading } from './util.js';
import { fetchRepoList } from './request.js';
import util from 'util';
import chalk from 'chalk';
import inquirer from 'inquirer';
import fs from 'fs';
import config from './config.js';

class Creator {
  constructor(pluginName, targetDir) {
    this.name = pluginName;
    this.dir = targetDir;
    this.downloadGitRepo = util.promisify(downloadGitRepo);
  }

  ferchRepo() {
    return loading(fetchRepoList, 'waiting for fetch resources');
  }

  fetchTag() {
    const repoList = this.ferchRepo();
    return repoList.then((list) => {
      const tags = list.map((item) => item.name);
      return tags;
    });
  }

  async download(branch) {
    const url = `${config.repoName}#${branch}`;
    await loading(this.downloadGitRepo, 'downloading...', url, this.dir);
    console.log(chalk.green('download success'))
  }

  async rename({pluginNickname, author}) {
    // 修改
    const utilsPath = `${this.dir}/bootstrap.php`;
    const utilsContent = fs.readFileSync(utilsPath, 'utf-8');
    const newUtilsContent = utilsContent.replace(/plugin_identifier/g, this.name);
    fs.writeFileSync(utilsPath, newUtilsContent);
    // 修改discuz_plugin.xml 中 plugin_identifier 为 this.name
    const xmlPath = `${this.dir}/discuz_plugin_plugin_identifier.xml`;
    const xmlContent = fs.readFileSync(xmlPath, 'utf-8');
    const newXmlContent = xmlContent
      .replace(/plugin_identifier/g, this.name)
      .replace(/plugin_nickname/g, pluginNickname)
      .replace(/plugin_copyright/g, author);
    fs.writeFileSync(xmlPath, newXmlContent);
    // 修改discuz_plugin.xml文件名为 discuz_plugin_${this.name}.xml
    const newXmlPath = `${this.dir}/discuz_plugin_${this.name}.xml`;
    fs.renameSync(xmlPath, newXmlPath);
    // 修改discuz_plugin.inc.php文件名为 ${this.name}.inc.php
    const puginIncPath = `${this.dir}/plugin_identifier.inc.php`;
    const newPuginIncPath = `${this.dir}/${this.name}.inc.php`;
    fs.renameSync(puginIncPath, newPuginIncPath);
  }

  async create() {
    const branches = await this.ferchRepo();
    const { curBranch, pluginNickname, author } = await inquirer.prompt([
      {
        type: "input",
        name: "pluginNickname",
        message: "输入插件名称",
      },
      {
        type: "input",
        name: "author",
        message: "输入作者名称",
      },
      {
        type: 'list',
        name: 'curBranch',
        message: '选择一个分支',
        choices: branches
          .filter((item) => item.name !== 'main')
          .map((item) => item.name),
      },
    ]);
    await this.download(curBranch);
    await this.rename({pluginNickname,author});
  }
}

export default Creator;