

export class Album {
    albumId: string = '';
    title?: string = '';
    description?: string = '';
    owner?: string;
    createdAt?: String;
    updatedAt?: String;

    constructor(albumId: string, title: string, description: string) {
        this.albumId = albumId;
        this.title = title;
        this.description = description;
        // this.owner = owner;
        // this.createdAt = createdAt;
        // this.updatedAt = updatedAt;
    }
}
