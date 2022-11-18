import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import { useRef } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import { getFileUrl, IMAGE } from '../FileUpload';
import OCRContainer from './ocr/OCRPlugin';
import OCRPlugin from './ocr/OCRPlugin';
import FillBlankPlugin from './fillblank/FillBlankPlugin';

export default function({paragraph, editorRef, onChange, options}) {

    const addImageBlobHook = async (blob, callback) => {
        const imageURL = await getFileUrl(blob, IMAGE);

        callback(imageURL, 'img');
    };

    const plugins = [colorSyntax, OCRPlugin];
    if(options && options.fillBlank) {
        plugins.push(FillBlankPlugin);
    }
    
    return (
        <Editor
            initialValue={paragraph}
            initialEditType="wysiwyg"
            usageStatistics={false}
            useCommandShortcut={false}
            hideModeSwitch
            onChange={onChange}
            hooks={{
              addImageBlobHook  
            }}
            plugins={plugins}
            ref={editorRef}
        />
    )
}