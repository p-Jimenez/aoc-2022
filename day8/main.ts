const input = await Deno.readTextFile("input.txt");

const grid = input.split("\n").map((line) => line.trim().split("").map((tree) => parseInt(tree)));

let visibleTrees = 0;
let scenicScore = 0;

console.log(grid);

for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    const tree = grid[i][j];

    // if tree is on the edge, it's visible
    if (i === 0 || j === 0 || i === grid.length - 1 || j === grid[i].length - 1) {
      visibleTrees++;
      continue;
    }

    // if any cardinal surrounding trees between edge and tree are lower than current tree, it's visible

    let north = true;
    let northTrees = 0;
    for (let k = i - 1; k >= 0; k--) {
      northTrees++;
      if (grid[k][j] >= tree) {
        north = false;
        break;
      }
    }

    let south = true;
    let southTrees = 0;
    for (let k = i + 1; k < grid.length; k++) {
      southTrees++;
      if (grid[k][j] >= tree) {
        south = false;
        break;
      }
    }

    let west = true;
    let westTrees = 0;
    for (let k = j - 1; k >= 0; k--) {
      westTrees++;
      if (grid[i][k] >= tree) {
        west = false;
        break;
      }
    }

    let east = true;
    let eastTrees = 0;
    for (let k = j + 1; k < grid[i].length; k++) {
      eastTrees++;
      if (grid[i][k] >= tree) {
        east = false;
        break;
      }
    }

    const score = northTrees * southTrees * westTrees * eastTrees;

    if (score > scenicScore) {
      scenicScore = score;
    }

    if (north || south || west || east) {
      visibleTrees++;
    }

  }
}

console.log(visibleTrees);

console.log(scenicScore);