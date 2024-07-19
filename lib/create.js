import path from 'path';
import Creator from './creator.js';

const create = async (pluginName, options, cmd) => {
  const cwd = process.cwd();
  const targetDir = path.join(cwd, pluginName);
  const creator = new Creator(pluginName, targetDir);
  await creator.create();
};

export default create