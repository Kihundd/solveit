import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import { useRef } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';

export default function({paragraph, editorRef}) {

    return (
        <Editor
            initialValue={paragraph}
            initialEditType="wysiwyg"
            usageStatistics={false}
            useCommandShortcut={false}
            hideModeSwitch

            plugins={[colorSyntax]}
            ref={editorRef}
        />
    )
}