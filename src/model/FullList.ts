import ListItem  from './ListItem';

interface List {
    list: ListItem[],
    load(): void,
    save(): void,
    clearList(): void,
    addItem(itemObject: ListItem): void,
    removeItem(id: string): void
}
// singleton pattern
export default class FullList implements List {

    static instance: FullList = new FullList();

    private constructor( private _list: ListItem[] = [] ) { }

    get list(): ListItem[] {
        return this._list;
    }

    set list(list: ListItem[]) {
        this._list = list;
    }

    load(): void {
        const list: string | null = localStorage.getItem('list');
        
        if (typeof list !== 'string') return;
        // const parsedList: ListItem[] = JSON.parse(list);
        const parsedList: { _id: string, _item: string, _checked: boolean }[] = JSON.parse(list);
        // this._list = JSON.parse(list);
       parsedList.forEach(item =>{
        const newListItem = new ListItem(item._id, item._item, item._checked);
        FullList.instance.addItem(newListItem);
       });
    }

    save(): void {
        localStorage.setItem('list', JSON.stringify(this._list));
    }

    clearList(): void {
        this._list = [];
        this.save();
    }

    addItem(itemObject: ListItem): void {
        this._list.push(itemObject);
        this.save();
    }

    removeItem(id: string): void {
        this._list = this._list.filter(item => item.id !== id);
        this.save();
    }
}