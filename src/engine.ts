export class Engine {
  labyrinths: any;
  currentLabyrinth: any;
  constructor() {
    this.labyrinths = this.loadLabyrinths();
    this.currentLabyrinth = null;
  }

  loadLabyrinths() {
    const savedLabyrinths = localStorage.getItem('labyrinths');
    return savedLabyrinths ? JSON.parse(savedLabyrinths) : {};
  }

  getLabyrinthNames() {
    return Object.keys(this.labyrinths);
  }

  loadLabyrinth(name: string | number) {
    this.currentLabyrinth = this.labyrinths[name];
    if (!this.currentLabyrinth) {
      throw new Error(`Labyrinth "${name}" not found`);
    }
  }

  saveLabyrinth(name: string | number, cells: any) {
    this.labyrinths[name] = cells;
    localStorage.setItem('labyrinths', JSON.stringify(this.labyrinths));
  }
}

console.log('Engine loaded');