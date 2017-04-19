const fs = require('fs');
const path = require('path');
const paths = require('./paths');

const projectScriptDirs = {};

const getDirectories = (srcpath) => {
  return fs.readdirSync(srcpath).filter((file) => {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
};

getDirectories(path.join(paths.src)).map((dir) => {
  projectScriptDirs[dir] = path.join(paths.src, dir);
  return null;
});

const aliases = {
  projectRoot: paths.projectRoot,
  projectSrcRoot: paths.src,
  nodeRoot: path.join(paths.projectRoot, 'node_modules'),
  resolveAlias: Object.assign({
    src: paths.src,
    projectBase: paths.projectBase
  }, projectScriptDirs)
};

module.exports = aliases;
