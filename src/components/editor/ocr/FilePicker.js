import './filepicker_style.css';

export default function() {
    
    return (
        <div>
            <label htmlFor="ocr-file-chooser">Choose a image:</label>

            <span className="toastui-editor-file-name" id="ocr-file-span">No file</span>
            <button className="toastui-editor-file-select-button" id="ocr-file-button">파일 선택</button>

            <input type="file"
                id="ocr-file-chooser" name="ocr-file-chooser"
                accept="image/*" />
        </div>
    )
}