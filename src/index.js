import Jimp from 'jimp';
import { Bitmap, ImageRunner, ShapeTypes, SvgExporter } from 'geometrizejs';

window.addEventListener('DOMContentLoaded', () => {
  initGeometrizejs();
});

console.log(111);

async function initGeometrizejs() {
  // load png/jpeg/gif,bmp/tiff image from url, file path or Buffer using jimp:
    const image = await Jimp.read('images/subscribe_success_popup_bg.jpg');
    const bitmap = Bitmap.createFromByteArray(image.bitmap.width, 
      image.bitmap.height, image.bitmap.data);
    const runner = new ImageRunner(bitmap);
    const options = {
      // shapeTypes: [ShapeTypes.CIRCLE, ShapeTypes.TRIANGLE],
      shapeTypes: [ShapeTypes.TRIANGLE],
      candidateShapesPerStep: 50,
      shapeMutationsPerStep: 100,
      alpha: 128
    };
    const iterations = 2500;
    const svgData = [];
    // for (let i = 0; i < iterations; i++) {
    //   svgData.push(SvgExporter.exportShapes(runner.step(options)))
    // }
    // const svg = SvgExporter.getSvgPrelude() + 
    //   SvgExporter.getSvgNodeOpen(bitmap.width, bitmap.height) + 
    //   svgData.join('\n') + 
    //   SvgExporter.getSvgNodeClose()
  
  
    // in the browser:
    // document.getElementById('svg-container').innerHTML = svg
  
    let counter = 0,
      pauseFlag = true;
    const svgContainer = document.getElementById('svg-container'),
      button = document.querySelector('#play_btn');
  
    function myAnimation() {
      if(!pauseFlag && counter < iterations) {
        counter++;
        svgData.push(SvgExporter.exportShapes(runner.step(options)));
  
        const svg = SvgExporter.getSvgPrelude() + 
          SvgExporter.getSvgNodeOpen(bitmap.width, bitmap.height) + 
          svgData.join('\n') + 
          SvgExporter.getSvgNodeClose();
        
        svgContainer.innerHTML = svg
  
        if(counter < iterations) {
          requestAnimationFrame(myAnimation);
        }
      }
    }

    let id = requestAnimationFrame(myAnimation);
    cancelAnimationFrame(id);
  
    button.addEventListener('click', (e) => {
      e.preventDefault();
  
      pauseFlag = !pauseFlag;
      button.innerHTML = pauseFlag ? 'Play' : 'Pause';

      if (!pauseFlag) {
        setTimeout(() => {
          requestAnimationFrame(myAnimation)          
        }, 500);
      } else {
        cancelAnimationFrame(id);
      }
    });
  
    // while (counter < iterations) {
    //   counter++;
    //   svgData.push(SvgExporter.exportShapes(runner.step(options)));
  
    //   const svg = SvgExporter.getSvgPrelude() + 
    //     SvgExporter.getSvgNodeOpen(bitmap.width, bitmap.height) + 
    //     svgData.join('\n') + 
    //     SvgExporter.getSvgNodeClose();
      
    //     svgContainer.innerHTML = svg
    // }
}

// (async () => {
//   // load png/jpeg/gif,bmp/tiff image from url, file path or Buffer using jimp:
//   const image = await Jimp.read('images/subscribe_success_popup_bg.jpg');
//   const bitmap = Bitmap.createFromByteArray(image.bitmap.width, 
//     image.bitmap.height, image.bitmap.data);
//   const runner = new ImageRunner(bitmap);
//   const options = {
//     // shapeTypes: [ShapeTypes.CIRCLE, ShapeTypes.TRIANGLE],
//     shapeTypes: [ShapeTypes.TRIANGLE],
//     candidateShapesPerStep: 50,
//     shapeMutationsPerStep: 100,
//     alpha: 128
//   };
//   const iterations = 2500;
//   const svgData = [];
//   // for (let i = 0; i < iterations; i++) {
//   //   svgData.push(SvgExporter.exportShapes(runner.step(options)))
//   // }
//   // const svg = SvgExporter.getSvgPrelude() + 
//   //   SvgExporter.getSvgNodeOpen(bitmap.width, bitmap.height) + 
//   //   svgData.join('\n') + 
//   //   SvgExporter.getSvgNodeClose()


//   // in the browser:
//   // document.getElementById('svg-container').innerHTML = svg

//   let counter = 0,
//     pauseFlag = false;
//   const svgContainer = document.getElementById('svg-container'),
//     button = document.querySelector('#play_btn');

//   button.addEventListener('click', (e) => {
//     e.preventDefault();

//     pauseFlag = !pauseFlag;
//   });

//   let t = window.setInterval(function() {
//     if(!pauseFlag && counter < iterations) {
//       counter++;
//       svgData.push(SvgExporter.exportShapes(runner.step(options)));

//       const svg = SvgExporter.getSvgPrelude() + 
//         SvgExporter.getSvgNodeOpen(bitmap.width, bitmap.height) + 
//         svgData.join('\n') + 
//         SvgExporter.getSvgNodeClose();
      
//         svgContainer.innerHTML = svg
//       }
//   }, 20);

//   // while (counter < iterations) {
//   //   counter++;
//   //   svgData.push(SvgExporter.exportShapes(runner.step(options)));

//   //   const svg = SvgExporter.getSvgPrelude() + 
//   //     SvgExporter.getSvgNodeOpen(bitmap.width, bitmap.height) + 
//   //     svgData.join('\n') + 
//   //     SvgExporter.getSvgNodeClose();
    
//   //     svgContainer.innerHTML = svg
//   // }
// })()