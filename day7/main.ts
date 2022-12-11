const input = await Deno.readTextFile("input.txt");

const lines = input.split("\n").map((line) => line.trim());

type File = { name: string, size: number };

type TreeNode = {
  // deno-lint-ignore no-explicit-any
  [key: string]: any
  children?: TreeNode[]
  files?: File[]
}

const dirTree: TreeNode = {};

const currentDir = ["/"];

let size = 0;

lines.forEach((line) => {
  const termPrompt = line.split(" ");

  if (termPrompt[0] === "$") {
    switch (termPrompt[1]) {
      case "cd":
        switch (termPrompt[2]) {
          case "/":
            break;
          case "..":
            currentDir.pop();
            break;
          default:
            currentDir.push(termPrompt[2]);
            break;
        }
        break;
      case "ls":
        break;
      default:
        break;
    }
  } else {

    if (termPrompt[0] === "dir") {
      let currentDirTree = dirTree;
      currentDir.forEach((dir) => {
        if (currentDirTree[dir] === undefined) {
          currentDirTree[dir] = {};
        }
        currentDirTree = currentDirTree[dir];
      });

      currentDirTree.children = currentDirTree.children || [];
      currentDirTree.children.push({ key: termPrompt[1] });

    } else {
      // add file to current dir
      let currentDirTree = dirTree;

      // get to current dir
      currentDir.forEach((dir) => {
        if (currentDirTree[dir] === undefined) {
          currentDirTree[dir] = {};
        }
        currentDirTree = currentDirTree[dir];
      });

      // add file to current dir
      currentDirTree.files = currentDirTree.files || [];
      currentDirTree.files.push({ name: termPrompt[1], size: parseInt(termPrompt[0]) });
    }

  }
});

const getDirSize = (dir: TreeNode): number => {
  let dirSize = 0;
  if (dir.files) {
    dirSize += dir.files.reduce((acc, file) => acc + file.size, 0);
  }

  if (dir.children) {
    dir.children.forEach((child) => {
      dirSize += getDirSize(dir[child.key]);
    });
  }

  return dirSize;
}

const traverseDir = (dir: TreeNode, key: string): TreeNode[] => {
  let dirs: TreeNode[] = [];

  if (dir.children) {
    dir.children.forEach((child) => {
      dirs = dirs.concat(traverseDir(dir[child.key], `${key}/${child.key}`.replace("//", "/")));
    });
  }

  const dirSize = getDirSize(dir);
  console.log(key, dirSize)
  if (dirSize <= 100000) {
    dirs.push(dir);
    size += dirSize;
  }

  if (70000000 - diskSize + dirSize > 30000000 && dirSize < sizeDeleted) {
    sizeDeleted = dirSize;
  }

  return dirs;
}

let sizeDeleted = 70000000;

const diskSize = getDirSize(dirTree["/"]);

const _dirs = traverseDir(dirTree["/"], "/");

console.log("total size", size);
console.log("size deleted", sizeDeleted);