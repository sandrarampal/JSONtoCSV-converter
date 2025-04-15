const FileUploader = ({ onChange, id }) => {
  return (
    <div>
      <input type="file" onChange={onChange} accept=".json" id={id} />
    </div>
  );
};

export default FileUploader;
