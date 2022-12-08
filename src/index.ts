import Location from './components/Location';
import './styles/main.scss';

console.log('Hello, Studika !');

const mainElement = document.querySelector('.main') as HTMLElement;
const locationComponent = new Location(mainElement);
// locationComponent.init();

const headerLocationElement = document
  .querySelector('.header__location')
  ?.addEventListener('click', () => {
    locationComponent.addElement();
  });
