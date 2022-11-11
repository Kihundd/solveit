// import React, { useState, useEffect, useRef } from 'react';

// import '@toast-ui/editor/dist/toastui-editor.css';
// import { Editor } from '@toast-ui/react-editor';

// // TOAST UI Editor Plugins
// // import 'tui-chart/dist/tui-chart.css';
// // import chart from '@toast-ui/editor-plugin-chart';
// // import 'highlight.js/styles/github.css';
// // import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
// import 'tui-color-picker/dist/tui-color-picker.css';
// import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
// import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
// // import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell';
// // import uml from '@toast-ui/editor-plugin-uml';

// import S3 from 'react-aws-s3';


// export default function EditorBox(props){
    
//     const editorRef = useRef();
//     useEffect(() => {
//       setContent(props.paragraph)
//     }, [props])
//     const handleChange = (e) => {
//         console.log(content)
//     }
//     console.log(editorRef.current?.getInstance().getMarkdown());

//     const btmClickListener = () => {
//         console.log(editorRef.current.getInstance().getMarkdown());
//         console.log(editorRef.current.getInstance().getHTML());
//     }

//     useEffect(() => {
//         if(editorRef.current) {
//             editorRef.current.getInstance().removeHook('addImageBlobHook');

//             editorRef.current
//                 .getInstance()
//                 .addHook('addImageBlobHook', (blob, callback) => {
//                     const s3config = {
//                         // bucketName: process.env.REACT_APP_BUCKET_NAME as string,
//                         // region: process.env.REACT_APP_REGION as string,
//                         // accessKeyId: process.env.REACT_APP_ACCESS_ID as string,
//                         // secretAccessKey: process.env.REACT_APP_ACCESS_KEY as string,
//                     };
//                     const ReactS3Client = new S3(s3config);
//                     ReactS3Client.uploadFile(blob, uuidv4())
//                         .then((data) => callback(data.location, 'imageURL'))
//                         .catch((err) => (window.location.href = '/error'));
//                     });
//         }
//     }, [])
    

// 	return (
//         <div style={{textAlign: "left"}}>
//             <Editor
//                 initialValue={content}
//                 initialEditType="wysiwyg"
//                 usageStatistics={false}
//                 useCommandShortcut={false}
//                 hideModeSwitch
                
//                 plugins={[colorSyntax]}
//                 ref={editorRef}
//                 onChange={handleChange}
//             />
//             <button style={{marginTop: '10px'}} onClick={btmClickListener}>확인</button>
//         </div>
        
// 	);
// }