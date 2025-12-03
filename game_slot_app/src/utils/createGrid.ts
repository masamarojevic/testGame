export function generate3x3Grid(icons: string[]): string[][] {
  const rows: number = 3;
  const cols: number = 3;
  const grid: string[][] = [];

  //za vsak i v rows naredi array in za vsak j v cols daj sliko
  for (let i = 0; i < rows; i++) {
    let row: string[] = [];
    for (let j = 0; j < cols; j++) {
      const rndIcon = icons[Math.floor(Math.random() * icons.length)];
      row.push(rndIcon);
    }
    grid.push(row);
  }
  return grid;
}
