import React from "react";
import FilePicker from "./FilePicker";
import {renderToStaticMarkup, renderToString} from 'react-dom/server'
import { getStringFromBase64 } from "./OCRKey";

function createApplyButton(text, id) {
    const div = document.createElement('div');
    const button = document.createElement('button');
  
    button.setAttribute('type', 'button');
    button.classList.add('toastui-editor-ok-button');
    button.id = id;
    button.textContent = text;
    
    div.style.textAlign = 'right';
    div.appendChild(button);

    return div;
}

function createToolbarItemOption(OCRContainer) {
    return {
        name: 'ocr',
        tooltip: '문자 변환(OCR)',
        className: 'hmm',
        text: 'OCR',
        style: { background: 'none'},
        popup: {
          className: 'hmm..',
          body: OCRContainer,
        },
    };
}


function hasClass(element, className) {
    return element.classList.contains(className);
}

function findParentByClassName(el, className) {
    let currentEl = el;
  
    while (currentEl && !hasClass(currentEl, className)) {
      currentEl = currentEl.parentElement;
    }
  
    return currentEl;
}

function getCurrentPickerEl(OCRContainer, containerClassName) {
    const editorDefaultEl = findParentByClassName(OCRContainer, `${PREFIX}defaultUI`);
  
    return editorDefaultEl.querySelector<HTMLElement>(`.${containerClassName} .ProseMirror`);
}

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

function initFilePicker(container) {
    const input = container.querySelector('#ocr-file-chooser');
    const span = container.querySelector('#ocr-file-span');
    const button = container.querySelector('#ocr-file-button');
    const ok = container.querySelector('#ocr-ok-button');

    let base64;

    const openFilePicker = () => {
        input.click();
    };
    span.addEventListener('click', e => openFilePicker());
    button.addEventListener('click', e => openFilePicker());
    input.addEventListener('change', async e => {
        const file = e.target.files[0];
        base64 = await toBase64(file);
        span.innerHTML = file.name;
        span.classList.add('selected');
    })

    return {
        getBaes64: () => base64,
    };
}

const PREFIX = 'toastui-editor-';

export default function(context, options = {}) {
    const { eventEmitter, i18n, usageStatistics = true, pmState } = context;
    const { preset } = options;
    const container = document.createElement('div');
    const button = createApplyButton('OK', 'ocr-ok-button');

    let containerClassName;
    let pickerEl;

    console.log(button);

    var div = document.createElement('div');
    div.innerHTML = renderToStaticMarkup(<FilePicker />).trim();
    console.log(div.firstChild);

    container.classList.add(".toastui-editor-popup");
    container.classList.add(".toastui-editor-popup-body");
    container.appendChild(div.firstChild);
    container.appendChild(button);

    const {getBaes64} = initFilePicker(container);

    const toolbarItem = createToolbarItemOption(container);

    eventEmitter.listen('focus', (editType) => {
        containerClassName = `${PREFIX}${editType === 'markdown' ? 'md' : 'ww'}-container`;
    });

    container.addEventListener('click', async e => {
        if (e.target.getAttribute('type') === 'button') {
            const base64 = getBaes64();
            const base64WithNoHeader = base64.replace(/^data:image\/(png|jpg|jpeg);base64,/, "")
            const resultString = await getStringFromBase64(base64WithNoHeader);
            console.log(resultString);

            eventEmitter.emit('command', 'ocr', { resultString });
            eventEmitter.emit('closePopup');
        }    
    })


    return {
        markdownCommands: {
            ocr: ({ selectedColor }, { tr, selection, schema }, dispatch) => {
                
            },
        },
        wysiwygCommands: {
            ocr: ({ resultString }, { tr, selection, schema }, dispatch) => {
                tr.insertText(resultString);
                dispatch(tr);
            },
        },
        toolbarItems: [
            {
                groupIndex: 5,
                itemIndex: 0,
                item: toolbarItem,
            },
        ],
        toHTMLRenderers: {
            htmlInline: {
                
            },
        },
  };
}