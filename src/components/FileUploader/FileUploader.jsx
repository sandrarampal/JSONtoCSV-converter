import "./FileUploader.css";

const FileUploader = ({ onChange, id, accept, title }) => {
  return (
    <div className="file-upload">
      <label htmlFor={id}>Import a {title}</label>
      <input type="file" onChange={onChange} id={id} accept={accept} />
    </div>
  );
};

export default FileUploader;
