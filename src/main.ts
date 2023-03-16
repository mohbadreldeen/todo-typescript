import './css/style.css'
 
 
import FullList from './model/FullList'
import ListTemplate from './templates/ListTemplate'
import ListItem from './model/ListItem'

const initApp = (): void => {
  const fullList = FullList.instance;
  const listTemplate = ListTemplate.instance;

  const itemEntryForm = document.getElementById('itemEntryForm') as HTMLFormElement;
  itemEntryForm.addEventListener('submit', (e: SubmitEvent):  void => {
    e.preventDefault();
    const itemInput = document.getElementById('newItem') as HTMLInputElement;
    const item = itemInput.value.trim();
    if(item.length === 0) return;
    itemInput.value = '';
    const itemId = new Date().getTime().toString();
    const newItem = new ListItem(itemId, item, false);
    
    fullList.addItem(newItem);
    listTemplate.render(fullList);
  });

  const clearListButton = document.getElementById('clearItemsButton') as HTMLButtonElement;
  clearListButton.addEventListener('click', (e: MouseEvent): void => {
    fullList.clearList();
    listTemplate.clear();
  });

  fullList.load();
  listTemplate.render(fullList);


}

document.addEventListener('DOMContentLoaded', initApp);