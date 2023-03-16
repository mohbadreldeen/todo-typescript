import FullList from "../model/FullList";

interface DOMList {
    ul: HTMLUListElement,
    clear(): void,
    render(fullList: FullList): void,

}

// create singleton pattern for DOMList class that implements DOMList interface
export default class ListTemplate implements DOMList {
    static instance: ListTemplate = new ListTemplate();
    ul = document.getElementById('listItems') as HTMLUListElement;
    private constructor() { 
        this.ul = document.getElementById('listItems') as HTMLUListElement;
    }

    // get ul(): HTMLUListElement {
    //     return this.ul;
    // }

    // set ul(ul: HTMLUListElement) {
    //     this.ul = ul;
    // }

    clear(): void {
        this.ul.innerHTML = '';
    }

    render(fullList: FullList): void {
        this.clear();
        fullList.list.forEach(item => {
            const li = document.createElement('li') as HTMLLIElement;
            li.className = 'item';

            const check = document.createElement('input') as HTMLInputElement;
            check.type = 'checkbox';
            check.id = item.id;
            check.tabIndex = 0;
            check.checked = item.checked;
            li.appendChild(check);

           check.addEventListener('change', (e) => {
                item.checked = !item.checked;
                fullList.save();
            });

            const label = document.createElement('label') as HTMLLabelElement;
            label.htmlFor = item.id;
            label.innerText = item.item;
            li.appendChild(label);

            const button = document.createElement('button') as HTMLButtonElement;
            button.className = 'delete';
            button.innerText = 'X';
            button.tabIndex = 0;
            li.appendChild(button);


            button.addEventListener('click', (e) => {
                fullList.removeItem(item.id);
                this.render(fullList);
            });

            this.ul.appendChild(li);
        });
    }
}