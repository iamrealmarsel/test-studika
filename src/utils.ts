/* eslint-disable import/prefer-default-export */

export const createElement = (html: string): HTMLElement => {
  const parentElement = document.createElement('div');
  parentElement.innerHTML = html;

  return parentElement.firstElementChild as HTMLElement;
};
