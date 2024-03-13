import { fabric } from 'fabric';

export const loadSvg = (path: string) => {
  return new Promise((resolve, reject) => {
    fabric.loadSVGFromURL(path, (objects, options) => {
      const svg = fabric.util.groupSVGElements(objects, options);
      resolve(svg);
    });
  });
};
