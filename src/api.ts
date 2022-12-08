/* eslint-disable import/prefer-default-export */

export const getAreas = async () => {
  try {
    const response = await fetch('https://studika.ru/api/areas', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const areas = await response.json();

    return areas;
  } catch (error) {
    throw new Error();
  }
};
