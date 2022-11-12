import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import { useRef } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import { getFileUrl, IMAGE } from '../FileUpload';

export default function({paragraph, editorRef, questionId}) {

    const addImageBlobHook = async (blob, callback) => {
        const imageURL = await getFileUrl(blob, questionId, IMAGE);

        callback(imageURL, 'img');
    };

    return (
        <Editor
            initialValue={paragraph}
            initialEditType="wysiwyg"
            usageStatistics={false}
            useCommandShortcut={false}
            hideModeSwitch
            hooks={{
              addImageBlobHook  
            }}
            plugins={[colorSyntax]}
            ref={editorRef}
        />
    )
}