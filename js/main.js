/* BUTTONS SIZES SELECT */
const sizes = document.querySelector(".sizes");
if (sizes) {
  sizes.addEventListener('click', (e) => {
    if (e.target.tagName != "UL") {
      e.target.className == "size-selected" ? e.target.className = "" : e.target.className = "size-selected";
    }
  })
}
/*END BUTTONS SIZES SELECT */

/* QTY INPUT ONCHANGE FOR PRICE */
const input = document.getElementById('quantity-1');
if (input) {
  input.addEventListener('change', () => {
    document.getElementById('amount-1').innerHTML = parseFloat(input.value * 175.95).toFixed(2);
  })
}

const input2 = document.getElementById('quantity-2');
if (input2) {
  input2.addEventListener('change', () => {
    document.getElementById('amount-2').innerHTML = parseFloat(input2.value * 149.95).toFixed(2);
  })
}

const input3 = document.getElementById('quantity-3');
if (input3) {
  input3.addEventListener('change', () => {
    document.getElementById('amount-3').innerHTML = parseFloat(input3.value * 199.95).toFixed(2);
  })
}
/* END QTY INPUT ONCHANGE FOR PRICE */

/* DELETE BUTTON IN BAG */
const deleteButton = document.querySelectorAll('.p-del');
deleteButton.forEach((item) => {
  item.addEventListener('click', (e) => {
    if (e.target.closest('.p-del')) {
      e.target.closest('tr').remove();
    }
  })
})
/* END DELETE BUTTON */

/*SLIDER*/
let multiItemSlider = (function () {
  return function (selector) {
    let mainElement = document.querySelector(selector), // main element of block for slider
      sliderWrapper = mainElement.querySelector('.slider_wrapper'), // wrapper for .slider-item
      sliderItems = mainElement.querySelectorAll('.slider_item'), // elements of .slider-item
      sliderControls = mainElement.querySelectorAll('.slider_control'), // elements of control
      sliderControlLeft = mainElement.querySelector('.slider_control_left'), // button left
      sliderControlRight = mainElement.querySelector('.slider_control_right'), // button right
      wrapperWidth = parseFloat(getComputedStyle(sliderWrapper).width), // width of wrapper
      itemWidth = parseFloat(getComputedStyle(sliderItems[0]).width), // width of once element  
      positionLeftItem = 0, // position of left active element
      transform = 0, // transformation value of .slider_wrapper
      step = itemWidth / wrapperWidth * 100, // step size for transformation
      items = []; // empty an arry

    // push in an array
    sliderItems.forEach((item, index) => {
      items.push({ item: item, position: index, transform: 0 });
    });

    let position = {
      getMin: 0,
      getMax: items.length - 1,
    }

    let transformItem = function (direction) {
      if (direction === 'right') {
        if ((positionLeftItem + wrapperWidth / itemWidth - 1) >= position.getMax) {
          return;
        }
        if (!sliderControlLeft.classList.contains('slider_control_show')) {
          sliderControlLeft.classList.add('slider_control_show');
        }
        if (sliderControlRight.classList.contains('slider_control_show') && (positionLeftItem + wrapperWidth / itemWidth) >= position.getMax) {
          sliderControlRight.classList.remove('slider_control_show');
        }
        positionLeftItem++;
        transform -= step;
      }
      if (direction === 'left') {
        if (positionLeftItem <= position.getMin) {
          return;
        }
        if (!sliderControlRight.classList.contains('slider_control_show')) {
          sliderControlRight.classList.add('slider_control_show');
        }
        if (sliderControlLeft.classList.contains('slider_control_show') && positionLeftItem - 1 <= position.getMin) {
          sliderControlLeft.classList.remove('slider_control_show');
        }
        positionLeftItem--;
        transform += step;
      }
      sliderWrapper.style.transform = 'translateX(' + transform + '%)';
    }

    // event click for next / prev buttons
    let controlClick = function (e) {
      let direction = this.classList.contains('slider_control_right') ? 'right' : 'left';
      e.preventDefault();
      transformItem(direction);
    };

    let setUpListeners = function () {
      // add a controlClick function for next/prev buttons
      sliderControls.forEach((item) => {
        item.addEventListener('click', controlClick);
      });
    }

    // function call (initialization)
    setUpListeners();

    return {
      right: function () { // right
        transformItem('right');
      },
      left: function () { // left
        transformItem('left');
      }
    }

  }
}());

let slider = multiItemSlider('.slider')
  /*END SLIDER*/