/* eslint-disable @typescript-eslint/no-explicit-any */

import { getAreas } from '../api';
import { createElement } from '../utils';

class Location {
  element: HTMLElement | null;
  parentElement: HTMLElement;
  // areas: object[];
  areas: any;
  selectedAreas: { id: string; type: string }[];

  constructor(parentElement: HTMLElement) {
    const areasStorage = localStorage.getItem('selected-areas');
    this.element = null;
    this.areas = [];
    this.selectedAreas = areasStorage ? JSON.parse(areasStorage) : [];
    this.parentElement = parentElement;
  }

  public removeElement() {
    this.element?.remove();
  }

  public async addElement() {
    this.parentElement.append(await this.getElement());
  }

  private removeAreaId(id: string | number) {
    this.selectedAreas = this.selectedAreas.filter((area) => area.id !== id);
  }

  private setSelectedAreas() {
    const statesSelectedElement = document.querySelector('.js-states-selected') as HTMLElement;
    const stateElements = document.querySelectorAll('.js-state') as NodeListOf<HTMLElement>;

    stateElements.forEach((element) => {
      const { id, type } = element.dataset;

      if (!id) return;

      const index = this.selectedAreas.findIndex((area) => area.id === id && area.type === type);

      if (index !== -1) {
        element.classList.add('_active');

        const selectedElement = createElement(
          `<div class="location__selected" data-area-id=${id}>${
            element.querySelector('.js-title')?.textContent
          }<button class="location__close js-close" type="button">close</button></div>`
        );

        selectedElement.querySelector('.js-close')?.addEventListener('click', () => {
          element.classList.remove('_active');
          selectedElement.remove();
          this.removeAreaId(id);
        });

        statesSelectedElement.append(selectedElement);
      }
    });
  }

  private setSaveClickHandler() {
    this.element?.querySelector('.js-save')?.addEventListener('click', () => {
      localStorage.setItem('selected-areas', JSON.stringify(this.selectedAreas));
    });
  }

  private setStateClickHandlers() {
    const statesSelectedElement = document.querySelector('.js-states-selected') as HTMLElement;
    const stateElements = document.querySelectorAll('.js-state') as NodeListOf<HTMLElement>;

    stateElements.forEach((element) => {
      element.addEventListener('click', () => {
        const { id, type } = element.dataset;

        if (!id || !type) return;

        const index = this.selectedAreas.findIndex((area) => area.id === id && area.type === type);

        if (index !== -1) {
          element.classList.remove('_active');

          statesSelectedElement.querySelector(`[data-area-id='${id}']`)?.remove();

          this.removeAreaId(id);
        } else {
          element.classList.add('_active');

          const selectedElement = createElement(
            `<div class="location__selected" data-area-id=${id}>${
              element.querySelector('.js-title')?.textContent
            }<button class="location__close js-close" type="button">close</button></div>`
          );

          selectedElement.querySelector('.js-close')?.addEventListener('click', () => {
            element.classList.remove('_active');
            selectedElement.remove();
            this.removeAreaId(id);
          });

          statesSelectedElement.append(selectedElement);

          this.selectedAreas.push({ id, type });
        }
      });
    });
  }

  private async addAreasElement() {
    this.areas = await getAreas();

    const stateItemsHTML = this.areas.reduce(
      (
        prev: any,
        curr: {
          id: any;
          type: string;
          name: any;
          cities: any[];
        }
      ) => {
        if (curr.type === 'country') {
          const country = `${prev}<li class="location__state js-state" data-id=${curr.id} data-type="country">
            <span class="location__state-title js-title">${curr.name}</span>
            </li>`;

          return country;
        }

        if (curr.type === 'area') {
          const area = `${prev}<li class="location__state js-state" data-id=${curr.id} data-type="area">
            <span class="location__state-title js-title">${curr.name}</span>
            </li>`;

          const cities = curr.cities.reduce(
            (
              prev1: any,
              curr1: {
                id: any;
                name: any;
              }
            ) => `${prev1}<li class="location__state js-state" data-id=${curr1.id} data-type="city">
              <span class="location__state-title js-title">${curr1.name}</span>
              <span class="location__state-subtitle">${curr.name}</span>
              </li>`,
            area
          );

          return cities;
        }

        return ``;
      },
      ``
    );

    const statesHTML = `<ul class="location__states">${stateItemsHTML}</ul>`;
    const statesElement = createElement(statesHTML);
    const statesParentElement = document.querySelector('.js-states') as HTMLElement;
    statesParentElement.innerHTML = '';
    statesParentElement.append(statesElement);
    this.setStateClickHandlers();
    this.setSaveClickHandler();
    this.setSelectedAreas();
  }

  private getElement() {
    if (!this.element) {
      this.element = createElement(this.getHTML());
      this.addAreasElement();
    }

    return this.element;
  }

  private getHTML() {
    return `<div class="location">
    <button class="location__button button js-save" type="button">Сохранить</button>

    <div class="location__search">
      <input
        class="location__input input"
        type="text"
        placeholder="Регион, город, населенный пункт"
      />
      <button class="location__clear" type="button">close</button>
    </div>
    <div class="location__row-selected js-states-selected">
    </div>
    <hr />
    <div class="location__states-wrapper js-states">
      <img src="" alt="loading..." />
    </div>
  </div>`;
  }
}

export default Location;
