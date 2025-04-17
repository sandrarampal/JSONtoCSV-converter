const FileUploader = ({ onChange, id, accept }) => {
  return (
    <div>
      <input type="file" onChange={onChange} id={id} accept={accept} />
    </div>
  );
};

export default FileUploader;
