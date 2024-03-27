import "./pdfviewer.css";
import { useEffect } from "react";
const PdfViewer = (props) => {
    useEffect(() => {
        console.log("rerendering");
    });
    return <div className="pdfViewerDiv">
        <object data={props.source} type="application/pdf" className="pdfObject">
            <p>
                Your web browser doesn't have a PDF plugin. Instead you can{" "}
                <a href="filename.pdf">click here to download the PDF file.</a>
            </p>
        </object>
    </div>;
};

export default PdfViewer;;